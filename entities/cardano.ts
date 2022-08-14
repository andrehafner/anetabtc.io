import { Cip30Wallet, WalletApi } from "@cardano-sdk/cip30";

export enum CardanoWalletName {
  nami = "nami",
  eternl = "eternl",
  flint = "flint",
  typhoncip30 = "typhoncip30",
  gerowallet = "gerowallet",
  anetawallet = "anetawallet",
}

export interface ICardanoState {
  wallet: Cip30Wallet | null;
  walletApi: WalletApi | null;
}
