export interface IEnvConfig {
    JWT: {
        SECRET: string;
        EXPIRATION_DELTA: string;
    };
    DB: {
        HOST: string;
        PORT: number;
        USERNAME: string;
        PASSWORD: string;
        NAME: string;
    };
    REDIS: {
        URL: string;
        HOST: string;
        PORT: number;
        DATABASE_NAME: string;
    };
}
declare const _default: () => IEnvConfig;
export default _default;
