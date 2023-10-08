import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty } from 'class-validator';

class ProductCreateOrderDTO {
  id: number;
  quantity: number;
}

export class CreateOrderDTO {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  zip_code: string;

  @IsArray()
  @ArrayNotEmpty()
  @Type(() => ProductCreateOrderDTO)
  products: ProductCreateOrderDTO[];
}
