"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const faker_1 = require("@faker-js/faker");
const product_service_1 = require("../product/product.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const productService = app.get(product_service_1.ProductService);
    for (let i = 0; i < 30; i++) {
        const product = {
            description: faker_1.faker.lorem.paragraph(),
            image: faker_1.faker.image.url({ width: 200, height: 200 }),
            price: parseFloat(faker_1.faker.commerce.price({ dec: 2 })),
            title: faker_1.faker.commerce.productName(),
        };
        await productService.create(product);
    }
    process.exit();
}
bootstrap();
//# sourceMappingURL=products.seeder.js.map