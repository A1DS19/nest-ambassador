import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const token = request.cookies['jwt'];

      if (!token) {
        return false;
      }

      const { id, scope } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT.SECRET'),
        maxAge: this.configService.get<string>('JWT.EXPIRATION_DELTA'),
      });

      if (!id) {
        return false;
      }

      const user = await this.userService.findUserByField('id', id);

      if (!user) {
        return false;
      }

      request.user = user;

      if (request.path.includes('admin') && scope !== 'admin') {
        return false;
      }

      if (
        request.path.includes('ambassador') &&
        scope !== 'ambassador' &&
        !user.is_ambassador
      ) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}
