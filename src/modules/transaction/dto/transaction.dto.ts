import { Currency } from '@tatumio/tatum';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TransactionDto {
  @IsString()
  address: string;

  @IsString()
  blockchain: Currency;

  @IsString()
  privateKey: string;

  @IsString()
  @IsOptional()
  erc20TokenAddress?: string;

  @IsString()
  amount: string;

  @IsNumber()
  @IsOptional()
  digits?: number;

  @IsString()
  to: string;
}
