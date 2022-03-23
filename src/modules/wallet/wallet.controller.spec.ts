import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

describe('WalletController', () => {
  let walletController: WalletController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [WalletService],
    }).compile();

    walletController = app.get<WalletController>(WalletController);
  });

  describe('wallet', () => {
    it('should be defined', () => {
      expect(walletController).toBeDefined();
    });

    it('should generate eth, celo and polygon wallet', async () => {
      const wallet = await walletController.createWallet();
      const { celoWallet, ethWallet, polygonWallet } = wallet;
      expect(celoWallet.xpub).toHaveLength(111);
      expect(celoWallet.mnemonic.split(' ')).toHaveLength(24);
      expect(celoWallet.privateKey).toHaveLength(66);
      expect(celoWallet.address).toHaveLength(42);

      expect(ethWallet.xpub).toHaveLength(111);
      expect(ethWallet.mnemonic.split(' ')).toHaveLength(24);
      expect(ethWallet.privateKey).toHaveLength(66);
      expect(ethWallet.address).toHaveLength(42);

      expect(polygonWallet.xpub).toHaveLength(111);
      expect(polygonWallet.mnemonic.split(' ')).toHaveLength(24);
      expect(polygonWallet.privateKey).toHaveLength(66);
      expect(polygonWallet.address).toHaveLength(42);
    });
  });
});
