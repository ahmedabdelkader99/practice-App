import { IsString, IsEmail } from 'class-validator';

export class CreateUsertDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
