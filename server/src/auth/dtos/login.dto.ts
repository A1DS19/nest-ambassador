import { IsEmail, Length } from 'class-validator';

export class LoginDTO {
  @IsEmail(
    {},
    {
      message: 'Invalid email format',
    },
  )
  email: string;

  @Length(1, 255, {
    message: 'Password is required',
  })
  password: string;
}
