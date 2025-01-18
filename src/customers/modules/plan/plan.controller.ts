import { Controller, Get, Inject } from '@nestjs/common';
import { PlanService } from './plan.service';

@Controller('plans')
export class PlanController {
  @Inject()
  private planService: PlanService;

  @Get()
  fetchPlans() {
    return this.planService.fetchPlans();
  }
}
