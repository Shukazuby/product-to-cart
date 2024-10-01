import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CartItem } from '../schema/cart.schema';

export class CartDto {

  @ApiProperty({example: '66fbf004a3402601a0baab80', description: ''})
  @IsString()
  customer: string;
  
  @ApiProperty({ type: () => CartItem })
  @ValidateNested({ each: true })
  @Type(() => CartItem)
  items: CartItem[];
  
  @ApiProperty({example: '', description: ''})
  @IsNumber()
  totalPrice: number;

  @ApiProperty({example: '', description: ''})
  @IsString()
  status: string;

}

export class CreateCartDto {}
