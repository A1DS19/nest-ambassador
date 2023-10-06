"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const faker_1 = require("@faker-js/faker");
const order_service_1 = require("../order/order.service");
const order_item_service_1 = require("../order/order_item.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const orderService = app.get(order_service_1.OrderService);
    const orderItemService = app.get(order_item_service_1.OrderItemService);
    for (let i = 0; i < 30; i++) {
        const order = {
            user_id: 1,
            city: faker_1.faker.location.city(),
            country: faker_1.faker.location.country(),
            code: faker_1.faker.lorem.slug(),
            complete: faker_1.faker.datatype.boolean(),
            transaction_id: faker_1.faker.string.uuid(),
            zip_code: faker_1.faker.location.zipCode(),
        };
        await orderService.create(order);
        for (let i = 1; i < 30; i++) {
            const orderItem = {
                order_id: order.id,
                product_id: i,
                quantity: faker_1.faker.number.int({ min: 1, max: 5 }),
                price: faker_1.faker.number.float({ min: 1, max: 2000 }),
                ambassador_revenue: faker_1.faker.number.float({ min: 1, max: 2000 }),
                admin_revenue: faker_1.faker.number.float({ min: 1, max: 2000 }),
            };
            await orderItemService.create(orderItem);
        }
    }
    process.exit();
}
bootstrap();
//# sourceMappingURL=order.seeder.js.map