import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { SharedModule } from 'src/shared/shared.module';
import { ProductListener } from './listeners/product.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    JwtModule,
    ConfigModule,
    UserModule,
    SharedModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductListener],
  exports: [ProductService],
})
export class ProductModule {}
