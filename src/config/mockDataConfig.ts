import { MockDataConfigType } from "./MockDataConfigType";

const mockDataOn = process.env.MOCK_DATA_ON === "true";

const mockDataConfig: MockDataConfigType = {
    slowConnection: {
        waitMs: 500
    },
    reqresAPI: {
        fetchUser: {
            useErrorResponse: false,
            mockDataOn: mockDataOn
        },
    },
};

export default mockDataConfig;
