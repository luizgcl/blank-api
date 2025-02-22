import {
  DefaultSubscriptionStatus,
  SubscriptionStatusArray,
  SubscriptionStatusType,
} from '@/common/constants/subscription-status';
import {
  DefaultSubscriptionType,
  SubscriptionTypeArray,
  SubscriptionTypes,
} from '@/common/constants/subscription-type';
import { ColumnNumericTransformer } from '@/common/transformers/column-numeric.transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Plan } from './plan.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.subscriptions)
  @JoinColumn({
    name: 'customer_id',
  })
  customer: Customer;

  @ManyToOne(() => Plan, (plan) => plan.subscriptions)
  @JoinColumn({
    name: 'plan_id',
  })
  plan: Plan;

  @Column({
    name: 'subscription_type',
    enum: SubscriptionTypeArray,
    default: DefaultSubscriptionType,
  })
  subscriptionType: SubscriptionTypes;

  @Column({
    name: 'final_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  finalPrice: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  discount: number;

  @Column({
    default: 1,
    type: 'integer',
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  installments: number;

  @Column({
    name: 'installment_value',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  installmentValue: number;

  @Column({
    name: 'expires_at',
    type: 'timestamp',
    nullable: true,
  })
  expiresAt: Date;

  @Column({
    enum: SubscriptionStatusArray,
    default: DefaultSubscriptionStatus,
  })
  status: SubscriptionStatusType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
