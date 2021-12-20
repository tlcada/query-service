import { config } from "../../config";
import { corsDefaultOptions } from "../cors";

describe("cors.ts", () => {
    it("should match", () => {
        expect(corsDefaultOptions).toEqual({
            origin: [config.envSpecific.services.client.url],
            methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
            maxAge: 3600,
        });
    });
});
