import { EnvSpecificTypes, TheConfig } from "./ConfigTypes";

export const serviceName = "query-service";

const config: TheConfig = {
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
        ...envSpecificConf()
    }
};

function envSpecificConf(): EnvSpecificTypes {
    // TODO expand this with development and production

    return {
        name: `${serviceName} - development`,
        databases: {
            pg: {
                host: process.env["DATABASE.PG.HOST"] || "",
                user: process.env["DATABASE.PG.USER"] || "",
                password: process.env["DATABASE.PG.PASSWORD"] || "",
                database: "example_db",
            }
        },
        services: {
            client: {
                url: "http://localhost:3000"
            },
        }
    };
}

export default config;
