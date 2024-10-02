import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CartItem } from '../schema/cart.schema';

export class CartDto {
  @ApiProperty({ type: () => [CartItem] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItem)
  @ArrayNotEmpty({
    message: 'At least one item should be added',
  })  
  items: CartItem[];
}

export class CreateCartDto {}
