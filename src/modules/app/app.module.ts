import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionModule } from '../subscription/subscription.module';
import { WalletModule } from '../wallet/wallet.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [WalletModule, SubscriptionModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
