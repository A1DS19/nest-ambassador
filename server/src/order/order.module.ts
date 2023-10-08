import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order_item.entity';
import { OrderItemService } from './order_item.service';
import { LinkModule } from 'src/link/link.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    JwtModule,
    ConfigModule,
    UserModule,
    TypeOrmModule.forFeature([Order, OrderItem]),
    LinkModule,
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderItemService],
  exports: [OrderService],
})
export class OrderModule {}
