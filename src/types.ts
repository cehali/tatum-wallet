interface Wallet {
  xpub: string;
  mnemonic: string;
  privateKey: string;
  address: string;
}

export interface GeneratedWallets {
  celoWallet: Wallet;
  ethWallet: Wallet;
  polygonWallet: Wallet;
}

export interface GetTransactionsInputs {
  address: string;
  pageSize?: number;
  offset?: number;
}
