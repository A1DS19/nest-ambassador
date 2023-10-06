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

export default (): IEnvConfig => ({
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRATION_DELTA: process.env.JWT_EXPIRATION_DELTA,
  },
  DB: {
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DB_PORT) || 3306,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
  },
  REDIS: {
    URL: process.env.REDIS_URL,
    HOST: process.env.REDIS_HOST,
    PORT: Number(process.env.REDIS_PORT) || 6379,
    DATABASE_NAME: process.env.REDIS_DATABASE_NAME,
  },
});
