import os from "os-utils";
import { Gauge } from "prom-client";
import { config } from "../config";

const cpuUsageGauge = new Gauge({
    name: "system_cpu_usage",
    help: "System CPU usage",
    labelNames: ["job"]
});

const processUptimeGauge = new Gauge({
    name: "process_uptime_seconds",
    help: "Number of milliseconds that the process has been running for",
    labelNames: ["job"]
});

export function customMetrics(): void {
    setInterval(function(){
        os.cpuUsage((usage: number) => {
            cpuUsageGauge.set({ job: config.envSpecific.name }, usage);
        });

        processUptimeGauge.set({ job: config.envSpecific.name }, os.processUptime());
    }, config.api.metrics.scrapeIntervalMS);
}
