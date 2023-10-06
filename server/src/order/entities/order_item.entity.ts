import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/product/product.entity';
import { Exclude } from 'class-transformer';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column()
  product_id: number;

  @Exclude()
  @Column()
  order_id: number;

  @ManyToOne(() => Product, (product) => product.order_items)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.order_items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column({ default: 0 })
  admin_revenue: number;

  @Column({ default: 0 })
  ambassador_revenue: number;
}
