import {
  Body,
  CacheTTL,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateProductDTO } from './dtos/update.dto';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheKey,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Request } from 'express';

@Controller('admin/products')
export class ProductController {
  static readonly cacheTTL = 30 * 60 * 1000;

  constructor(
    private readonly productService: ProductService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get('paginate')
  async getProducts(@Req() request: Request): Promise<Product[]> {
    const params = request.query;

    if (params) {
      if (params.page && params.limit) {
        const page = Number(params.page);
        const limit = Number(params.limit);

        return await this.productService.paginate(page, limit);
      }

      if (params.title) {
        return await this.productService.findAll({
          where: { title: params.title as string },
        });
      }
    }

    return await this.productService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  async createProduct(
    @Body() createProductDTO: CreateProductDto,
  ): Promise<Product> {
    const product = await this.productService.create(createProductDTO);
    this.eventEmitter.emit('product.created', product);
    return product;
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDTO: UpdateProductDTO,
  ): Promise<Product> {
    await this.eventEmitter.emit('product.updated', id);
    return await this.productService.update(id, updateProductDTO);
  }

  @UseGuards(AuthGuard)
  @Get('one/:id')
  async getProduct(@Param('id') id: number): Promise<Product | undefined> {
    return await this.productService.findOneBy('id', id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    await this.eventEmitter.emit('product.deleted', id);
    await this.productService.delete(id);
  }

  @CacheKey('products_frontend')
  @CacheTTL(ProductController.cacheTTL)
  @UseInterceptors(CacheInterceptor)
  @Get('frontend')
  async getProductsFrontend(): Promise<Product[]> {
    const products = await this.productService.findAll();
    return products;
  }

  @Get('/backend')
  async getProductsBackend(): Promise<Product[]> {
    let products = await this.cacheManager.get<Product[]>('products_backend');

    if (!products) {
      products = await this.productService.findAll();
      await this.cacheManager.set(
        'products_backend',
        products,
        ProductController.cacheTTL,
      );
    }

    return products as Product[];
  }
}
