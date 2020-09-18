import { convert, CommentToPrEventBody } from "./pr-comment-fns";

const eventBodyV1: CommentToPrEventBody = {
  installationId: "100",
  owner: "reg-viz",
  repository: "gh-app",
  branchName: "pr-comment-test",
  deletedItemsCount: 0,
  failedItemsCount: 0,
  newItemsCount: 0,
  passedItemsCount: 0,
  reportUrl: "https://hoge.com/index.html",
};

const eventBodyV2: CommentToPrEventBody = {
  ...eventBodyV1,
  headOid: "ccebaba076d6ecb38426f8de23af8cb4cd423284",
};

describe(convert, () => {
  describe("without headOid request", () => {
    it("should convert to POST request if contexts PR is not commented by self", () => {
      const log = require("../test/gql-log/update-pr-comment-context/data_for_post.json");
      const actual = convert(log.data, eventBodyV1);
      if (!Array.isArray(actual)) return fail();
      expect(actual.length).toBe(1);
      expect(actual[0].method).toBe("POST");
      expect(actual[0].path).toBe("/repos/reg-viz/gh-app/issues/20/comments");
    });

    it("should convert to PATCH request if contexts PR is commented by self", () => {
      const log = require("../test/gql-log/update-pr-comment-context/data_for_patch.json");
      const actual = convert(log.data, eventBodyV1);
      if (!Array.isArray(actual)) return fail();
      expect(actual.length).toBe(1);
      expect(actual[0].method).toBe("PATCH");
      expect(actual[0].path).toBe("/repos/reg-viz/gh-app/issues/comments/692200265");
    });
  });

  describe("with headOid request", () => {
    describe("from owner", () => {
      it("should convert to POST request if contexts PR is not commented by self", () => {
        const log = require("../test/gql-log/update-pr-comment-context/data_for_post.json");
        const actual1 = convert(log.data, { ...eventBodyV1, headOid: "499639feebc0fd11c202a1e2d6f148e8f9691a03" } );
        if (!Array.isArray(actual1)) return fail();
        expect(actual1.length).toBe(1);
        expect(actual1[0].method).toBe("POST");
        expect(actual1[0].path).toBe("/repos/reg-viz/gh-app/issues/20/comments");
      });

      it("should convert to PATCH request if contexts PR is commented by self", () => {
        const log = require("../test/gql-log/update-pr-comment-context/data_for_patch.json");
        const actual = convert(log.data, { ...eventBodyV1, headOid: "499639feebc0fd11c202a1e2d6f148e8f9691a03" } );
        if (!Array.isArray(actual)) return fail();
        expect(actual.length).toBe(1);
        expect(actual[0].method).toBe("PATCH");
        expect(actual[0].path).toBe("/repos/reg-viz/gh-app/issues/comments/692200265");
      });
    });

    describe("forked PR", () => {
      it("should convert to POST request if contexts PR is not commented by self", () => {
        const log = require("../test/gql-log/update-pr-comment-context/data_for_post.json");
        const actual = convert(log.data, { ...eventBodyV1, headOid: "ccebaba076d6ecb38426f8de23af8cb4cd423284" } );
        if (!Array.isArray(actual)) return fail();
        expect(actual.length).toBe(1);
        expect(actual[0].method).toBe("POST");
        expect(actual[0].path).toBe("/repos/reg-viz/gh-app/issues/30/comments");
      });

      it("should convert to PATCH request if contexts PR is commented by self", () => {
        const log = require("../test/gql-log/update-pr-comment-context/data_for_patch.json");
        const actual = convert(log.data, { ...eventBodyV1, headOid: "ccebaba076d6ecb38426f8de23af8cb4cd423284" } );
        if (!Array.isArray(actual)) return fail();
        expect(actual.length).toBe(1);
        expect(actual[0].method).toBe("PATCH");
        expect(actual[0].path).toBe("/repos/reg-viz/gh-app/issues/comments/520499081");
      });
    });
  });
});
