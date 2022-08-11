import { Cip30Wallet, WalletApi } from "@cardano-sdk/cip30";

export interface IState {
  theme: Theme;
  wallet: Cip30Wallet | null;
  walletApi: WalletApi | null;
}

export enum Theme {
  dark = "dark",
  light = "light",
}

export enum ReducersName {
  toggleTheme = "toggleTheme",
  setWallet = "setWallet",
}
