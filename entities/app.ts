export interface IAppState {
  theme: Theme;
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
  twelveMonth = "twelveMonth",
}

export const STAKING_INFO: Record<
  StakingLength,
  { text: string; apr: number; calcRewards: (arg: number) => string }
> = {
  [StakingLength.sixMonth]: {
    text: "6 Months",
    apr: 10,
    calcRewards: (stakingAmount: number) => {
      return ((stakingAmount * 0.1) / 2).toFixed(2);
    },
  },
  [StakingLength.twelveMonth]: {
    text: "12 Months",
    apr: 15,
    calcRewards: (stakingAmount: number) => {
      return (stakingAmount * 0.15).toFixed(2);
    },
  },
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
