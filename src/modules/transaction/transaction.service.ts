import { Injectable } from '@nestjs/common';
import { ethGetAccountTransactions, sendTransaction } from '@tatumio/tatum';
import { GetTransactionsInputs } from '../../types';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  async getTransactionsListByAddress({
    address,
    pageSize = 10,
    offset = 0,
  }: GetTransactionsInputs) {
    const ethTransactions = await ethGetAccountTransactions(
      address,
      pageSize,
      offset
    );
    return ethTransactions;
  }

  async sendTransaction({
    blockchain,
    privateKey,
    erc20TokenAddress,
    amount,
    digits,
    to,
  }: TransactionDto) {
    return sendTransaction(true, blockchain, {
      fromPrivateKey: privateKey,
      contractAddress: erc20TokenAddress,
      currency: blockchain,
      digits,
      amount,
      to,
    });
  }
}
