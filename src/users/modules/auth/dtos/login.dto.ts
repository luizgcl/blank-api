import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRoleType } from 'src/common/constants/user-roles';

export class InputLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class OutputLoginDto {
  access_token: string;
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
    hasImage: boolean;
    role: UserRoleType;
  };
}
