import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';
export declare class ProductListener {
    private readonly eventEmitter;
    private cacheManager;
    private readonly logger;
    constructor(eventEmitter: EventEmitter2, cacheManager: Cache);
    handleProductCreatedEvent(payload: any): Promise<void>;
}
