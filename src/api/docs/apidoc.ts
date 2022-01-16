import { config, serviceName } from "../../config";
import path from "path";
import { getUser } from "./user";

const apiDocumentation = {
    definition: {
        openapi: "3.0.0",
        info: {
            version: "0.1.0",
            title: serviceName.toUpperCase(),
            description: "REST API documentation",
            termsOfService: "https://example.com/terms",
            contact: {
                name: "John Smith",
                email: "dev@example.com",
                url: "https://example.com",
            },
            license: {
                name: "Licensed Under MIT",
                url: "https://spdx.org/licenses/MIT.html"
            },
        },
        servers: [
            {
                url: `https://localhost:${config.port}${config.api.path}/v1`,
                description: "Development server",
            },
            {
                url: `http://localhost:${config.port}${config.api.path}/v1`,
                description: "Development server",
            },
        ],
        tags: [
            {
                name: "user",
                description: "Operations about user",
            },
        ],
        schemes: [
            "http"
        ],
        paths: {
            "/user/{username}": {
                get: getUser,
            },
        }
    },
    apis: [path.join(__dirname, "*.ts")], // Paths to files containing OpenAPI definitions
};

export { apiDocumentation };
