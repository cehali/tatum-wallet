import { Injectable } from '@nestjs/common';
import {
  generateWallet,
  Currency,
  Wallet,
  generatePrivateKeyFromMnemonic,
  generateAddressFromPrivatekey,
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
    const firstAddress = generateAddressFromPrivatekey(
      blockchain,
      true,
      firstPrivateKey
    );
    return {
      xpub: generatedWallet.xpub,
      mnemonic: generatedWallet.mnemonic,
      privateKey: firstPrivateKey,
      address: firstAddress,
    };
  }
}
