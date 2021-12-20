import { StatusCodes } from "http-status-codes";
import { GeneralException } from "../";

describe("GeneralException.ts", () => {
    it("should throw exception with default message", () => {
        try {
            throw new GeneralException();
        } catch (err: any) {
            expect(err.message).toEqual("Something unexpected happened. Please try again.");
            expect(err.getHttpStatus()).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });

    it("should throw exception with own message", () => {
        try {
            throw new GeneralException("Test message");
        } catch (err: any) {
            expect(err.message).toEqual("Test message");
            expect(err.getHttpStatus()).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
});
