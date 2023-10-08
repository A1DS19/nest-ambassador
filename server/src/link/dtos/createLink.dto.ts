import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray } from 'class-validator';

export class CreateLinkDto {
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  product_ids: number[];
}
