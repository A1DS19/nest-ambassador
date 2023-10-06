import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export class RegisterDTO {
  @Length(2, 20, {
    message: 'first name must be between 2 and 20 characters',
  })
  first_name: string;

  @Length(2, 20, {
    message: 'last name must be between 2 and 20 characters',
  })
  last_name: string;

  @IsEmail(
    {
      host_blacklist: [
        'mailinator.com',
        'guerrillamail.com',
        '10minutemail.com',
      ],
    },
    {
      message: 'invalid email',
    },
  )
  email: string;

  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'password is too weak, it must be at least 8 characters, contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'password is too weak, it must be at least 8 characters, contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol',
    },
  )
  password_confirm: string;
}
