import {
  DefaultDocumentType,
  DocumentTypes,
  DocumentTypesArray,
} from '@/common/constants/document-types';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerMembers } from './customer-members.entity';
import { Subscription } from './subscription.entity';

@Entity('customers')
@Unique('UNIQUE_DOCUMENT', ['document', 'documentType'])
export class Customer {
  @PrimaryColumn({
    type: 'uuid',
    generated: 'uuid',
  })
  id: string;

  @Column()
  name: string;

  @Column({ name: 'social_name' })
  socialName: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Index()
  @Column()
  document: string;

  @Column({
    name: 'document_type',
    enumName: 'document_type',
    enum: DocumentTypesArray,
    default: DefaultDocumentType,
  })
  documentType: DocumentTypes;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Subscription, (subscription) => subscription.customer)
  subscriptions: Subscription[];

  @OneToMany(() => CustomerMembers, (customerMember) => customerMember.customer)
  members: CustomerMembers[];
}
