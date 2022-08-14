export interface IAppState {
  theme: Theme;
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

export enum StakingLength {
  sixMonth = "6 Months",
  twelveMonth = "12 Months",
}

export enum StakingState {
  init,
  confirm,
  loading,
  success,
  failure,
}

export enum WalletConnectionStatus {
  notConnected,
  connecting,
  connected,
}
