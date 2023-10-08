import { LinkService } from './link.service';
import { Link } from './link.entity';
import { CreateLinkDto } from './dtos/createLink.dto';
import { User } from 'src/user/user.entity';
export declare class LinkController {
    private readonly linkService;
    constructor(linkService: LinkService);
    all(userId: number): Promise<Link[]>;
    create(user: User, createLinkDTO: CreateLinkDto): Promise<Link>;
    stats(userId: number): Promise<any>;
    link(code: string): Promise<Link>;
}
