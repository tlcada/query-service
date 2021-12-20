// Don't call logger.ts file here because otherwise; development, test, staging and production variable is undefined in logger.ts file.

enum Profile {
    development = "development",
    test = "test",
    production = "production",
    staging = "staging",
}

const env: string | undefined = process.env.NODE_ENV;
const jestEnv: string | undefined = process.env.JEST_PROFILE;

const development = (env === Profile.development);
const production = (env === Profile.production);
const staging = (env === Profile.staging);

// This is separated from NODE_ENV because you can't define, for example,
// staging profile and test profile in Dockerfile at the same time.
const test = (jestEnv === Profile.test);

export { development, test, production, staging, env as Env };
