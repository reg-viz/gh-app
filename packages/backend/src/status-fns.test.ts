import {
  createStatusDetailQueryVariables,
  decodeMetadata,
  encodeMetadata,
} from "./status-fns";

describe(createStatusDetailQueryVariables, () => {
  test("should work with captured payload", () => {
    const payload = require("../test/webhook/review/payload_pr01.json");
    const variables = createStatusDetailQueryVariables(payload);
    if (!variables) return fail();
    expect(variables.prNumber).toBeTruthy();
    expect(variables.owner).toBeTruthy();
    expect(variables.repository).toBeTruthy();
  });
});

describe(encodeMetadata, () => {
  it("should tokenize metadata", () => {
    const encoded = encodeMetadata({
      failedItemsCount: 10,
      newItemsCount: 11,
      deletedItemsCount: 12,
      passedItemsCount: 13,
      shortDescription: true
    });
    expect(decodeMetadata(encoded)).toEqual({
      failedItemsCount: 10,
      newItemsCount: 11,
      deletedItemsCount: 12,
      passedItemsCount: 13,
      shortDescription: true
    });
  });
});
