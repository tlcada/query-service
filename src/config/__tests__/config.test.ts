import config from "../config";

describe("config.ts", () => {
    it("should match", () => {
        expect(config).toEqual({
            port: 8055,
            api: {
                timeoutTimeMinutes: 5,
                secure: {
                    basicAuth: {
                        general: { "root": "password" },
                        metrics: { "metrics": "password" },
                    },
                },
                path: "/api",
                metrics: {
                    path: "/metrics",
                    scrapeIntervalMS: 5000,
                },
                options: {
                    bodyParser: {
                        json: { limit: "50mb", extended: true },
                        urlencoded: { limit: "50mb", extended: true }
                    },
                },
            },
            logs: {
                general: {
                    filename: "%DATE%.log",
                    dirname: "logs",
                    datePattern: "yyyy-MM-dd",
                    maxSize: "20m",
                    maxFiles: "14d",
                },
            },
            envSpecific: {
                name: config.envSpecific.name,
                databases: {
                    pg: {
                        host: config.envSpecific.databases.pg.host,
                        user: config.envSpecific.databases.pg.user,
                        password: config.envSpecific.databases.pg.password,
                        database: "example_db",
                    }
                },
                services: {
                    client: {
                        url: config.envSpecific.services.client.url
                    },
                }
            }
        });
    });
});
