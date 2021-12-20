import { DatabaseException } from "../../../exceptions";
import { pgConnectPool } from "../connect";
import { LogBuilder, LogFormatter } from "../../../logger";

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
                    fullName: result["fullName"],
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
