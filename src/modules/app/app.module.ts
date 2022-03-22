import { Module } from '@nestjs/common';
import { SubscriptionModule } from '../subscription/subscription.module';
import { WalletModule } from '../wallet/wallet.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [WalletModule, SubscriptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
