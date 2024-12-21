import { IsEmail, IsNotEmpty } from 'class-validator';

export class InputLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class OutputLoginDto {
  access_token: string;
}
