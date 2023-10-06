import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dtos/register.dto';
import { User } from 'src/user/user.entity';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUserResponseDTO } from './dtos/authenticatedUserResponse.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService);
    register(user: RegisterDTO, isAmbassador: boolean): Promise<User>;
    login(user: LoginDTO): Promise<AuthenticatedUserResponseDTO>;
    getAuthenticatedUser(token: string): Promise<User>;
    private hashPassword;
    private comparePasswords;
}
