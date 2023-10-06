import { AbstractService } from 'src/shared/abstract.service';
import { Link } from './link.entity';
import { Repository } from 'typeorm';
export declare class LinkService extends AbstractService<Link> {
    private readonly linkRepository;
    constructor(linkRepository: Repository<Link>);
}
