import {
  DefaultMemberStatus,
  MemberStatusArray,
  MemberStatusType,
} from '@/common/constants/member-status';
import { User } from '@/users/entities/user.entity';
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

@Entity('customer_members')
export class CustomerMembers {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.members)
  @JoinColumn({
    name: 'customer_id',
  })
  customer: Customer;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @Column({
    enum: MemberStatusArray,
    default: DefaultMemberStatus,
  })
  status: MemberStatusType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
