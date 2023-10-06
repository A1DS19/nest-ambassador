import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { faker } from '@faker-js/faker';
import { OrderService } from 'src/order/order.service';
import { Order } from 'src/order/entities/order.entity';
import { OrderItemService } from 'src/order/order_item.service';
import { OrderItem } from 'src/order/entities/order_item.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const orderService = app.get(OrderService);
  const orderItemService = app.get(OrderItemService);

  for (let i = 0; i < 30; i++) {
    const order: Partial<Omit<Order, 'id'>> = {
      user_id: 1,
      city: faker.location.city(),
      country: faker.location.country(),
      code: faker.lorem.slug(),
      complete: faker.datatype.boolean(),
      transaction_id: faker.string.uuid(),
      zip_code: faker.location.zipCode(),
    };

    await orderService.create(order);

    for (let i = 1; i < 30; i++) {
      const orderItem: Partial<Omit<OrderItem, 'id'>> = {
        order_id: (order as Order).id,
        product_id: i,
        quantity: faker.number.int({ min: 1, max: 5 }),
        price: faker.number.float({ min: 1, max: 2000 }),
        ambassador_revenue: faker.number.float({ min: 1, max: 2000 }),
        admin_revenue: faker.number.float({ min: 1, max: 2000 }),
      };

      await orderItemService.create(orderItem);
    }
  }

  process.exit();
}

bootstrap();
