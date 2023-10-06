import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    all(): Promise<Order[]>;
}
