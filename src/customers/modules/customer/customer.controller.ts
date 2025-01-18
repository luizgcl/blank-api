import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { RegisterCustomerService } from './register-customer.service';

@Controller('customer')
export class CustomerController {
  @Inject()
  private registerCustomerService: RegisterCustomerService;

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerCustomerDto: RegisterCustomerDto) {
    return this.registerCustomerService.register(registerCustomerDto);
  }
}
