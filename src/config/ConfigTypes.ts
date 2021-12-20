type BodyParserTypes = {
    readonly limit: string;
    readonly extended: boolean;
};

type BasicAuthOptions = { [username: string]: string };

export type TheConfig = {
    readonly port: number;
    readonly api: {
        readonly timeoutTimeMinutes: number;
        readonly secure: {
            readonly basicAuth: {
                readonly general: BasicAuthOptions;
                readonly metrics: BasicAuthOptions;
            };
        };
        readonly path: string;
        readonly metrics: {
            readonly path: string;
            readonly scrapeIntervalMS: number;
        };
        readonly options: {
            readonly bodyParser: {
                readonly json: BodyParserTypes;
                readonly urlencoded: BodyParserTypes;
            };
        };
    };
    readonly logs: {
        readonly general: {
            readonly filename: string;
            readonly dirname: string;
            readonly datePattern: string;
            readonly maxSize: string;
            readonly maxFiles: string;
        };
    };
    readonly envSpecific: EnvSpecificTypes;
}

export type EnvSpecificTypes = {
    readonly name: string;
    readonly databases: {
        readonly pg: {
            readonly host: string;
            readonly user: string;
            readonly password: string;
            readonly database: string;
        };
    };
    readonly services: {
        readonly client: {
            readonly url: string;
        };
    };
};
