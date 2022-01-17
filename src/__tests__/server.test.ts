import request from "supertest";
import server from "../server";

describe("server.ts", () => {
    it("should return 200 if app is running", async () => {
        const res = await request(server).get("/");
        expect(res.statusCode).toEqual(200);
    });
});
