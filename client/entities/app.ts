export enum Pages {
  Dashboard,
  Stake
}
export interface IAppState {
  theme: Theme;
  page: Pages;
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

export enum StakingLength {
  sixMonth = "sixMonth",
  // twelveMonth = "twelveMonth",
}

export const STAKING_INFO: Record<
  StakingLength,
  { text: string; apr: number; calcRewards: (arg: number) => string }
> = {
  [StakingLength.sixMonth]: {
    text: "6 Months",
    apr: 12,
    calcRewards: (stakingAmount: number) => {
      return ((stakingAmount * 0.1) / 2).toFixed(2);
    },
  },
  // [StakingLength.twelveMonth]: {
  //   text: "12 Months",
  //   apr: 15,
  //   calcRewards: (stakingAmount: number) => {
  //     return (stakingAmount * 0.15).toFixed(2);
  //   },
  // },
};

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
