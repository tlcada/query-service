import request from "supertest";
import server, { createHttpsApp } from "../server";
import { config } from "../config";

describe("server.ts", () => {
    it("should return 200 if app is running", async () => {
        const app = (config.useHttpsServer) ? createHttpsApp(server) : server;
        const res = await request(app).get("/").trustLocalhost();
        expect(res.statusCode).toEqual(200);
    });
});
