import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  countryId: number;

  @IsString()
  userName: string;

  @IsString()
  password: string;
}
