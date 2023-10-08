"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
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
    STRIPE: {
        SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
        API_VERSION: process.env.STRIPE_API_VERSION,
    },
});
//# sourceMappingURL=configuration.js.map