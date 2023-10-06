"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const user_service_1 = require("../user/user.service");
const faker_1 = require("@faker-js/faker");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(user_service_1.UserService);
    for (let i = 0; i < 30; i++) {
        const user = {
            email: faker_1.faker.internet.email(),
            first_name: faker_1.faker.person.firstName(),
            last_name: faker_1.faker.person.lastName(),
            password: faker_1.faker.internet.password(),
            is_ambassador: true,
        };
        await usersService.save(user);
    }
    process.exit();
}
bootstrap();
//# sourceMappingURL=amabassador.seeder.js.map