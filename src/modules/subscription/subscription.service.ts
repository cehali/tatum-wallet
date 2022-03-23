import { Injectable } from '@nestjs/common';
import {
  createNewSubscription,
  CreateSubscription,
  Currency,
  SubscriptionType,
} from '@tatumio/tatum';

@Injectable()
export class SubscriptionService {
  async createSubscription({
    address,
    webhookUrl,
  }: {
    address: string;
    webhookUrl: string;
  }) {
    const celoSubscription = await this.createSubscriptionViaSDK(
      Currency.CELO,
      address,
      webhookUrl
    );
    const ethSubscription = await this.createSubscriptionViaSDK(
      Currency.ETH,
      address,
      webhookUrl
    );
    const polygonSubscription = await this.createSubscriptionViaSDK(
      Currency.MATIC,
      address,
      webhookUrl
    );
    return {
      celoSubscriptionId: celoSubscription.id,
      ethSubscriptionId: ethSubscription.id,
      polygonSubscriptionId: polygonSubscription.id,
    };
  }

  async createSubscriptionViaSDK(
    blockchain: Currency,
    address: string,
    webhookUrl: string
  ) {
    const data: CreateSubscription = {
      type: SubscriptionType.ADDRESS_TRANSACTION,
      attr: {
        address: address,
        chain: blockchain,
        url: webhookUrl,
      },
    };
    return await createNewSubscription(data);
  }
}
