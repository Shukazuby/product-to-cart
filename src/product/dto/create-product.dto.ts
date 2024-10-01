import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ProductDto {
    @ApiProperty({example: 'Zara Shoe', description: ''})
    @IsString()
    name: string;
    
    @ApiProperty({example: '10', description: ''})
    @IsNumber()
    price: number;
    
    @ApiProperty({example: 'Zara is a shoe for classy ladies', description: ''})
    @IsString()
    description: string;
  
    @ApiProperty({example: 'Shoe', description: ''})
    @IsString()
    category: string;

    @ApiProperty({example: '5', description: ''})
    @IsNumber()
    available_qauntity: number;
  
    
  }
  

export class CreateProductDto {}
