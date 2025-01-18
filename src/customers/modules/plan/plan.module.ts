import { Plan } from '@/customers/entities/plan.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  providers: [PlanService],
  controllers: [PlanController],
})
export class PlanModule {}
