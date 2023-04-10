import { expect, describe, it } from "vitest";

const get = (a: unknown) => {
  if (typeof a !== "string") throw new Error("it must be a string");

  return {
    name: a.trim(),
  };
};

describe("just testing", () => {
  it("should throw if paramater is not a string", () => {
    expect(() => get(2)).toThrowError("it must be a string");
  });

  it("should return an object", () => {
    expect(get("dilan")).toBeTypeOf("object");
  });

  it("should return an object with the string formatted", () => {
    expect(get("  dilan   ")).toMatchObject({ name: "dilan" });
  });
});
