import {
  DefaultOrderFrequency,
  OrderFrequency,
} from '@/common/constants/order-frequency';
import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsNotEmpty()
  @IsEnum(OrderFrequency)
  frequency: OrderFrequency = DefaultOrderFrequency;
}
