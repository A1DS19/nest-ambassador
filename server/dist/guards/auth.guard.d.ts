import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly userService;
    private readonly configService;
    constructor(jwtService: JwtService, userService: UserService, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
