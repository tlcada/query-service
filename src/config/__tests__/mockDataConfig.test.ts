import mockDataConfig from "../mockDataConfig";

describe("mockDataConfig.ts", () => {
    it("should match", () => {
        expect(mockDataConfig).toEqual({
            slowConnection: {
                waitMs: 500
            },
            reqresAPI: {
                fetchUser: {
                    useErrorResponse: false,
                    mockDataOn: false
                },
            },
        });
    });
});
