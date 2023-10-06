import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { faker } from '@faker-js/faker';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/product.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productService = app.get(ProductService);

  for (let i = 0; i < 30; i++) {
    const product: Partial<Omit<Product, 'id'>> = {
      description: faker.lorem.paragraph(),
      image: faker.image.url({ width: 200, height: 200 }),
      price: parseFloat(faker.commerce.price({ dec: 2 })),
      title: faker.commerce.productName(),
    };

    await productService.create(product);
  }

  process.exit();
}

bootstrap();
