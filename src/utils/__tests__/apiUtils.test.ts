import { MockDataHelper } from "../../helpers";
import { get } from "../apiUtils";
import { Headers, HeadersInit, Response } from "node-fetch";

const validPath = "https://reqres.in/api";
const invaliPath = "https://invalid_url/api";
const mockData: MockDataHelper = new MockDataHelper({ mockDataOn: false, useErrorResponse: false }, null, "json");

const headers: HeadersInit = new Headers({ "Content-Type": "application/json" });

describe("apiUtils.ts", () => {

    describe("get", () => {
        it("get should return single user with valid url", async () => {
            const response: Response = await get(`${validPath}/users/2`, headers, mockData);
            expect(response.ok).toBeTruthy();
            expect(response.status).toEqual(200);
            expect(await response.json()).toMatchObject({ data: { avatar: "https://reqres.in/img/faces/2-image.jpg" } });
        });

        it("get with httpAgent should return mixed protocol error", async () => {
            try {
                await get(`${validPath}/users/2`, headers, mockData, false);
            } catch (ex: any) {
                expect(ex.message).toContain("Protocol \"https:\" not supported. Expected \"http:\"");
            }
        });

        it("get should return invalid response if the domain doesn't exist", async () => {
            try {
                await get(invaliPath, headers, mockData);
            } catch (ex: any) {
                expect(ex.message).toContain("invalid_url");
            }
        });

        it("get should return invalid response if the path doesn't exist", async () => {
            const response: Response = await get(`${validPath}/not/work/path`, headers, mockData);
            expect(response.ok).toBeFalsy();
            expect(response.status).toEqual(404);
            expect(await response.json()).toEqual({});
        });

        it("get should return 404 if results not found", async () => {
            const response: Response = await get(`${validPath}/users/23`, headers, mockData);
            expect(response.ok).toBeFalsy();
            expect(response.status).toEqual(404);
            expect(await response.json()).toEqual({});
        });
    });
});
