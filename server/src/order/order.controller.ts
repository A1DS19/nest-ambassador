import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateOrderDTO } from './dtos/createOrder.dto';
import { LinkService } from 'src/link/link.service';
import { ProductService } from 'src/product/product.service';
import { OrderItem } from './entities/order_item.entity';
import { OrderItemService } from './order_item.service';
import { DataSource } from 'typeorm';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('admin/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly linkService: LinkService,
    private readonly productService: ProductService,
    private readonly orderItemService: OrderItemService,
    private readonly dataSource: DataSource,
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async all(): Promise<Order[]> {
    return await this.orderService.findAll({
      relations: ['user', 'order_items.product'],
    });
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createOrderDTO: CreateOrderDTO,
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    const link = await this.linkService.findOne({
      where: { code: createOrderDTO.code },
      relations: ['user'],
    });

    if (!link) {
      throw new NotFoundException(
        'This link does not exist or has been deleted',
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = new Order();
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
          throw new NotFoundException('Product not found');
        }

        const orderItem = new OrderItem();
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
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error.message);
    } finally {
      await queryRunner.release();
    }
  }
}
