import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { InputLoginDto } from './dtos/login.dto';
import { CommonAuthGuard } from 'src/common/guards/common-auth/common-auth.guard';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() data: InputLoginDto) {
    return this.authService.login(data);
  }

  @UseGuards(CommonAuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return this.authService.profile(req.user.sub);
  }
}
