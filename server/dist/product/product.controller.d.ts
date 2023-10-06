import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create.dto';
import { UpdateProductDTO } from './dtos/update.dto';
import { Cache } from 'cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Request } from 'express';
export declare class ProductController {
    private readonly productService;
    private cacheManager;
    private eventEmitter;
    static readonly cacheTTL: number;
    constructor(productService: ProductService, cacheManager: Cache, eventEmitter: EventEmitter2);
    getProducts(request: Request): Promise<Product[]>;
    createProduct(createProductDTO: CreateProductDto): Promise<Product>;
    updateProduct(id: number, updateProductDTO: UpdateProductDTO): Promise<Product>;
    getProduct(id: number): Promise<Product | undefined>;
    deleteProduct(id: number): Promise<void>;
    getProductsFrontend(): Promise<Product[]>;
    getProductsBackend(): Promise<Product[]>;
}
