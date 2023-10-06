import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT.SECRET');
        const signOptions: JwtSignOptions = {
          expiresIn: configService.get<string>('JWT.EXPIRATION_DELTA'),
        };
        return {
          secret,
          signOptions,
        };
      },
      inject: [ConfigService],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get<string>('REDIS.HOST'));
        console.log(configService.get<number>('REDIS.PORT'));
        console.log(configService.get<string>('REDIS.DATABASE_NAME'));

        return {
          store: redisStore,
          socket: {
            host: configService.get<string>('REDIS.HOST'),
            port: configService.get<number>('REDIS.PORT'),
          },
          name: configService.get<string>('REDIS.DATABASE_NAME'),
        } as RedisClientOptions;
      },
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule, CacheModule],
})
export class SharedModule {}
