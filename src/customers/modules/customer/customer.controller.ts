import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { RegisterCustomerDto } from './dto/register-customer.dto';

@Controller('customer')
export class CustomerController {
  @Inject()
  private customerService: CustomerService;

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerCustomerDto: RegisterCustomerDto) {
    return this.customerService.register(registerCustomerDto);
  }
}
