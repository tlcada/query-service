import { query } from "express-validator";
import { GeneralException } from "../../../exceptions";
import { errorResponse, notFound, validate } from "../errorHandler";
import { getMockReq, getMockRes } from "@jest-mock/express";

describe("errorHandler.ts", () => {
    describe("errorResponse(...)", () => {
        it("should return errorResponse JSON", async () => {
            const req = getMockReq();
            const { res, next } = getMockRes();

            errorResponse(new GeneralException(), req, res, next);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: "Internal Server Error",
                    message: "Something unexpected happened. Please try again.",
                    path: "",
                    status: 500
                }),
            );
        });
    });

    describe("notFound(...)", () => {
        it("should return error view", async () => {
            const req = getMockReq();
            const { res, next } = getMockRes();

            notFound(req, res, next);
            expect(res.render).toHaveBeenCalledWith("error", { title: 404, message: "The page you are looking for was not found." });
        });
    });

    describe("validate(...)", () => {
        it("should return errorResponse JSON with invalid data", async () => {
            const req = getMockReq({ query: { dummyParam: 1234 } });
            const { res, next } = getMockRes();

            await validate([query("dummyParam").isString()])(req, res, next);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    errors: [{
                        location: "query",
                        msg: "Invalid value",
                        param: "dummyParam",
                        value: 1234
                    }],
                    reason: "Validation error"
                }),
            );
        });

        it("should go next with valid data", async () => {
            const req = getMockReq({ query: { dummyParam: "hello" } });
            const { res, next } = getMockRes();

            await validate([query("dummyParam").isString()])(req, res, next);
            expect(next).toBeCalled();
        });
    });
});
