import { AbstractService } from 'src/shared/abstract.service';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order_item.entity';
export declare class OrderItemService extends AbstractService<OrderItem> {
    private readonly orderItemRepository;
    constructor(orderItemRepository: Repository<OrderItem>);
}
