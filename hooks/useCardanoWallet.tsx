import { RootState } from "@services/store";
import { useSelector } from "react-redux";
import { Address } from "@emurgo/cardano-serialization-lib-asmjs";
import { CardanoWalletName } from "@entities/cardano";
import { Cip30Wallet, WalletApi } from "@cardano-sdk/cip30";

const Buffer = require("buffer").Buffer;

const useWallet = () => {
  const { wallet, walletApi } = useSelector(
    (state: RootState) => state.cardano
  );

  const enableWallet = async (
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

  const getWalletAddress = async (): Promise<string> => {
    const addrs = await walletApi?.getUsedAddresses();
    if (addrs == null) return "";
    const addrBuffer = Buffer.from(addrs[0], "hex");
    const addr = Address.from_bytes(addrBuffer).to_bech32();
    return addr;
  };

  const getShortWalletAddress = async (): Promise<string> => {
    const addr = await getWalletAddress();
    if (!addr.length) return "";
    return addr.slice(0, 6) + "..." + addr.slice(addr.length - 3);
  };

  return {
    getWalletAddress,
    getShortWalletAddress,
    enableWallet,
  };
};

export default useWallet;
