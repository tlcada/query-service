import { DatabaseException } from "../../../../exceptions";
import UserRepository, { User } from "../UserRepository";

const userRepository = new UserRepository();

describe("UserRepository.ts", () => {
    it("should return user info with valid username", async () => {
        const response: User | null = await userRepository.findUser("john");
        expect(response).toEqual({
            address: "Kivakatu 34",
            fullName: "John Smith"
        });
    });

    it("should return null with invalid username", async () => {
        const response: User | null = await userRepository.findUser("invalid");
        expect(response).toBeNull();
    });

    it("should throw DatabaseException if db connection fail", async () => {
        jest.spyOn(userRepository, "findUser").mockImplementation(() => {
            throw new DatabaseException("Failed to query");
        });

        try {
            await userRepository.findUser("");
        } catch (ex: any) {
            expect(ex).toBeInstanceOf(DatabaseException);
            expect(ex.message).toEqual("Failed to query");
        }
    });
});
