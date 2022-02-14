import http from "http";
import https from "https";
import fetch, { HeadersInit, RequestInit, Response } from "node-fetch";
import { config, mockDataConfig } from "../config";
import { production } from "../environment/Profile";
import { MockDataHelper } from "../helpers";
import { SnippetUtils } from "../utils";

const httpsAgent = new https.Agent({
    rejectUnauthorized: production
});

const httpAgent = new http.Agent({
    keepAlive: true
});

const httpsServerEnabled = config.useHttpsServer;

export const get = async (url: string, headers: HeadersInit, mockData: MockDataHelper, useHttpsAgent = httpsServerEnabled): Promise<Response> | never => {
    return _fetch(mockData, url, {
        method: "GET",
        headers: headers,
    }, useHttpsAgent);
};

async function _fetch(mockData: MockDataHelper, url: string, init: RequestInit, useHttpsAgent: boolean): Promise<Response> {
    if (mockData.enableMockData()) {
        await SnippetUtils.sleep(mockDataConfig.slowConnection.waitMs);
        return mockData.buildMockDataResponse();
    }

    const protocol: http.Agent | https.Agent = (useHttpsAgent) ? httpsAgent : httpAgent;

    return fetch(url, {
        agent: protocol,
        signal: timeout(10).signal,
        ...init,
    }).then((response: Response) => response);
}

const timeout = (time: number) => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), time * 1000);
    return controller;
};
