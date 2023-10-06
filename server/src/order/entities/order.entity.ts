import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order_item.entity';
import { User } from 'src/user/user.entity';
import { Exclude, Expose } from 'class-transformer';
import { Link } from 'src/link/link.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transaction_id: string;

  @Column()
  code: string;

  @Exclude()
  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.orders, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  order_items: OrderItem[];

  @ManyToOne(() => Link, (link) => link.orders, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'code', referencedColumnName: 'code' })
  link: Link;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  zip_code: string;

  @Column({ default: false })
  complete: boolean;

  @Expose()
  get total(): number {
    return this.order_items.reduce((sum, item) => sum + item.price, 0);
  }

  get admin_revenue(): number {
    let revenue = 0;

    if (this.user.is_ambassador === false) {
      revenue = this.order_items.reduce(
        (sum, order) => sum + order.admin_revenue,
        0,
      );
    }

    return revenue;
  }

  get ambassador_revenue(): number {
    let revenue = 0;

    if (this.user.is_ambassador === true) {
      revenue = this.order_items.reduce(
        (sum, order) => sum + order.ambassador_revenue,
        0,
      );
    }

    return revenue;
  }
}
