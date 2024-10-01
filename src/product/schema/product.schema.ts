import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema()
export class Product {
  @Prop()
  name: string;
  
  @Prop()
  price: number;
  
  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  available_qauntity: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
