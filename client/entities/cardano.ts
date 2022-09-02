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

export enum StakingLength {
  sixMonth = "sixMonth",
  twelveMonth = "twelveMonth",
}

export const STAKING_INFO: Record<
  StakingLength,
  { text: string; apr: number; calcRewards: Function }
> = {
  [StakingLength.sixMonth]: {
    text: "6 Months",
    apr: 10,
    calcRewards: (amount: number) => {
      return (amount * 0.1) / 2;
    },
  },
  [StakingLength.twelveMonth]: {
    text: "12 Months",
    apr: 15,
    calcRewards: (amount: number) => {
      return amount * 0.15;
    },
  },
};

export interface IcnetaStakingContext {
  stakingAmount: number;
  stakingLength: StakingLength;
  setStakingState: Function;
  setStakingAmount: Function;
  submitStake: Function;
  setStakingLength: Function;
}
