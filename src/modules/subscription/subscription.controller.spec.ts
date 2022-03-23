import { MockProvider } from 'ethereum-waffle';
import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

describe('SubscriptionController', () => {
  let subscriptionController: SubscriptionController;
  const wallet = new MockProvider().createEmptyWallet();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionController],
      providers: [SubscriptionService],
    }).compile();

    subscriptionController = app.get<SubscriptionController>(
      SubscriptionController
    );
  });

  describe('controller', () => {
    it('should be defined', () => {
      expect(subscriptionController).toBeDefined();
    });

    it('should create subscription and return id', async () => {
      const testAddress = wallet.address;
      const testUrl = 'https://test.com';
      const subscriptions = await subscriptionController.createSubscription({
        address: testAddress,
        webhookUrl: testUrl,
      });
      const { celoSubscriptionId, ethSubscriptionId, polygonSubscriptionId } =
        subscriptions;
      expect(celoSubscriptionId).toHaveLength(24);
      expect(ethSubscriptionId).toHaveLength(24);
      expect(polygonSubscriptionId).toHaveLength(24);
    });

    it('should throw error if invalid address', async () => {
      const invalidAddress = '0x123456789';
      const testUrl = 'https://test.com';
      await expect(() =>
        subscriptionController.createSubscription({
          address: invalidAddress,
          webhookUrl: testUrl,
        })
      ).rejects.toBeTruthy();
    });

    it('should throw error if invalid webhook URL', async () => {
      const testAddress = '0x0000000000000000000000000000000000000000';
      const invalidUrl = 'invalidUrl';
      await expect(() =>
        subscriptionController.createSubscription({
          address: testAddress,
          webhookUrl: invalidUrl,
        })
      ).rejects.toBeTruthy();
    });
  });
});
