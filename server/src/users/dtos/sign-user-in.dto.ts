import { IsString } from 'class-validator';

export class SignUserInDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}
