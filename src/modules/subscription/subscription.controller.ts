import { Body, Controller, Post } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/createSubscription.dto';
import { SubscriptionService } from './subscription.service';
import { Subscriptions } from '../../types';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto
  ): Promise<Subscriptions> {
    return this.subscriptionService.createSubscription({
      address: createSubscriptionDto.address,
      webhookUrl: createSubscriptionDto.webhookUrl,
    });
  }
}
