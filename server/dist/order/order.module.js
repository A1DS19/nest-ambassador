"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./order.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_module_1 = require("../user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order_item.entity");
const order_item_service_1 = require("./order_item.service");
const link_module_1 = require("../link/link.module");
const product_module_1 = require("../product/product.module");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule,
            config_1.ConfigModule,
            user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order, order_item_entity_1.OrderItem]),
            link_module_1.LinkModule,
            product_module_1.ProductModule,
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, order_item_service_1.OrderItemService],
        exports: [order_service_1.OrderService],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map