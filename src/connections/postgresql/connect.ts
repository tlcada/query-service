import { Pool, PoolClient, PoolConfig } from "pg";
import { config } from "../../config";
import { DatabaseException } from "../../exceptions";
import { LogBuilder, LogFormatter } from "../../logger";

const log = LogBuilder.create(module);

const poolConfig: PoolConfig = {
    host: config.envSpecific.databases.pg.host,
    user: config.envSpecific.databases.pg.user,
    password: config.envSpecific.databases.pg.password,
    database: config.envSpecific.databases.pg.database,
    max: 20, // Maximum number of clients the pool should contain.
    connectionTimeoutMillis: 2000, // Number of milliseconds to wait before timing out when connecting a new client.
};

async function pgConnectPool(overridePoolConfig?: PoolConfig): Promise<PoolClient | never> {
    const pool: PoolConfig = overridePoolConfig ? overridePoolConfig : poolConfig;
    return new Pool(pool).connect().catch((err: Error) => {
        log.error(new LogFormatter(err.message).write());
        // Increase manageability with your own error
        throw new DatabaseException({ own: "Database connection failed.", rawError: err.message });
    });
}

export { pgConnectPool };
