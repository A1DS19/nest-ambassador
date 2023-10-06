import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductListener {
  private readonly logger = new Logger(ProductListener.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @OnEvent('product.created')
  async handleProductCreatedEvent(payload: any) {
    this.logger.log('Product created', payload);
    await this.cacheManager.del('products');
  }
}
