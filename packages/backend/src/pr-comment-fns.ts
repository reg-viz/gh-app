import { NotInstallationError, DataValidationError } from "./error";
import { UpdatePrCommentContextQuery, UpdatePrCommentContextQueryVariables, StatusDetailQuery } from "./gql/_generated";
import { CommentToPrBody } from "reg-gh-app-interface";
import { PullRequestOpenPayload } from "./webhook-detect";
import { decodeMetadata } from "./status-fns";

export type CommentToPrEventBody  = CommentToPrBody;

export interface WriteIssueCommentBody {
  body: string;
}
export interface WriteIssueCommentApiParams {
  method: "POST" | "PATCH";
  path: string;
  body: WriteIssueCommentBody;
}
export interface DeleteIssueCommentApiParams {
  method: "DELETE";
  path: string;
  body: undefined;
}

export type UpdateIssueCommentApiParams = WriteIssueCommentApiParams | DeleteIssueCommentApiParams;

export function validateEventBody(input: Partial<CommentToPrEventBody>) {
  const result =
    typeof input.installationId === "string" &&
    typeof input.owner === "string" &&
    typeof input.repository === "string" &&
    typeof input.branchName === "string" &&
    typeof input.failedItemsCount === "number" &&
    typeof input.newItemsCount === "number" &&
    typeof input.deletedItemsCount === "number" &&
    typeof input.passedItemsCount === "number"
  ;
  if (!result) throw new DataValidationError(400, "invalid params");
  return true;
}

export interface CommentSeed {
  reportUrl?: string;
  failedItemsCount: number;
  newItemsCount: number;
  deletedItemsCount: number;
  passedItemsCount: number;
}

export function createCommentBody(eventBody: CommentSeed) {
  const lines: string[] = [];
  if (eventBody.failedItemsCount === 0 && eventBody.newItemsCount === 0 && eventBody.deletedItemsCount === 0) {
    lines.push(`:sparkles::sparkles: **That's perfect, there is no visual difference!** :sparkles::sparkles:`);
    if (eventBody.reportUrl) {
      lines.push("");
      lines.push(`Check out the report [here](${eventBody.reportUrl}).`);
    }
  } else {
    lines.push("**reg-suit detected visual differences.**");
    lines.push("");
    if (eventBody.reportUrl) {
      lines.push("");
      lines.push(`Check [this report](${eventBody.reportUrl}), and review them.`);
      lines.push("");
    }
    lines.push(new Array(eventBody.failedItemsCount + 1).join(":red_circle:"));
    lines.push(new Array(eventBody.newItemsCount + 1).join(":white_circle:"));
    lines.push(new Array(eventBody.deletedItemsCount + 1).join(":black_circle:"));
    lines.push(new Array(eventBody.passedItemsCount + 1).join(":large_blue_circle:"));
    lines.push("");
    lines.push(`<details>
                  <summary>What do the circles mean?</summary>
                  The number of circles represent the number of changed images. <br />
                  :red_circle: : Changed items,
                  :white_circle: : New items,
                  :black_circle: : Deleted items, and
                  :large_blue_circle: Passed items
                  <br />
               </details><br />`);
    lines.push(`<details>
                  <summary>How can I change the check status?</summary>
                  If reviewers approve this PR, the reg context status will be green automatically.
                  <br />
               </details><br />`);
  }
  return lines.join("\n");
}

function findCommentsByRegApp(pr: NonNullable<NonNullable<UpdatePrCommentContextQuery["repository"]>["pullRequests"]["nodes"]>[0]) {
  if (!pr.comments.nodes || !pr.comments.nodes.length) return [];
  const hits = pr.comments.nodes.filter(c => c.viewerDidAuthor);
  if (!hits.length) return [];
  return hits.sort((c1, c2) => new Date(c2.createdAt).getTime() - new Date(c1.createdAt).getTime());
}

export function convert(context: UpdatePrCommentContextQuery, eventBody: CommentToPrEventBody): UpdateIssueCommentApiParams[] | { message: string }{
  const repo = context.repository;
  if (!repo) {
    throw new NotInstallationError(eventBody.repository);
  }
  if (!repo.pullRequests) {
    return [];
  }
  if (!repo.pullRequests || !repo.pullRequests.nodes || !repo.pullRequests.nodes.length) return { message: `${eventBody.branchName} does not have open PRs.` };
  const prs = repo.pullRequests.nodes.filter(pr => {
    if (!eventBody.headOid) {
      // for v1
      if (!pr.headRepository) return false;
      return repo.nameWithOwner === pr.headRepository.nameWithOwner;
    } else {
      // for v2
      if (!pr.headRef || !pr.headRef.target) return false;
      return eventBody.headOid === pr.headRef.target.oid;
    }
  });
  return prs.reduce((paramList, pr) => {
    const commentsByRegsuit = findCommentsByRegApp(pr);
    if (!commentsByRegsuit.length) {
      return [
        ...paramList, 
        {
          method: "POST",
          path: `/repos/${repo.nameWithOwner}/issues/${pr.number}/comments`,
          body: {
            body: createCommentBody(eventBody),
          },
        } as UpdateIssueCommentApiParams,
      ];
    } else {
      switch(eventBody.behavior) {
        case "once":
          return paramList;
        case "new":
          return [
            ...paramList,
            ...commentsByRegsuit.map(c => ({
              method: "DELETE",
              path: `/repos/${repo.nameWithOwner}/issues/comments/${c.databaseId}`,
              body: undefined,
            } as UpdateIssueCommentApiParams)),
            {
              method: "POST",
              path: `/repos/${repo.nameWithOwner}/issues/${pr.number}/comments`,
              body: {
                body: createCommentBody(eventBody),
              },
            } as UpdateIssueCommentApiParams,
          ];
        case "default":
        default:
          return [
            ...paramList,
            {
              method: "PATCH",
              path: `/repos/${repo.nameWithOwner}/issues/comments/${commentsByRegsuit[0].databaseId}`,
              body: {
                body: createCommentBody(eventBody),
              },
            } as UpdateIssueCommentApiParams,
          ];
      }
    }
  }, [] as UpdateIssueCommentApiParams[]);
}

export function createCommentParams(data: StatusDetailQuery, payload: PullRequestOpenPayload): UpdateIssueCommentApiParams | undefined {
  const repo = data.repository;
  if (!repo || !repo.pullRequest || !repo.pullRequest.commits.nodes) return;
  const commits = repo.pullRequest.commits.nodes;
  const hit = commits.find(c => !!c.commit.status && !!c.commit.status.context && c.commit.oid === payload.pull_request.head.sha);
  if (!hit || !hit.commit.status || !hit.commit.status.context) return;
  const url = hit.commit.status.context.targetUrl;
  if (!url) return;
  const tmp = url.match(/(\?|&)stat=([^\?&=]+)/);
  if (!tmp) return;
  const [_, p, encoded] = tmp;
  const metadata = decodeMetadata(decodeURIComponent(encoded));
  return {
    method: "POST",
    path: `/repos/${payload.repository.owner.login}/${payload.repository.name}/issues/${payload.pull_request.number}/comments`,
    body: { body: createCommentBody({ ...metadata, reportUrl: url }) },
  } as UpdateIssueCommentApiParams;
}
