import { Test, TestingModule } from '@nestjs/testing';
import { Currency } from '@tatumio/tatum';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

describe('TransactionController', () => {
  let transactionController: TransactionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService],
    }).compile();

    transactionController = app.get<TransactionController>(
      TransactionController
    );
  });

  describe('controller', () => {
    it('should be defined', () => {
      expect(transactionController).toBeDefined();
    });
  });

  describe('sending transaction', () => {
    it('should send transaction', async () => {
      const privateKey =
        '0x666c68bcbb6d8b0305913369ef168ec104dfa17d35f8f141d684182a301933a0';
      const amount = '0.00001';
      const to = '0xb6899B186352Ec6788FA530B9E8b2A700bF9b95E';
      const { txId } = await transactionController.sendTransaction({
        blockchain: Currency.ETH,
        privateKey,
        amount,
        to,
      });
      expect(txId).toHaveLength(66);
    });

    it('should throw error if invalid private key', async () => {
      const invalidPrivateKey = 'invalidPrivateKey';
      const amount = '1';
      const to = '0xb6899B186352Ec6788FA530B9E8b2A700bF9b95E';
      await expect(() =>
        transactionController.sendTransaction({
          blockchain: Currency.ETH,
          privateKey: invalidPrivateKey,
          amount,
          to,
        })
      ).rejects.toBeTruthy();
    });

    it('should throw error if invalid to address', async () => {
      const privateKey =
        '0x666c68bcbb6d8b0305913369ef168ec104dfa17d35f8f141d684182a301933a0';
      const amount = '1';
      const invalidToAddress = 'invalidToAddress';
      await expect(() =>
        transactionController.sendTransaction({
          blockchain: Currency.ETH,
          privateKey,
          amount,
          to: invalidToAddress,
        })
      ).rejects.toBeTruthy();
    });
  });

  describe('fetching transactions list', () => {
    it('should receive transaction list', async () => {
      const address = '0xb6899B186352Ec6788FA530B9E8b2A700bF9b95E';
      const transactions = await transactionController.getTransactionsList(
        address
      );
      expect(transactions[0].transactionHash).toHaveLength(66);
    });
  });

  it('should throw error if invalid address', async () => {
    const invalidAddress = 'invalidAddress';
    await expect(() =>
      transactionController.getTransactionsList(invalidAddress)
    ).rejects.toBeTruthy();
  });
});
