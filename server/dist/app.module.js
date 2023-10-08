"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const product_module_1 = require("./product/product.module");
const order_module_1 = require("./order/order.module");
const link_module_1 = require("./link/link.module");
const shared_module_1 = require("./shared/shared.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const checkout_module_1 = require("./checkout/checkout.module");
const nestjs_stripe_1 = require("nestjs-stripe");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
            }),
            nestjs_stripe_1.StripeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    apiKey: configService.get('STRIPE_API_KEY'),
                    apiVersion: configService.get('STRIPE_API_VERSION'),
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB.HOST'),
                    port: configService.get('DB.PORT'),
                    username: configService.get('DB.USERNAME'),
                    password: configService.get('DB.PASSWORD'),
                    database: configService.get('DB.NAME'),
                    autoLoadEntities: true,
                    synchronize: true,
                    logging: true,
                }),
                inject: [config_1.ConfigService],
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            product_module_1.ProductModule,
            order_module_1.OrderModule,
            link_module_1.LinkModule,
            shared_module_1.SharedModule,
            checkout_module_1.CheckoutModule,
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map