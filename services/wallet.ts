import { Cip30Wallet, WalletApi } from "@cardano-sdk/cip30";
import { WalletName } from "@entities/wallet";

export const enableWallet = async (
  walletName: WalletName
): Promise<{ walletApi: WalletApi; wallet: Cip30Wallet }> => {
  const cardano = (window as any).cardano;
  if (cardano == null) throw new Error();
  const wallet = cardano[walletName];
  const walletApi = await wallet.enable();
  return {
    wallet,
    walletApi,
  };
};
