import { Order } from './order.entity';
import { Product } from 'src/product/product.entity';
export declare class OrderItem {
    id: number;
    product_id: number;
    order_id: number;
    product: Product;
    order: Order;
    quantity: number;
    price: number;
    admin_revenue: number;
    ambassador_revenue: number;
}
