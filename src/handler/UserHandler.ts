import { UserRepository } from "../connections/postgresql";
import { UserInfo } from "../connections/postgresql/repository/UserRepository";
import { EmptyResultsException } from "../exceptions";

class UserHandler {

    private userRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserByUsername(username: string): Promise<never | UserInfo> {
        const userInfo: UserInfo | null = await this.userRepository.findUser(username);
        if (userInfo === null) {
            throw new EmptyResultsException();
        }

        return userInfo;
    }
}

export default UserHandler;
