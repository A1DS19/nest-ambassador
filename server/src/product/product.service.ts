import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { AbstractService } from 'src/shared/abstract.service';

@Injectable()
export class ProductService extends AbstractService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }

  async paginate(page: number, limit: number): Promise<Product[]> {
    const skippedItems = (page - 1) * limit;

    return await this.findAll({
      skip: skippedItems,
      take: limit,
    });
  }
}
