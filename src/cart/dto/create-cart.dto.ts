import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsDate,
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';


export class CreateCartDto {}
