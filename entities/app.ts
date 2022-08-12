import { Cip30Wallet, WalletApi } from "@cardano-sdk/cip30";

export interface IState {
  theme: Theme;
  wallet: Cip30Wallet | null;
  walletApi: WalletApi | null;
  blockchain: Blockchain;
}

export enum Theme {
  dark = "dark",
  light = "light",
}

export enum LocalStorageKey {
  theme = "theme",
  walletName = "wallet-name",
}

export enum Blockchain {
  cardano = "cardano",
  ergo = "ergo",
}
