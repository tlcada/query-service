import request from "supertest";
import server from "../../server";

describe("userController.ts", () => {
    describe("# .../v1/user", () => {
        const url = "/api/v1/user";

        it("should return 200 with the right API call", async () => {
            const res = await request(server.listen())
                .get(`${url}/john`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({
                address: "Kivakatu 34",
                fullName: "John Smith",
                family: {
                    kids: [{
                        name: "Janet Weaver"
                    }]
                }
            });
        });

        it("should return 404 with not exist username", async () => {
            const res = await request(server.listen())
                .get(`${url}/not_exist`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toMatchObject({
                error: "Not Found",
                message: "No search results found",
                path: `${url}/not_exist`,
                status: 404
            });
        });
    });
});
