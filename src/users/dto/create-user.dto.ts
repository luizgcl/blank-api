import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { UserRoles, UserRoleType } from 'src/common/constants/user-roles';

export class CreateUserDto {
  @MinLength(3)
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
  })
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRoles)
  @IsOptional()
  role: UserRoleType = 'EMPLOYEE';
}
