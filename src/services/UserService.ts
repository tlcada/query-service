import { UserRepository } from "../connections/postgresql";
import { User } from "../connections/postgresql/repository/UserRepository";
import { EmptyResultsException } from "../exceptions";

class UserService {

    private userRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserByUsername(username: string): Promise<never | User> {
        const userInfo: User | null = await this.userRepository.findUser(username);
        if (userInfo === null) {
            throw new EmptyResultsException();
        }

        return userInfo;
    }
}

export default UserService;
