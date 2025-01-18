import { DocumentType, DocumentTypes } from '@/common/constants/document-types';
import {
  SubscriptionType,
  SubscriptionTypes,
} from '@/common/constants/subscription-type';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  socialName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsMobilePhone('pt-BR')
  @IsNotEmpty()
  phone: string;

  @IsNumberString()
  @IsNotEmpty()
  document: string;

  @IsEnum(DocumentType)
  @IsNotEmpty()
  documentType: DocumentTypes = 'CPF';

  @IsNotEmpty()
  planId: number;

  @IsEnum(SubscriptionType)
  @IsNotEmpty()
  subscriptionType: SubscriptionTypes = 'MONTHLY';

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  installments: number;

  @IsNumber()
  planDiscount: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 3,
    minSymbols: 1,
    minUppercase: 1,
  })
  @IsNotEmpty()
  password: string;
}
