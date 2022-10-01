import { RootState } from "@services/store";
import { useDispatch, useSelector } from "react-redux";
import {
  BlockfrostURL,
  BLOCKFROST_MAINNET_KEY,
  CardanoWalletName,
  CNETA_POLICY_ID,
  CNETA_STAKING_SCRIPT,
  CNETA__TOKEN_NAME_HEX,
  StakingLength,
} from "@entities/cardano";
import { Blockfrost, Constr, Data, Lucid } from "lucid-cardano";
import { setWallet } from "@reducers/cardano";

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
      BLOCKFROST_MAINNET_KEY
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
      await lucidClient.utils.validatorToAddress(CNETA_STAKING_SCRIPT);
    const userAddress = await getWalletAddress();
    const { paymentCredential } =
      lucidClient.utils.getAddressDetails(userAddress);
    if (paymentCredential == null) {
      throw new Error("Cannot create payment credential");
    }
    const ownAddress = new Constr(0, [
      new Constr(0, [paymentCredential.hash]),
      new Constr(1, []),
    ]);

    const cNetaAmount = BigInt(Number(stakingAmount));
    const stakingStartTime = Date.now().toString();
    let endTime = new Date();
    if (stakingLength === StakingLength.sixMonth) {
      endTime.setDate(endTime.getDate() + 30 * 6);
    } else {
      endTime.setDate(endTime.getDate() + 30 * 12);
    }
    const stakingEndTime = endTime.getTime().toString();
    const datumfields = [
      ownAddress,
      BigInt(stakingStartTime),
      BigInt(stakingEndTime),
      BigInt(0),
    ];
    const stakingDatum = Data.to(new Constr(0, datumfields));

    const tx = await lucidClient
      .newTx()
      .validFrom(Date.now() - 100000)
      .validTo(Date.now() + 100000)
      .payToContract(cNetaStakingScriptAddress, stakingDatum, {
        lovelace: BigInt(2000000),
        [CNETA_POLICY_ID + CNETA__TOKEN_NAME_HEX]: cNetaAmount,
      })
      .complete();
    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    return txHash;
  };

  const unstake = async () => {
    if (lucidClient == null) {
      throw new Error("Wallet not connected");
    }
    const cNetaStakingScriptAddress =
      await lucidClient.utils.validatorToAddress(CNETA_STAKING_SCRIPT);
    const userAddress = await getWalletAddress();
    const { paymentCredential } =
      lucidClient.utils.getAddressDetails(userAddress);
    if (paymentCredential == null) {
      throw new Error("Cannot create payment credential");
    }

    const redeemer = Data.to(new Constr(0, []));
    const utxo = (await lucidClient.utxosAt(cNetaStakingScriptAddress)).slice(
      -1
    )[0];

    const utxotest = await lucidClient.utxosAt(cNetaStakingScriptAddress);

    console.log(utxotest);

    console.log(utxo);

    const tx = await lucidClient
      .newTx()
      .validFrom(Date.now() - 100000)
      .validTo(Date.now() + 100000)
      .collectFrom([utxo], redeemer)
      .attachSpendingValidator(CNETA_STAKING_SCRIPT)
      .addSignerKey(paymentCredential.hash)
      .complete();

    console.log(tx);

    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    return txHash;
  };

  return {
    getWalletAddress,
    getShortWalletAddress,
    enableWallet,
    stake,
    unstake,
  };
};

export default useWallet;
