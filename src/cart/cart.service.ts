import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CartDto } from './dto/create-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schema/cart.schema';
import { BaseResponseTypeDTO } from 'src/utils';
import { Model } from 'mongoose';
import { CustomerService } from 'src/customer/customer.service';
import { Product } from 'src/product/schema/product.schema';

@Injectable()
export class CartService {
  private readonly logger = new Logger(Cart.name);
  constructor(
    private readonly cusServ: CustomerService, 
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
    @InjectModel(Product.name) private readonly prodModel: Model<Product>,
  ) {}

  async addToCart(customerId: string, payload: CartDto): Promise<BaseResponseTypeDTO> {
    try {
      const cus = await this.cusServ.getACustomer(customerId);
      if (!cus || !cus.data) {
        throw new BadRequestException('Customer not found');
      }
  
      let totalCartPrice = 0;
      const cartItems = await Promise.all(
        payload.items.map(async (item) => {
          const product = await this.prodModel.findById(item.product_id);
          if (!product) {
            throw new BadRequestException(`Product with id ${item.product_id} not found`);
          }
  
          const totalItemPrice = product.price * item.quantity;
          totalCartPrice += totalItemPrice;
  
          return {
            product_id: product._id,
            product_name: product.name,
            quantity: item.quantity,
            price: totalItemPrice,
          };
        })
      );
  
      const cart = new this.cartModel({
        customer: cus.data._id,
        items: cartItems,
        totalPrice: totalCartPrice,
        status: 'pending',
      });
  
      await cart.save();
  
      return {
        data: cart,
        success: true,
        code: HttpStatus.OK,
        message: 'Item(s) added to cart successfully',
      };
    } catch (ex) {
      this.logger.error(ex);
      throw new InternalServerErrorException('Could not add items to cart');
    }
  }

}
