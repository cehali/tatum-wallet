import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EthTx, TransactionHash } from '@tatumio/tatum';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  getTransactionsList(
    @Param() address: string,
    @Param() pageSize?: number,
    @Param() offset?: number
  ): Promise<EthTx[]> {
    return this.transactionService.getTransactionsListByAddress({
      address,
      pageSize,
      offset,
    });
  }

  @Post()
  sendTransaction(
    @Body() transactionDto: TransactionDto
  ): Promise<TransactionHash> {
    return this.transactionService.sendTransaction(transactionDto);
  }
}
