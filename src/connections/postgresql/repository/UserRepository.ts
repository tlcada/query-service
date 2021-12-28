import { DatabaseException } from "../../../exceptions";
import { LogBuilder, LogFormatter } from "../../../logger";
import { pgConnectPool } from "../connect";

export type UserInfo = {
    readonly address: string;
    readonly fullName: string;
}

const log = LogBuilder.create(module);

class UserRepository {

    async findUser(username: string): Promise<never | UserInfo | null> {
        const client = await pgConnectPool();

        try {
            const results = await client.query("SELECT * FROM user WHERE username = $1", [username]);
            if (results.rowCount > 0) {
                const result = results.rows[0];
                return {
                    address: result["address"],
                    fullName: `${result["first_name"]} ${result["last_name"]}`,
                };
            }

            return null;
        } catch (err: any) {
            log.error(new LogFormatter("Failed to query").username(username).write());
            throw new DatabaseException(err);
        } finally {
            client.release();
        }
    }
}

export default UserRepository;
