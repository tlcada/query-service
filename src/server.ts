// Enable environment variable support
import dotenv from "dotenv";
dotenv.config();

import https, { Server } from "https";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import basicAuth from "express-basic-auth";
import promBundle from "express-prom-bundle";
import mustache from "mustache-express";
import * as fs from "fs";
import * as path from "path";
import { config } from "./config";
import { Env, test } from "./environment/Profile";
import { LogBuilder, LogFormatter } from "./logger";
import { controller } from "./api";
import { corsDefaultOptions } from "./security";
import { customMetrics } from "./utils";

const app: Express = express();
const log = LogBuilder.create(module);

// Catch the favicon.ico request and send a 204 No Content status
app.get("/favicon.ico", (req, res) => res.status(204));
// Add default path handler
app.get("/", (req: Request, res: Response) => {
    res.status(200).render("welcome");
});

// View engine (mustache) setup. Basically add .html support
app.engine("html", mustache(path.join(__dirname, "public", "views", "partials"), ".html"));
app.set("view engine", "html");
app.set("views", path.join(__dirname, "public", "views"));

app.use(cors(corsDefaultOptions)); // Cors
app.use(express.json(config.api.options.bodyParser.json)); // Parse application/json, basically parse incoming Request Object as a JSON Object
app.use(express.urlencoded(config.api.options.bodyParser.urlencoded)); // Parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

// Prometheus metrics. The order in which the routes are registered is important,
// since only the routes registered after the express-prom-bundle will be measured.
app.use(config.api.metrics.path, basicAuth({ users: config.api.secure.basicAuth.metrics, challenge: true }));
app.use(promBundle({
    includeMethod: true,
    includePath: true,
    metricsPath: config.api.metrics.path,
    metricType: "summary"
}));

// All routes
app.use(config.api.path, controller);

if (!test) {
    if (config.useHttpsServer) {
        const httpsApp: Server = https.createServer({
            key: fs.readFileSync(path.join(__dirname, "config", "keystore", "query_service.key")),
            cert: fs.readFileSync(path.join(__dirname, "config", "keystore", "query_service.cert")),
        }, app);

        httpsApp.listen(config.port, () => {
            log.info(new LogFormatter(`Server started on port: ${ config.port }. HTTPS enabled: true. NODE_ENV: ${ Env }`).write());
        });
    } else {
        app.listen(config.port, () => {
            log.info(new LogFormatter(`Server started on port: ${ config.port }. HTTPS enabled: false. NODE_ENV: ${ Env }`).write());
        });
    }

    customMetrics();
}

export default app;
