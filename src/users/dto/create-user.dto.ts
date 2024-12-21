import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

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

  @IsEnum(['SYSADMIN', 'ADMIN', 'EMPLOYEE'])
  @IsOptional()
  role: 'SYSADMIN' | 'ADMIN' | 'EMPLOYEE' = 'EMPLOYEE';
}
