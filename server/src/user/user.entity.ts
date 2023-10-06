import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Order } from 'src/order/entities/order.entity';
import { Link } from 'src/link/link.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column()
  first_name: string;

  @Exclude()
  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: false })
  is_ambassador: boolean;

  @OneToMany(() => Order, (order) => order.user, {
    createForeignKeyConstraints: false,
  })
  orders: Order[];

  @OneToMany(() => Link, (link) => link.user)
  links: Link[];

  @Expose()
  get name(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  get revenue(): number {
    return this.orders
      .filter((order) => order.complete && this.is_ambassador === true)
      .reduce((sum, order) => sum + order.ambassador_revenue, 0);
  }
}
