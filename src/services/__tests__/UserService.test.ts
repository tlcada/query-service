import { EmptyResultsException } from "../../exceptions";
import UserService from "../UserService";
import UserRepository from "../../connections/postgresql/repository/UserRepository";

const userService = new UserService();

describe("UserService.ts", () => {
    it("should return user info with valid username", async () => {
        // Mock because we don't need to test repository class here
        jest.spyOn(UserRepository.prototype, "findUser").mockImplementation(() => Promise.resolve({
            address: "Kivakatu 34",
            fullName: "John Smith",
            family: undefined
        }));

        const response = await userService.getUserByUsername("john");
        expect(response).toEqual({
            address: "Kivakatu 34",
            fullName: "John Smith",
            family: {
                kids: [{
                    name: "Janet Weaver"
                }]
            }
        });
    });

    it("should throw EmptyResultsException with invalid username", async () => {
        // Mock because we don't need to test repository class here
        jest.spyOn(UserRepository.prototype, "findUser").mockImplementation(() => Promise.resolve(null));

        await expect(async () => {
            await userService.getUserByUsername("invalid");
        }).rejects.toThrow(EmptyResultsException);
    });
});
