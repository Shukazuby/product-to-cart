import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  isGlobal: true, 
});

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB),
    CartModule,
    ProductModule,
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
