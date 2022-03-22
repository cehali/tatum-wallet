import { Controller, Post } from '@nestjs/common';
import { GeneratedWallets } from '../../types';
import { WalletService } from './wallet.service';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  createWallet(): Promise<GeneratedWallets> {
    return this.walletService.generateWallets();
  }
}
