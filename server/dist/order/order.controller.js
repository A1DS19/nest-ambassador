"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_entity_1 = require("./entities/order.entity");
const auth_guard_1 = require("../guards/auth.guard");
const createOrder_dto_1 = require("./dtos/createOrder.dto");
const link_service_1 = require("../link/link.service");
const product_service_1 = require("../product/product.service");
const order_item_entity_1 = require("./entities/order_item.entity");
const order_item_service_1 = require("./order_item.service");
const typeorm_1 = require("typeorm");
const nestjs_stripe_1 = require("nestjs-stripe");
const stripe_1 = require("stripe");
let OrderController = class OrderController {
    constructor(orderService, linkService, productService, orderItemService, dataSource, stripeClient) {
        this.orderService = orderService;
        this.linkService = linkService;
        this.productService = productService;
        this.orderItemService = orderItemService;
        this.dataSource = dataSource;
        this.stripeClient = stripeClient;
    }
    async all() {
        return await this.orderService.findAll({
            relations: ['user', 'order_items.product'],
        });
    }
    async create(createOrderDTO) {
        const link = await this.linkService.findOne({
            where: { code: createOrderDTO.code },
            relations: ['user'],
        });
        if (!link) {
            throw new common_1.NotFoundException('This link does not exist or has been deleted');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const order = new order_entity_1.Order();
            order.user_id = link.user.id;
            order.code = link.code;
            order.link = link;
            order.country = createOrderDTO.country;
            order.city = createOrderDTO.city;
            order.zip_code = createOrderDTO.zip_code;
            const line_items = [];
            for (const item of createOrderDTO.products) {
                const product = await this.productService.findOne({
                    where: { id: item.id },
                });
                if (!product) {
                    throw new common_1.NotFoundException('Product not found');
                }
                const orderItem = new order_item_entity_1.OrderItem();
                orderItem.order_id = order.id;
                orderItem.product = product;
                orderItem.price = product.price;
                orderItem.quantity = item.quantity;
                orderItem.ambassador_revenue = 0.1 * product.price * item.quantity;
                orderItem.admin_revenue = 0.9 * product.price * item.quantity;
                await this.dataSource.manager.save(orderItem);
                line_items.push({
                    name: product.title,
                    description: product.description,
                    images: [product.image],
                    amount: product.price * 100,
                    currency: 'usd',
                    quantity: item.quantity,
                });
            }
            const source = await this.stripeClient.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                success_url: `http://localhost:5000/order/success?source={CHECKOUT_SESSION_ID}`,
                cancel_url: `http://localhost:5000/order/error`,
            });
            order.transaction_id = source.id;
            await this.dataSource.manager.save(order);
            await queryRunner.commitTransaction();
            return source;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException(error.message);
        }
        finally {
            await queryRunner.release();
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "all", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createOrder_dto_1.CreateOrderDTO]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
OrderController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('admin/orders'),
    __param(5, (0, nestjs_stripe_1.InjectStripe)()),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        link_service_1.LinkService,
        product_service_1.ProductService,
        order_item_service_1.OrderItemService,
        typeorm_1.DataSource,
        stripe_1.default])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map