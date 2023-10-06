import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dtos/register.dto';
import { User } from 'src/user/user.entity';
import { LoginDTO } from './dtos/login.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(['admin/register', 'ambassador/register'])
  async register(
    @Body() body: RegisterDTO,
    @Req() request: Request,
  ): Promise<User> {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Passwords do not match');
    }

    const isAmbassador = request.path.includes('ambassador');

    return await this.authService.register(body, isAmbassador);
  }

  @Post(['admin/login', 'anmbassador/login'])
  async login(
    @Body() body: LoginDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const token = await this.authService.login(body);
    response.cookie('jwt', token.token, { httpOnly: true });
  }

  @UseGuards(AuthGuard)
  @Post(['admin/logout', 'ambassador/logout'])
  async logout(@Res({ passthrough: true }) response: Response): Promise<void> {
    response.clearCookie('jwt');
  }
}
