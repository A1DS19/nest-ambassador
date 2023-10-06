import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

class Id {
  id: number;
}

export abstract class AbstractService<T extends Id> {
  protected constructor(protected readonly repository: Repository<T>) {}

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async findOne(options?: FindOneOptions<T>): Promise<T | undefined> {
    return await this.repository.findOne(options);
  }

  async findOneBy<K extends keyof T>(
    field: K,
    value: any,
  ): Promise<T | undefined> {
    return await this.repository.findOneBy({
      [field]: value,
    } as FindOptionsWhere<T>);
  }

  async create(createDTO: DeepPartial<T>): Promise<T> {
    return await this.repository.save(createDTO);
  }

  async update(
    id: number,
    updateDTO: QueryDeepPartialEntity<T>,
  ): Promise<T | undefined> {
    await this.repository.update(id, updateDTO);
    return await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
