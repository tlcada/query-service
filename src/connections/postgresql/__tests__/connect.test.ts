import { PoolConfig } from "pg";
import { config } from "../../../config";
import { DatabaseException } from "../../../exceptions";
import { pgConnectPool } from "../connect";

describe("connect.ts", () => {
    it("should connect with valid default credentials", async () => {
        const client = await pgConnectPool();
        expect(client).toMatchObject({ "_connected": true });
    });

    it("should connect with valid external credentials", async () => {
        const client = await pgConnectPool({
            host: config.envSpecific.databases.pg.host,
            user: config.envSpecific.databases.pg.user,
            password: config.envSpecific.databases.pg.password,
            database: config.envSpecific.databases.pg.database,
        });
        expect(client).toMatchObject({ "_connected": true });
    });

    it("should throw error with wrong external credentials", async () => {
        const poolConfig: PoolConfig = {
            host: config.envSpecific.databases.pg.host,
            user: config.envSpecific.databases.pg.user,
            password: "wrong_password",
            database: config.envSpecific.databases.pg.database,
        };

        await expect(pgConnectPool(poolConfig)).rejects.toThrow(DatabaseException);
    });
});
