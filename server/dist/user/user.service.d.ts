import { User } from './user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UpdateUserDTO } from './dtos/updateUser.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    save(user: any): Promise<User>;
    findOneBy(options: FindOneOptions<User>): Promise<User>;
    findUserByField<T extends keyof User>(field: T, value: any, selectFields?: Array<T>): Promise<User>;
    updateUser(id: number, updateUserDTO: Partial<UpdateUserDTO>): Promise<User>;
    getAmbassadors(): Promise<User[]>;
}
