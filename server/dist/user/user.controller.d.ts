import { UpdateUserDTO } from './dtos/updateUser.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    update(updateUserDTO: Partial<UpdateUserDTO>, id: number): Promise<User>;
    user(user: User): Promise<User>;
    ambassadors(): Promise<User[]>;
}
