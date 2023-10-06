import { Order } from 'src/order/entities/order.entity';
import { Link } from 'src/link/link.entity';
export declare class User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    is_ambassador: boolean;
    orders: Order[];
    links: Link[];
    get name(): string;
    get revenue(): number;
}
