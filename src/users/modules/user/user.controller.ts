import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UserService } from './user.service';
import { CommonAuthGuard } from 'src/common/guards/common-auth/common-auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { UserRole } from 'src/common/constants/user-roles';
import { UpdateEmailDto } from './dtos/update-email.dto';

@Roles(UserRole.SYSADMIN, UserRole.ADMIN)
@UseGuards(CommonAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id/email')
  updateEmail(@Param('id') id: string, email: UpdateEmailDto) {
    return this.userService.updateEmail(id, email);
  }

  @Roles(UserRole.SYSADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
