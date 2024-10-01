import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, customerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponseTypeDTO } from 'src/utils';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a customer' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Customer registered' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async createCustomer(
    @Body() payload: customerDto,
  ): Promise<BaseResponseTypeDTO> {
    const result = await this.customerService.registerCustomer(payload);
    return result;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get customer' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
 async findOne(@Param('id') id: string) {
    const result = await this.customerService.getACustomer(id);
    return result

  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User Register' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
 async updateACustomer(
  @Param('id') id: string, 
  @Body() updateCustomerDto: UpdateCustomerDto) {
    const result = await this.customerService.updateACustomer(id, updateCustomerDto);
    return result
  }

}
