import { OrderItem } from 'src/order/entities/order_item.entity';
export declare class Product {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    order_items: OrderItem[];
}
