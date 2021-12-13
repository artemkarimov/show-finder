import { IsString } from 'class-validator';

export class GetMatchingShowsDto {
  @IsString()
  input: string;
}
