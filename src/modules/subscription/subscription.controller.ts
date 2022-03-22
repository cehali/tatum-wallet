import { Body, Controller, Post } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/createSubscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  createWallet(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.createSubscriptions({
      address: createSubscriptionDto.address,
      webhookUrl: createSubscriptionDto.webhookUrl,
    });
  }
}
