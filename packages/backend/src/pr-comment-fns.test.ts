import { convert, CommentToPrEventBody } from "./pr-comment-fns";

const eventBody: CommentToPrEventBody = {
  installationId: "100",
  owner: "someone",
  repository: "some-repo",
  branchName: "feat-x",
  deletedItemsCount: 0,
  failedItemsCount: 0,
  newItemsCount: 0,
  passedItemsCount: 0,
  reportUrl: "https://hoge.com/index.html",
};

describe(convert, () => {
  it("should convert from data01", () => {
    const log = require("../test/gql-log/update-pr-comment-context/data01.json");
    const actual = convert(log.data, eventBody);
    if (!Array.isArray(actual)) return fail();
    expect(actual[0].method).toBe("POST");
  });

  it("should convert from data02", () => {
    const log = require("../test/gql-log/update-pr-comment-context/data02.json");
    const actual = convert(log.data, eventBody);
    if (!Array.isArray(actual)) return fail();
    expect(actual[0].method).toBe("PATCH");
  });
});
