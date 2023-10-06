import { AbstractService } from 'src/shared/abstract.service';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
export declare class OrderService extends AbstractService<Order> {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
}
