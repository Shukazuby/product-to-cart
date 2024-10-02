import { BadRequestException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseResponseTypeDTO } from 'src/utils';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(Product.name);
  constructor(
    @InjectModel(Product.name) private readonly prodModel: Model<Product>,
  ) {}

  async createProduct(payload: ProductDto): Promise<BaseResponseTypeDTO> {
    try {
      const product = new this.prodModel({
        ...payload,
      });
      await product.save();

      return {
        data: product,
        success: true,
        code: HttpStatus.CREATED,
        message: 'product Created',
      };
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }

  async getProducts(): Promise<BaseResponseTypeDTO> {
    try {
      const products = await this.prodModel.find().lean().exec();
      if(!products || products.length === 0){
        []
      }

      return {
        data: products,
        success: true,
        code: HttpStatus.OK,
        message: 'Products Fetched',
      };
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }

  async getAProduct(id: string): Promise<BaseResponseTypeDTO> {
    try {
      const product = await this.prodModel.findById(id).lean()
      if (!product) {
        throw new BadRequestException('Not a product');
      }
      return {
        data: product,
        success: true,
        code: HttpStatus.OK,
        message: 'Product Fetch',
      };
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }

  async updateAProduct(id: string, payload: UpdateProductDto): Promise<BaseResponseTypeDTO> {
    try {
      const product = await this.prodModel.findById(id).exec()
      if (!product) {
        throw new BadRequestException('Not a product');
      }

      if('name' in payload){
        product.name = payload.name
      }
      if('price' in payload){
        product.price = payload.price
      }
      if('available_qauntity' in payload){
        product.available_qauntity = payload.available_qauntity
      }
  
      if('description' in payload){
        product.description = payload.description
      }
      
      if('category' in payload){
        product.category = payload.category
      }
      
      await product.save()
      return {
        data: product,
        success: true,
        code: HttpStatus.OK,
        message: 'product updated',
      };
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }

  async deleteAProduct(id: string): Promise<BaseResponseTypeDTO> {
    try {
      const product = await this.prodModel.findByIdAndDelete(id).lean()
      if (!product) {
        throw new BadRequestException('Not a product');
      }
      return {
        success: true,
        code: HttpStatus.OK,
        message: 'Product Deleted',
      };
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }
}
