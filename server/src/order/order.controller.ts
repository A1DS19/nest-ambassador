import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('admin/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Get()
  async all(): Promise<Order[]> {
    return await this.orderService.findAll({
      relations: ['user', 'order_items.product'],
    });
  }
}
