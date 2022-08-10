import { Cip30Wallet, WalletApi } from "@cardano-sdk/cip30";
import { WalletName } from "@entities/wallet";

export const getWalletInfo = async (
  walletName: WalletName
): Promise<Cip30Wallet> => {
  return (window as any).cardano[walletName];
};
