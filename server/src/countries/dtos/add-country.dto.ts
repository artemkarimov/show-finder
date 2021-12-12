import { IsString, Length } from 'class-validator';

export class AddCountryDto {
  @IsString()
  name: string;

  @IsString()
  @Length(2, 2)
  iso3166Code: string;
}
