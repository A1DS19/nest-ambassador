import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UpdateUserDTO } from './dtos/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async save(user: any): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findOneBy(options: FindOneOptions<User>): Promise<User> {
    return await this.userRepository.findOne(options);
  }

  async findUserByField<T extends keyof User>(
    field: T,
    value: any,
    selectFields?: Array<T>,
  ): Promise<User> {
    const query = this.userRepository.createQueryBuilder('user');

    if (selectFields && selectFields.length > 0) {
      const clean_fields = [];

      for (const field of selectFields) {
        clean_fields.push(`user.${field}`);
      }

      query.select(clean_fields);
    }

    return await query.where(`user.${field} = :value`, { value }).getOne();
  }

  async updateUser(
    id: number,
    updateUserDTO: Partial<UpdateUserDTO>,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDTO);

    return await this.userRepository.save(user);
  }

  async getAmbassadors(): Promise<User[]> {
    return await this.userRepository.find({
      where: { is_ambassador: true },
    });
  }
}
