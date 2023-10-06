import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { AbstractService } from 'src/shared/abstract.service';
export declare class ProductService extends AbstractService<Product> {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
}
