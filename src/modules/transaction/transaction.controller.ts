import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  getTransactionsList(
    @Param() address: string,
    @Param() pageSize: number,
    @Param() offset: number
  ) {
    return this.transactionService.getTransactionsListByAddress({
      address,
      pageSize,
      offset,
    });
  }

  @Post()
  sendTransaction(@Body() transactionDto: TransactionDto) {
    return this.transactionService.sendTransaction(transactionDto);
  }
}
