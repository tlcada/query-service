import { DatabaseException } from "../../../../exceptions";
import UserRepository, { User } from "../UserRepository";
import { itIf_pgIsFireUp } from "../../__tests__/connect.test";

const userRepository = new UserRepository();

describe("UserRepository.ts", () => {
    itIf_pgIsFireUp()("should return user info with valid username", async () => {
        const response: User | null = await userRepository.findUser("john");
        expect(response).toEqual({
            address: "Kivakatu 34",
            fullName: "John Smith",
            family: undefined
        });
    });

    itIf_pgIsFireUp()("should return null with invalid username", async () => {
        const response: User | null = await userRepository.findUser("invalid");
        expect(response).toBeNull();
    });

    itIf_pgIsFireUp()("should throw DatabaseException if db connection fail", async () => {
        jest.spyOn(userRepository, "findUser").mockImplementation(() => {
            throw new DatabaseException({ own: "Failed to query", rawError: "test" });
        });

        try {
            await userRepository.findUser("");
        } catch (ex: any) {
            expect(ex).toBeInstanceOf(DatabaseException);
            expect(ex.message).toEqual("Failed to query");
            expect(ex.getRawError()).toEqual("test");
        }
    });
});
