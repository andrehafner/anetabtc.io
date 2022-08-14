import { RootState } from "@services/store";
import { useSelector } from "react-redux";
import { Address } from "@emurgo/cardano-serialization-lib-asmjs";
import { CardanoWalletName } from "@entities/cardano";
import { Cip30Wallet, WalletApi } from "@cardano-sdk/cip30";

const Buffer = require("buffer").Buffer;

const useWallet = () => {
  const { walletApi } = useSelector(
    (state: RootState) => state.ergo
  );

  const enableWallet = async (
    
  ): Promise<{ walletApi: WalletApi | null }> => {
    const ergoConnector = (window as any).ergoConnector
    if (ergoConnector == null) return {
      walletApi: null
    }

    const nautilus = ergoConnector.nautilus
    if (nautilus == null) return {
      walletApi: null
    }

    const nautilusConnected = await nautilus.connect()
    if (nautilusConnected) {
      return {
        walletApi: await nautilus.getContext()
      }
    } else {
      return {
        walletApi: null
      } 
    }
  };

  // const getWalletAddress = async (): Promise<string> => {
  //   const addrs = await walletApi?.getUsedAddresses();
  //   if (addrs == null) return "";
  //   const addrBuffer = Buffer.from(addrs[0], "hex");
  //   const addr = Address.from_bytes(addrBuffer).to_bech32();
  //   return addr;
  // };

  // const getShortWalletAddress = async (): Promise<string> => {
  //   const addr = await getWalletAddress();
  //   if (!addr.length) return "";
  //   return addr.slice(0, 6) + "..." + addr.slice(addr.length - 3);
  // };

  return {
    // getWalletAddress,
    // getShortWalletAddress,
    enableWallet,
  };
};

export default useWallet;
