import { IsString } from 'class-validator';

export class GetCountryDto {
  @IsString()
  name: string;
}
