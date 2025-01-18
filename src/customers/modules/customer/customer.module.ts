import { CustomerMembers } from '@/customers/entities/customer-members.entity';
import { Customer } from '@/customers/entities/customer.entity';
import { Plan } from '@/customers/entities/plan.entity';
import { Subscription } from '@/customers/entities/subscription.entity';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, Subscription, Plan, CustomerMembers]),
    UsersModule,
  ],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
