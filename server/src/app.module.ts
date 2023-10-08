import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import EnvConfig from './config/configuration';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { LinkModule } from './link/link.module';
import { SharedModule } from './shared/shared.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CheckoutModule } from './checkout/checkout.module';
import { StripeModule, StripeOptions } from 'nestjs-stripe';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
    }),
    StripeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          apiKey: configService.get<string>('STRIPE_API_KEY'),
          apiVersion: configService.get<string>('STRIPE_API_VERSION'),
        } as StripeOptions),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB.HOST'),
        port: configService.get<number>('DB.PORT'),
        username: configService.get<string>('DB.USERNAME'),
        password: configService.get<string>('DB.PASSWORD'),
        database: configService.get<string>('DB.NAME'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
    LinkModule,
    SharedModule,
    CheckoutModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
