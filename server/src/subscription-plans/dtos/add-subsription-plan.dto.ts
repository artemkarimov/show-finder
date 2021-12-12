import { IsString } from 'class-validator';

export class AddSubscriptionPlanDto {
  @IsString()
  name: string;
}
