import { IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  address: string;

  @IsString()
  webhookUrl: string;
}
