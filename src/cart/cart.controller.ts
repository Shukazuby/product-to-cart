import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto, CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponseTypeDTO } from 'src/utils';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':id')
  @ApiOperation({ summary: 'add a product to cart' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'add to cart' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async addToCart(
    @Param('id') id: string,
    @Body() payload: CartDto,
  ): Promise<BaseResponseTypeDTO> {
    const result = await this.cartService.addToCart(id, payload);
    return result;
  }
}
