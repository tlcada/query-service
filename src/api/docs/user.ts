const getUser = {
    tags: [
        "user"
    ],
    summary: "Find user information",
    operationId: "fetchUser",
    produces: [
        "application/json",
    ],
    parameters: [{
        name: "username",
        in: "path",
        description: "Username values that need to fetch user information",
        required: true,
        type: "string"
    }],
    responses: {
        "200": {
            description: "successful operation",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            address: {
                                type: "string",
                                example: "Kivikatu 29",
                            },
                            fullName: {
                                type: "string",
                                example: "John Snow",
                            }
                        },
                    },
                },
            },
        },
        "404": {
            description: "Not found",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "No search results found",
                            },
                            status: {
                                type: "integer",
                                description: "http status code",
                                example: 404
                            },
                            error: {
                                type: "string",
                                example: "Not found",
                            },
                            path: {
                                type: "string",
                                example: "/api/v1/user/john",
                            }
                        },
                    },
                },
            },
        },
        "500": {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Database connection failed.",
                            },
                            status: {
                                type: "integer",
                                description: "http status code",
                                example: 500
                            },
                            path: {
                                type: "string",
                                example: "/api/v1/user/john",
                            }
                        },
                    },
                },
            },
        },
    },
};

export { getUser };
