import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export class CartItem {
  @ApiProperty()
  @Prop({ref: 'Product'})
  product_id: string;

  @ApiProperty()
  @Prop()
  quantity: number;
}

@Schema()
export class Cart {
  @Prop({ref: 'Customer'})
  customer: string;
  
  @Prop()
  items: CartItem[];
  
  @Prop()
  totalPrice: number;

  @Prop()
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);
