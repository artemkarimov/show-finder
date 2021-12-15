import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fisrtName: string;

  @IsString()
  lastName: string;

  @IsString()
  userName: string;

  @IsString()
  password: string;
}
