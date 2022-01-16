export type MockDataConfigType = {
    readonly slowConnection: {
        readonly waitMs: number;
    };
    readonly reqresAPI: {
        readonly fetchUser: MockDataApiOperation;
    };
};

export type MockDataApiOperation = {
    readonly mockDataOn: boolean;
    readonly useErrorResponse: boolean;
};
