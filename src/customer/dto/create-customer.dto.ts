import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class customerDto {
    @ApiProperty({ example: 'Joe', description: 'First name' })
    @IsString()
    first_name: string;
    
    @ApiProperty({ example: 'Joe', description: 'Last name' })
    @IsString()
    last_name: string;
    
    @ApiProperty({ example: 'Joe@example.com', description: 'user email' })
    @IsEmail()
    email: string;
    
    @ApiProperty({ example: '01234567890', description: 'user phone number' })
    @IsString()
    phone_number: string;
    
    @ApiProperty({ example: 'JoeDoe@1234', description: 'password' })
    @IsString()
    password: string;
    
  }
  

export class CreateCustomerDto {}
