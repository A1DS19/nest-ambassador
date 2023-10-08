import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderDTO } from './dtos/createOrder.dto';
import { LinkService } from 'src/link/link.service';
import { ProductService } from 'src/product/product.service';
import { OrderItemService } from './order_item.service';
import { DataSource } from 'typeorm';
import Stripe from 'stripe';
export declare class OrderController {
    private readonly orderService;
    private readonly linkService;
    private readonly productService;
    private readonly orderItemService;
    private readonly dataSource;
    private readonly stripeClient;
    constructor(orderService: OrderService, linkService: LinkService, productService: ProductService, orderItemService: OrderItemService, dataSource: DataSource, stripeClient: Stripe);
    all(): Promise<Order[]>;
    create(createOrderDTO: CreateOrderDTO): Promise<Stripe.Response<Stripe.Checkout.Session>>;
}
