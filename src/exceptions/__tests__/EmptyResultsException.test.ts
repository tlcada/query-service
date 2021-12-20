import { StatusCodes } from "http-status-codes";
import { EmptyResultsException } from "../";

describe("EmptyResultsException.ts", () => {
    it("should throw exception", () => {
        try {
            throw new EmptyResultsException();
        } catch (err: any) {
            expect(err.message).toEqual("No search results found");
            expect(err.getHttpStatus()).toEqual(StatusCodes.NOT_FOUND);
        }
    });
});
