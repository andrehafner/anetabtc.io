export interface IAppState {
  theme: Theme;
  errorModalSetting: {
    open: boolean;
    text: string;
  };
}

export enum Theme {
  dark = "dark",
  light = "light",
}

export enum LocalStorageKey {
  theme = "theme",
  walletNameCardano = "wallet-name-cardano",
  walletNameErgo = "wallet-name-ergo",
}

export enum Blockchain {
  cardano = "cardano",
  ergo = "ergo",
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

export enum Currency {
  cNETA = "cNETA",
  NETA = "NETA",
}

export enum ErrorKey {
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  STAKE_FAIL = "STAKE_FAIL",
  NAUTILUS_NOT_FOUND = "NAUTILUS_NOT_FOUND",
  NAUTILUS_NOT_CONNECTED = "NAUTILUS_NOT_CONNECTED",
  NAUTILUS_CONNECTION_FAIL = "NAUTILUS_CONNECTION_FAIL",
  NAUTILUS_NO_ADDRESS = "NAUTILUS_NO_ADDRESS",
}

export const ERROR_MESSAGE: Record<ErrorKey, string> = {
  UNKNOWN_ERROR: "Something went wrong",
  STAKE_FAIL: "Staking fails. Please try again",
  NAUTILUS_NOT_FOUND:
    "Nautilus Wallet is not found in your browser. Have you installed the extension in your browser?",
  NAUTILUS_NOT_CONNECTED: "Nautilus Wallet is not connected",
  NAUTILUS_CONNECTION_FAIL:
    "Nautilus Wallet fails to connect. Please try again",
  NAUTILUS_NO_ADDRESS:
    "Nautilus Wallet fails to load address. Please try again",
};
