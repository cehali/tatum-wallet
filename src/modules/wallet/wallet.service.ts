import { Injectable } from '@nestjs/common';
import {
  generateWallet,
  Currency,
  Wallet,
  generatePrivateKeyFromMnemonic,
  generateAddressFromXPub,
} from '@tatumio/tatum';

@Injectable()
export class WalletService {
  async generateWallets() {
    const celoWallet = await this.generateWalletViaSDK(Currency.CELO);
    const ethWallet = await this.generateWalletViaSDK(Currency.ETH);
    const polygonWallet = await this.generateWalletViaSDK(Currency.MATIC);
    return {
      celoWallet,
      ethWallet,
      polygonWallet,
    };
  }

  async generateWalletViaSDK(blockchain: Currency) {
    const generatedWallet = (await generateWallet(blockchain, true)) as Wallet;
    const firstPrivateKey = await generatePrivateKeyFromMnemonic(
      blockchain,
      true,
      generatedWallet.mnemonic,
      0
    );
    const firstAddress = generateAddressFromXPub(
      blockchain,
      true,
      generatedWallet.xpub,
      0
    );
    return {
      xpub: generatedWallet.xpub,
      mnemonic: generatedWallet.mnemonic,
      privateKey: firstPrivateKey,
      address: firstAddress,
    };
  }
}
