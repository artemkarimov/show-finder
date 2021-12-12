import { IsString } from 'class-validator';

export class AddSubscriptionPriceDto {
  @IsString()
  cost: string;
}
