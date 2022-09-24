import { RootState } from "@services/store";
import { useDispatch, useSelector } from "react-redux";
import { BlockfrostURL, CardanoWalletName } from "@entities/cardano";
import { Blockfrost, Lucid } from "lucid-cardano";
import { setWallet } from "@reducers/cardano";

const Buffer = require("buffer").Buffer;

const useWallet = () => {
  const dispatch = useDispatch();
  const { lucidClient } = useSelector((state: RootState) => state.cardano);

  const enableWallet = async (walletName: CardanoWalletName) => {
    const cardano = (window as any).cardano;
    if (cardano == null) throw new Error();
    const wallet = cardano[walletName];
    const walletApi = await wallet.enable();
    const blockfrostAPI = new Blockfrost(
      BlockfrostURL.mainnet,
      "mainnetGXsABkjQDCdtDNrPdRZJFeqaPH41BPSY"
    );
    const lucid = await Lucid.new(blockfrostAPI, "Mainnet");
    const lucidClient = await lucid.selectWallet(walletApi);

    dispatch(setWallet({ walletName, walletApi, lucidClient, wallet }));
  };

  const getWalletAddress = async (): Promise<string> => {
    if (lucidClient == null) return "";
    const addr = await lucidClient?.wallet.address();
    return addr;
  };

  const getShortWalletAddress = async (): Promise<string> => {
    const addr = await getWalletAddress();
    if (!addr.length) return "";
    return addr.slice(0, 6) + "..." + addr.slice(addr.length - 3);
  };

  const stake = () => {
    console.log("staking...");
  };

  return {
    getWalletAddress,
    getShortWalletAddress,
    enableWallet,
    stake,
  };
};

export default useWallet;
