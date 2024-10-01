import { BadRequestException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { customerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { BaseResponseTypeDTO } from 'src/utils';
import { Customer } from './schema/customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(Customer.name);
  constructor(
    @InjectModel(Customer.name) private readonly cusModel: Model<Customer>,
  ) {}

  async registerCustomer(payload: customerDto): Promise<BaseResponseTypeDTO> {
    try {
      const customer = new this.cusModel({
        ...payload,
      });
      await customer.save();

      return {
        data: customer,
        success: true,
        code: HttpStatus.CREATED,
        message: 'Customer Created',
      };
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }

  async getACustomer(id: string): Promise<BaseResponseTypeDTO> {
    try {
      const customer = await this.cusModel.findById(id).lean()
      if (!customer) {
        throw new BadRequestException('Not a customer');
      }
      
      return {
        data: customer,
        success: true,
        code: HttpStatus.OK,
        message: 'Customer Fetch',
      };
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }

  async updateACustomer(id: string, payload: UpdateCustomerDto): Promise<BaseResponseTypeDTO> {
    try {
      const customer = await this.cusModel.findById(id).exec()
      if (!customer) {
        throw new BadRequestException('Not a customer');
      }

      if('first_name' in payload){
        customer.first_name = payload.first_name
      }
      if('last_name' in payload){
        customer.last_name = payload.last_name
      }
      if('email' in payload){
        customer.email = payload.email
      }
  
      if('phone_number' in payload){
        customer.phone_number = payload.phone_number
      }
      
      await customer.save()
      return {
        data: customer,
        success: true,
        code: HttpStatus.OK,
        message: 'Customer updated',
      };
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }

}
