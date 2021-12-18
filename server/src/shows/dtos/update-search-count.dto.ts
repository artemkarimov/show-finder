import { IsNumber } from 'class-validator';

export class UpdateSearchCountDto {
  @IsNumber()
  id: number;
}
