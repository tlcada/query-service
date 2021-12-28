import { EmptyResultsException } from "../../exceptions";
import UserService from "../UserService";

const userService = new UserService();

describe("UserService.ts", () => {
    it("should return user info with valid username", async () => {
        const response = await userService.getUserByUsername("john");
        expect(response).toEqual({
            address: "Kivakatu 34",
            fullName: "John Smith"
        });
    });

    it("should throw EmptyResultsException with invalid username", async () => {
        await expect(async () => {
            await userService.getUserByUsername("invalid");
        }).rejects.toThrow(EmptyResultsException);
    });
});
