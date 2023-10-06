"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const redisStore = require("cache-manager-redis-store");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const secret = configService.get('JWT.SECRET');
                    const signOptions = {
                        expiresIn: configService.get('JWT.EXPIRATION_DELTA'),
                    };
                    return {
                        secret,
                        signOptions,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            cache_manager_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    console.log(configService.get('REDIS.HOST'));
                    console.log(configService.get('REDIS.PORT'));
                    console.log(configService.get('REDIS.DATABASE_NAME'));
                    return {
                        store: redisStore,
                        socket: {
                            host: configService.get('REDIS.HOST'),
                            port: configService.get('REDIS.PORT'),
                        },
                        name: configService.get('REDIS.DATABASE_NAME'),
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        exports: [jwt_1.JwtModule, cache_manager_1.CacheModule],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map