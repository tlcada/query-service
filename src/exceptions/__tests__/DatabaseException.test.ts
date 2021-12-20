import { StatusCodes } from "http-status-codes";
import { DatabaseException } from "../";

describe("DatabaseException.ts", () => {
    it("should throw exception", () => {
        try {
            throw new DatabaseException("Test message");
        } catch (err: any) {
            expect(err.message).toEqual("Test message");
            expect(err.getHttpStatus()).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
});
