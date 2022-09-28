import { RootState } from "@services/store";
import { useDispatch, useSelector } from "react-redux";
import {
  BlockfrostURL,
  CardanoWalletName,
  cNetaPolicyID,
  cNetaStakingContract,
  cNetaTokenNameHex,
  StakingLength,
} from "@entities/cardano";
import { Blockfrost, Constr, Data, Lucid } from "lucid-cardano";
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
    if (lucidClient == null) {
      throw new Error("Wallet not connected");
    }
    const addr = await lucidClient?.wallet.address();
    return addr;
  };

  const getShortWalletAddress = async (): Promise<string> => {
    const addr = await getWalletAddress();
    if (!addr.length) return "";
    return addr.slice(0, 6) + "..." + addr.slice(addr.length - 3);
  };

  const stake = async (stakingAmount: number, stakingLength: StakingLength) => {
    if (lucidClient == null) {
      throw new Error("Wallet not connected");
    }
    const cNetaStakingScriptAddress =
      await lucidClient.utils.validatorToAddress(cNetaStakingContract);
    const userAddress = await getWalletAddress();
    const cNetaAmount = BigInt(Number(stakingAmount));
    const stakingStartTime = new Date(0).getTime().toString();
    const stakingDeadline = new Date(5).getTime().toString();
    const dataFields = [
      userAddress,
      BigInt(stakingStartTime),
      BigInt(stakingDeadline),
      BigInt(0),
    ];
    console.log(dataFields);
    const stakingData = Data.to(new Constr(0, dataFields));

    const tx = await lucidClient
      .newTx()
      .payToContract(cNetaStakingScriptAddress, stakingData, {
        lovelace: BigInt(2000000),
        [cNetaPolicyID + cNetaTokenNameHex]: cNetaAmount,
      })
      .complete();
    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    return txHash;
  };

  return {
    getWalletAddress,
    getShortWalletAddress,
    enableWallet,
    stake,
  };
};

export default useWallet;
