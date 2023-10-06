import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dtos/register.dto';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUserResponseDTO } from './dtos/authenticatedUserResponse.dto';
import { ConfigService } from '@nestjs/config';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(user: RegisterDTO, isAmbassador: boolean): Promise<User> {
    const foundUser = await this.userService.findUserByField(
      'email',
      user.email,
    );

    if (foundUser) {
      throw new BadRequestException('Email is already taken');
    }

    const hashedPassword = await this.hashPassword(user.password);

    delete user.password_confirm;
    const formattedUser: DeepPartial<User> = {
      ...user,
      is_ambassador: isAmbassador,
      password: hashedPassword,
    };

    const newUser = await this.userService.save(formattedUser);

    return newUser;
  }

  async login(user: LoginDTO): Promise<AuthenticatedUserResponseDTO> {
    const foundUser = await this.userService.findUserByField(
      'email',
      user.email,
    );

    if (!foundUser) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordMatching = await this.comparePasswords(
      user.password,
      foundUser.password,
    );

    if (!isPasswordMatching) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync(
      {
        id: foundUser.id,
        scope: foundUser.is_ambassador ? 'ambassador' : 'admin',
      },
      {
        secret: this.configService.get<string>('JWT.SECRET'),
        expiresIn: this.configService.get<string>('JWT.EXPIRATION_DELTA'),
      },
    );

    return { token: jwt };
  }

  async getAuthenticatedUser(token: string): Promise<User> {
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { id } = await this.jwtService.verifyAsync(token);

    const user = await this.userService.findUserByField('id', id);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  private async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(password, storedPasswordHash);
    return match;
  }
}
