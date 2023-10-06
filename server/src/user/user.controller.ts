import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateUserDTO } from './dtos/updateUser.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { GetUser } from './decorators/user.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Put(['admin/user/:id', 'ambassador/user/:id'])
  async update(
    @Body() updateUserDTO: Partial<UpdateUserDTO>,
    @Param() id: number,
  ): Promise<User> {
    return await this.userService.updateUser(id, updateUserDTO);
  }

  @UseGuards(AuthGuard)
  @Get(['admin/user', 'ambassador/user'])
  async user(@GetUser() user: User): Promise<User> {
    const userWithRelations = await this.userService.findOneBy({
      where: {
        id: user.id,
      },
      relations: ['orders', 'orders.order_items'],
    });

    return {
      ...userWithRelations,
      revenue: userWithRelations.revenue,
      name: userWithRelations.name,
    };
  }

  @UseGuards(AuthGuard)
  @Get('admin/ambassadors')
  async ambassadors(): Promise<User[]> {
    return await this.userService.getAmbassadors();
  }
}
