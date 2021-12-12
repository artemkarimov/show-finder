import { IsString } from 'class-validator';

export class AddStreamingServiceDto {
  @IsString()
  name: string;

  @IsString()
  logo: string;
}
