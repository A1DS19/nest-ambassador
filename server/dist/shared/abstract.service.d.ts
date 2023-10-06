import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
declare class Id {
    id: number;
}
export declare abstract class AbstractService<T extends Id> {
    protected readonly repository: Repository<T>;
    protected constructor(repository: Repository<T>);
    findAll(options?: FindManyOptions<T>): Promise<T[]>;
    findOne(options?: FindOneOptions<T>): Promise<T | undefined>;
    findOneBy<K extends keyof T>(field: K, value: any): Promise<T | undefined>;
    create(createDTO: DeepPartial<T>): Promise<T>;
    update(id: number, updateDTO: QueryDeepPartialEntity<T>): Promise<T | undefined>;
    delete(id: number): Promise<void>;
}
export {};
