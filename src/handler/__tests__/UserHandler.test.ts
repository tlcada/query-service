import { EmptyResultsException } from "../../exceptions";
import UserHandler from "../UserHandler";

const userHandler = new UserHandler();

describe("UserHandler.ts", () => {
    it("should return user info with valid username", async () => {
        const response = await userHandler.getUserByUsername("john");
        expect(response).toEqual({
            address: "Kivakatu 34",
            fullName: "John Smith"
        });
    });

    it("should throw EmptyResultsException with invalid username", async () => {
        await expect(async () => {
            await userHandler.getUserByUsername("invalid");
        }).rejects.toThrow(EmptyResultsException);
    });
});
