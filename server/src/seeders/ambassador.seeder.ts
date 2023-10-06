import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { UserService } from 'src/user/user.service';
import { faker } from '@faker-js/faker';
import { User } from 'src/user/user.entity';
import { hash } from 'bcryptjs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UserService);

  for (let i = 0; i < 30; i++) {
    const user: Partial<Omit<User, 'id'>> = {
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      password: await hash(faker.internet.password(), 12),
      is_ambassador: true,
    };

    await usersService.save(user);
  }

  process.exit();
}

bootstrap();
