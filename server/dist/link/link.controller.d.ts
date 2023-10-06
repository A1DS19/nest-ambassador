import { LinkService } from './link.service';
import { Link } from './link.entity';
export declare class LinkController {
    private readonly linkService;
    constructor(linkService: LinkService);
    all(userId: number): Promise<Link[]>;
}
