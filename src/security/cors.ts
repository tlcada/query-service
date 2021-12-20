import { CorsOptions } from "cors";
import { config } from "../config";

const corsDefaultOptions: CorsOptions = {
    origin: [config.envSpecific.services.client.url],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 3600,
};

export { corsDefaultOptions };
