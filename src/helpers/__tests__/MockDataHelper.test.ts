import { Response } from "node-fetch";
import MockDataHelper from "../MockDataHelper";

const dummyData = {
  name: "John Smith",
  address: {
      city: "Jyväskylä",
      postcode: "40700"
  }
};

describe("MockDataHelper.ts", () => {
    it("should return JSON response", async () => {
        const mockData: MockDataHelper = new MockDataHelper({ mockDataOn: true, useErrorResponse: false }, dummyData, "json");
        const response: Response = await mockData.buildMockDataResponse();
        expect(await response.json()).toEqual({
            name: "John Smith",
            address: {
                city: "Jyväskylä",
                postcode: "40700"
            }
        });
    });

    it("should return error response", async () => {
        const mockData: MockDataHelper = new MockDataHelper({ mockDataOn: true, useErrorResponse: true }, dummyData, "json");
        const response: Response = await mockData.buildMockDataResponse();
        expect(response.ok).toBeFalsy();
        expect(response.status).toEqual(500);
    });

    it("should return success response", async () => {
        const mockData: MockDataHelper = new MockDataHelper({ mockDataOn: true, useErrorResponse: false }, dummyData, "json");
        const response: Response = await mockData.buildMockDataResponse();
        expect(response.ok).toBeTruthy();
        expect(response.status).toEqual(200);
    });

    it("mock data should not be enabled", async () => {
        const mockData: MockDataHelper = new MockDataHelper({ mockDataOn: false, useErrorResponse: false }, dummyData, "json");
        expect(mockData.enableMockData()).toBeFalsy();
    });
});
