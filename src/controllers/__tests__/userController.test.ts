import request from "supertest";
import server from "../../server";
import UserRepository from "../../connections/postgresql/repository/UserRepository";
import { isPgFireUp } from "../../connections/postgresql/__tests__/connect.test";

describe("userController.ts", () => {
    describe("# .../v1/user", () => {
        const url = "/api/v1/user";

        it("should return 200 with the right API call", async () => {
            if (!isPgFireUp()) {
                jest.spyOn(UserRepository.prototype, "findUser").mockImplementation(() => Promise.resolve({
                    address: "Kivakatu 34",
                    fullName: "John Smith",
                    family: undefined
                }));
            }

            const res = await request(server).get(`${url}/john`);

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
            if (!isPgFireUp()) {
                jest.spyOn(UserRepository.prototype, "findUser").mockImplementation(() => Promise.resolve(null));
            }

            const res = await request(server).get(`${url}/not_exist`);

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
