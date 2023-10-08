import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { Link } from './link.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateLinkDto } from './dtos/createLink.dto';
import { GetUser } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('admin/users/:user_id/links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @UseGuards(AuthGuard)
  @Get()
  async all(@Param('user_id') userId: number): Promise<Link[]> {
    return await this.linkService.findAll({
      where: { user_id: userId },
      relations: ['orders', 'products'],
    });
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @GetUser() user: User,
    @Body() createLinkDTO: CreateLinkDto,
  ): Promise<Link> {
    console.log(user);

    return await this.linkService.create({
      code: Math.random().toString(36).substring(6),
      user,
      products: createLinkDTO.product_ids.map((id) => ({ id })),
    });
  }

  @UseGuards(AuthGuard)
  @Get('/stats')
  async stats(@Param('user_id') userId: number): Promise<any> {
    const links = await this.linkService.findAll({
      where: { user_id: userId },
      relations: ['orders', 'products'],
    });

    return links.map((link) => {
      const completedOrders = link.orders.filter((order) => order.complete);

      return {
        code: link.code,
        count: completedOrders.length,
        revenue: completedOrders.reduce(
          (acc, order) => acc + order.ambassador_revenue,
          0,
        ),
      };
    });
  }

  @UseGuards(AuthGuard)
  @Get(':code')
  async link(@Param('code') code: string) {
    return this.linkService.findOne({
      where: { code },
      relations: ['products', 'user'],
    });
  }
}
