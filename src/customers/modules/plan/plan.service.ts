import { Plan } from '@/customers/entities/plan.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlanService {
  @InjectRepository(Plan)
  private planRepository: Repository<Plan>;

  async fetchPlans() {
    const plans = await this.planRepository.find({
      order: {
        id: 'ASC',
      },
      cache: true,
    });

    return {
      data: plans,
    };
  }
}
