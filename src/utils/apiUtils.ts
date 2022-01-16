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
        ...init,
    }).then((response: Response) => response);
}
