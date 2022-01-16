import { UserRepository } from "../connections/postgresql";
import { User } from "../connections/postgresql/repository/UserRepository";
import { EmptyResultsException } from "../exceptions";
import { config, mockDataConfig } from "../config";
import { get } from "../utils/apiUtils";
import { Headers } from "node-fetch";
import { generalResponseHelper, MockDataHelper } from "../helpers";
import { GeneralErrorResponseType, GeneralResponseHelper } from "../helpers/ResponseHelper";
import { LogBuilder, LogFormatter } from "../logger";

const log = LogBuilder.create(module);

class UserService {

    private userRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserByUsername(username: string): Promise<never | User> {
        let user: User | null = await this.userRepository.findUser(username);
        if (user === null) {
            throw new EmptyResultsException();
        }

        const response: GeneralResponseHelper = await generalResponseHelper(() => {
            const mockData = new MockDataHelper(mockDataConfig.reqresAPI.fetchUser, { data: { first_name: "John", last_name: "Smith" } }, "json");
            const headers = new Headers({ "Content-Type": "application/json" });
            // Always fetch the same user because this is just an example
            return get(`${config.envSpecific.services.reqres.url}/users/2`, headers, mockData);
        });

        if (response.successResponse) {
            // The response contains more information about the user, but this is a lazy typing
            type UserFamilyInformation = {
               readonly data: {
                   readonly first_name: string;
                   readonly last_name: string;
                };
            };

            const userFamilyInformation = await response.successResponse.json() as UserFamilyInformation;
            // Add some dummy information to the user
            user = {
                ...user,
                family: {
                    kids: [{
                        name: `${userFamilyInformation.data.first_name} ${userFamilyInformation.data.last_name}`,
                    }]
                }
            };
        } else {
            const error = response.errorResponse as GeneralErrorResponseType;
            log.error(new LogFormatter(`Can not fetch user family information. ${error.message}`).write());
        }

        return user;
    }
}

export default UserService;
