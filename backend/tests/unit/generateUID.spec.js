const generateUID = require("../../src/utils/generateUID")

describe("generate UID", () => {
  it("should generate a unique id", () => {
    const id = generateUID();

    expect(id).toHaveLength(8);
  })
})