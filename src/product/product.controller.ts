import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, ProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponseTypeDTO } from 'src/utils';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  @ApiOperation({ summary: 'create a product' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'create product' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async createProduct(
    @Body() payload: ProductDto,
  ): Promise<BaseResponseTypeDTO> {
    const result = await this.productService.createProduct(payload);
    return result;
  }

  @Get('')
  @ApiOperation({ summary: 'get all product' })
  @ApiResponse({ status: HttpStatus.OK, description: 'get products' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async getProducts(): Promise<BaseResponseTypeDTO> {
    const result = await this.productService.getProducts();
    return result;
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get a product' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get a product' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
 async getAProduct(@Param('id') id: string) {
    const result = await this.productService.getAProduct(id);
    return result

  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: HttpStatus.OK, description: 'update a product' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
 async updateAProduct(
  @Param('id') id: string, 
  @Body() payload: UpdateProductDto) {
    const result = await this.productService.updateAProduct(id, payload);
    return result
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a product' })
  @ApiResponse({ status: HttpStatus.OK, description: 'delete a product' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
 async deleteAProduct(@Param('id') id: string) {
    const result = await this.productService.deleteAProduct(id);
    return result

  }
}
