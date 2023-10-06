import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { Link } from './link.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('admin/users/:user_id/links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @UseGuards(AuthGuard)
  @Get()
  async all(@Param('user_id') userId: number): Promise<Link[]> {
    return await this.linkService.findAll({
      where: { user_id: userId },
      relations: ['orders'],
    });
  }
}
