import { IsNumber, IsOptional, IsUrl, Length } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @Length(3, 50, {
    message:
      'Title must be longer than or equal to 3 and shorter than or equal to 50 characters',
  })
  title: string;

  @IsOptional()
  @Length(3, 100, {
    message:
      'Description must be longer than or equal to 3 and shorter than or equal to 100 characters',
  })
  description: string;

  @IsOptional()
  @IsUrl(
    {},
    {
      message: 'Image must be a URL address',
    },
  )
  image: string;

  @IsOptional()
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 2,
    },
    {
      message: 'Price must be a number',
    },
  )
  price: number;
}
