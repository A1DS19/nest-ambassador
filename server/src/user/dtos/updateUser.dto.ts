import { IsEmail, Length } from 'class-validator';

export class UpdateUserDTO {
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
}
