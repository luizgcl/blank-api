import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { PlanModule } from './modules/plan/plan.module';

@Module({
  imports: [CustomerModule, PlanModule],
})
export class CustomersModule {}
