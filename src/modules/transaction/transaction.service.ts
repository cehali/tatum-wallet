import { Injectable } from '@nestjs/common';
import { ethGetAccountTransactions, sendTransaction } from '@tatumio/tatum';
import { GetTransactionsInputs } from '../../types';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  async getTransactionsListByAddress({
    address,
    pageSize,
    offset,
  }: GetTransactionsInputs) {
    const ethTransactions = await ethGetAccountTransactions(
      address,
      pageSize,
      offset,
    );
    return {
      ethTransactions,
    };
  }

  async sendTransaction({
    blockchain,
    privateKey,
    erc20TokenAddress,
    amount,
    digits = 10,
    to,
  }: TransactionDto) {
    sendTransaction(true, blockchain, {
      fromPrivateKey: privateKey,
      contractAddress: erc20TokenAddress,
      digits,
      amount,
      to,
    });
  }
}
