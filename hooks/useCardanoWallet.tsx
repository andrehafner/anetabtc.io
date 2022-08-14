import { RootState } from "@services/store";
import { useSelector } from "react-redux";
import { Address } from "@emurgo/cardano-serialization-lib-asmjs";

const Buffer = require("buffer").Buffer;

const useWallet = () => {
  const { wallet, walletApi } = useSelector((state: RootState) => state.cardano);

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
    return addr.slice(0, 6) + "..." + addr.slice(addr.length - 6);
  };

  return {
    getWalletAddress,
    getShortWalletAddress,
  };
};

export default useWallet;
