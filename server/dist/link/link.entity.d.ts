import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
export declare class Link {
    id: number;
    code: string;
    user_id: number;
    user: User;
    products: Product[];
    orders: Order[];
}
