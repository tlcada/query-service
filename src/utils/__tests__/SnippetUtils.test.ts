import SnippetUtils from "../SnippetUtils";

describe("SnippetUtils.ts", () => {
    it("uppercaseFirstLetter(...) method should uppercase first letter from word", () => {
        expect(SnippetUtils.uppercaseFirstLetter("hello world")).toEqual("Hello world");
    });
});
