import { PoolConfig } from "pg";
import { config } from "../../../config";
import { DatabaseException } from "../../../exceptions";
import { pgConnectPool } from "../connect";

export function isPgFireUp(): string {
    return config.envSpecific.databases.pg.host;
}

export function itIf_pgIsFireUp(): jest.It {
    return isPgFireUp() ? it : it.skip;
}

describe("connect.ts", () => {
    itIf_pgIsFireUp()("should connect with valid default credentials", async () => {
        const client = await pgConnectPool();
        expect(client).toMatchObject({ "_connected": true });
    });

    itIf_pgIsFireUp()("should connect with valid external credentials", async () => {
        const client = await pgConnectPool({
            host: config.envSpecific.databases.pg.host,
            user: config.envSpecific.databases.pg.user,
            password: config.envSpecific.databases.pg.password,
            database: config.envSpecific.databases.pg.database,
        });
        expect(client).toMatchObject({ "_connected": true });
    });

    itIf_pgIsFireUp()("should throw error with wrong external credentials", async () => {
        const poolConfig: PoolConfig = {
            host: config.envSpecific.databases.pg.host,
            user: config.envSpecific.databases.pg.user,
            password: "wrong_password",
            database: config.envSpecific.databases.pg.database,
        };

        await expect(pgConnectPool(poolConfig)).rejects.toThrow(DatabaseException);
    });
});
