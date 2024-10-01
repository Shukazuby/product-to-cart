import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseTypeDTO {
  @ApiProperty()
  success: boolean;

  @ApiProperty({ enum: HttpStatus, default: HttpStatus.OK })
  code: HttpStatus;

  @ApiProperty()
  message: string;

  data?: any;

  totalCount?: number;
}

export interface IPaginationFilter {
  limit?: number
  page?: number;
}


