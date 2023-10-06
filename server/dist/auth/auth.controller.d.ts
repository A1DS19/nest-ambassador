import { AuthService } from './auth.service';
import { RegisterDTO } from './dtos/register.dto';
import { User } from 'src/user/user.entity';
import { LoginDTO } from './dtos/login.dto';
import { Response } from 'express';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: RegisterDTO, request: Request): Promise<User>;
    login(body: LoginDTO, response: Response): Promise<void>;
    logout(response: Response): Promise<void>;
}
