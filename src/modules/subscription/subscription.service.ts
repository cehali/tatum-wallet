import { Injectable } from '@nestjs/common';
import {
  createNewSubscription,
  CreateSubscription,
  Currency,
  SubscriptionType,
} from '@tatumio/tatum';

@Injectable()
export class SubscriptionService {
  async createSubscriptions({
    address,
    webhookUrl,
  }: {
    address: string;
    webhookUrl: string;
  }) {
    const celoSubscriptionId = await this.createSubscriptionViaSDK(
      Currency.CELO,
      address,
      webhookUrl
    );
    const ethSubscriptionId = await this.createSubscriptionViaSDK(
      Currency.ETH,
      address,
      webhookUrl
    );
    const polygonSubscriptionId = await this.createSubscriptionViaSDK(
      Currency.MATIC,
      address,
      webhookUrl
    );
    return {
      celoSubscriptionId,
      ethSubscriptionId,
      polygonSubscriptionId,
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
