import { CustomerMembers } from '@/customers/entities/customer-members.entity';
import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({
    type: 'uuid',
    generated: 'uuid',
  })
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'picture_path', unique: true })
  @Transform(({ value }) => {
    return `profiles/${value}.png`;
  })
  picturePath: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({
    enum: ['SYSADMIN', 'ADMIN', 'EMPLOYEE'],
    default: 'EMPLOYEE',
  })
  role: 'SYSADMIN' | 'ADMIN' | 'EMPLOYEE';

  @Exclude()
  @Column({
    name: 'password_hash',
  })
  passwordHash: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => CustomerMembers, (customerMember) => customerMember.user)
  customers: CustomerMembers[];
}
