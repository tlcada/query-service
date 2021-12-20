import * as path from "path";
import * as winston from "winston";
import { Logger } from "winston";
import "winston-daily-rotate-file";
import * as Transport from "winston-transport";
import { config } from "../config";
import { development, production, staging } from "../environment/Profile";
import { Counter } from "prom-client";

const counter = new Counter({
    name: "winston_events_total",
    help: "Winston logger events by log level",
    labelNames: ["level", "job"] as const,
});

const transports: Transport[] | Transport = [new winston.transports.DailyRotateFile({
    filename: config.logs.general.filename,
    datePattern: config.logs.general.datePattern.toUpperCase(),
    dirname: config.logs.general.dirname,
    maxSize: config.logs.general.maxSize,
    maxFiles: config.logs.general.maxFiles,
})];

if (production || staging) {
    // TODO Use Syslog or CloudWatch logger here
}

const logger: Logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: transports
});

if (development) {
    logger.add(new winston.transports.Console());
}

class LogBuilder {

    static create(nodeModule: NodeModule): Logger {
        logger.defaultMeta = { path: this.getFileName(nodeModule) };
        LogBuilder.overrideLogMethod(logger, ["error", "warn", "info", "http", "verbose", "debug", "silly"]);
        return logger;
    }

    private static getFileName(nodeModule: NodeModule): string {
        const parts: string[] = nodeModule.filename.split(path.sep);
        return ".../" + parts[parts.length - 2] + "/" + parts[parts.length - 1];
    }

    private static overrideLogMethod(logger: any, overrideLevels: string[]): void {
        overrideLevels.forEach((level: string) => {
            logger[level] = function (args: any): Logger {
                counter.inc({ level, job: config.envSpecific.name });
                return logger.log.call(logger, level, { ...args, position: LogBuilder.getPositionInfo() });
            };
        });
    }

    private static getPositionInfo(): string | undefined {
        const stackList = (new Error()).stack?.split("\n").slice(2);
        if (!stackList) {
            return undefined;
        }

        // Stack trace format:
        const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
        const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

        const logMethodRow = stackList[1];
        const sp = stackReg.exec(logMethodRow) || stackReg2.exec(logMethodRow);

        if (sp && sp.length === 5) {
            return sp[3] + ":" + sp[4];
        }

        return undefined;
    }
}

export default LogBuilder;
