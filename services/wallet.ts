import { Cip30Wallet, WalletApi } from "@cardano-sdk/cip30";
import { WalletName } from "@entities/wallet";

export const enableWallet = async (
  walletName: WalletName
): Promise<Cip30Wallet> => {
  return (window as any).cardano[walletName];
};
