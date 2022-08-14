import { Cip30Wallet, WalletApi } from "@cardano-sdk/cip30";
import { CardanoWalletName } from "@entities/cardano";

export const enableWallet = async (
  walletName: CardanoWalletName
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
