import { Headers, HeadersInit } from "node-fetch";
import { MockDataHelper } from "../../helpers";
import { get } from "../../utils/apiUtils";
import { GeneralErrorResponseType, generalResponseHelper, GeneralResponseHelper } from "../ResponseHelper";

const validPath = "https://reqres.in/api";
const invaliPath = "https://invalid_url/api";
const mockData: MockDataHelper = new MockDataHelper({ mockDataOn: false, useErrorResponse: false }, null, "json");

const headers: HeadersInit = new Headers({ "Content-Type": "application/json" });

describe("ResponseHandler.ts", () => {
    it("should return valid response", async () => {
        const response: GeneralResponseHelper = await generalResponseHelper(async () => {
            return get(`${validPath}/users/2`, headers, mockData);
        });

        if (response.successResponse) {
            expect(await response.successResponse.json()).toMatchObject({ data: { avatar: "https://reqres.in/img/faces/2-image.jpg" } });
        } else {
            throw new Error("Response is not success");
        }
    });

    it("should return invalid response", async () => {
        const response: GeneralResponseHelper = await generalResponseHelper(async () => {
            return get(`${validPath}/users/23`, headers, mockData);
        });

        if (response.successResponse) {
            throw new Error("Response is not invalid");
        } else {
            const errorResponse: GeneralErrorResponseType = response.errorResponse as GeneralErrorResponseType;
            expect(errorResponse.message).toEqual("{}");
        }
    });

    it("should return invalid response with invalid path", async () => {
        const response: GeneralResponseHelper = await generalResponseHelper(async () => {
            return get(`${invaliPath}/users`, headers, mockData);
        });

        if (response.successResponse) {
            throw new Error("Response is not invalid");
        } else {
            const errorResponse: GeneralErrorResponseType = response.errorResponse as GeneralErrorResponseType;
            expect(errorResponse.message).toContain("invalid_url");
        }
    });
});
