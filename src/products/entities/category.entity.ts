import {
  DefaultOrderFrequency,
  OrderFrequencyArray,
  OrderFrequencyType,
} from '@/common/constants/order-frequency';
import { Customer } from '@/customers/entities/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
@Unique('UNIQUE_SLUG_CATEGORY', ['slug', 'customer'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.categories)
  @JoinColumn({
    name: 'customer_id',
  })
  customer: Customer;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  color: string;

  @Column({
    name: 'order_frequency',
    enum: OrderFrequencyArray,
    default: DefaultOrderFrequency,
  })
  orderFrequency: OrderFrequencyType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
