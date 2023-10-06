import { OrderItem } from './order_item.entity';
import { User } from 'src/user/user.entity';
import { Link } from 'src/link/link.entity';
export declare class Order {
    id: number;
    transaction_id: string;
    code: string;
    user_id: number;
    user: User;
    order_items: OrderItem[];
    link: Link;
    country: string;
    city: string;
    zip_code: string;
    complete: boolean;
    get total(): number;
    get admin_revenue(): number;
    get ambassador_revenue(): number;
}
