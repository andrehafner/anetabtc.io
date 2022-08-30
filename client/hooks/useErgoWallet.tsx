import { ErrorKey } from "@entities/app";
import { NautilusErgoApi, ERGO_TX_FORMAT, IErgoUTXO } from "@entities/ergo";
import { RootState } from "@services/store";
import { useSelector } from "react-redux";
import { getStakeNetaTx } from "@services/ergo";
import { useEffect, useState } from "react";

const useWallet = () => {
  const { walletApi } = useSelector((state: RootState) => state.ergo);
  const [maxNeta, setMaxNeta] = useState(0);

  useEffect(() => {
    (async () => {
      const max = await getNetaInWallet();
      setMaxNeta(max);
    })();
  }, [walletApi]);

  const enableWallet = async (): Promise<NautilusErgoApi | null> => {
    /**
     * Recommended by nautilus to use window.ergoConnector
     */
    const ergoConnector = (window as any).ergoConnector;
    if (ergoConnector == null) throw new Error(ErrorKey.NAUTILUS_NOT_FOUND);

    const nautilus = ergoConnector.nautilus;
    if (nautilus == null) throw new Error(ErrorKey.NAUTILUS_NOT_FOUND);

    const nautilusConnected = await nautilus.connect();
    if (nautilusConnected == null)
      throw new Error(ErrorKey.NAUTILUS_CONNECTION_FAIL);

    return await nautilus.getContext();
  };

  const getWalletAddress = async (): Promise<string> => {
    if (walletApi == null) return "";
    const addrs = await walletApi.get_used_addresses();
    const addr = addrs[0];
    return addr;
  };

  const getWalletAddresses = async (): Promise<string[]> => {
    if (walletApi == null) return [];
    const addrs = await walletApi.get_used_addresses();
    return addrs;
  };

  const getNetaInWallet = async () => {
    if (walletApi == null) return 0;
    const utxos: IErgoUTXO[] = await walletApi.get_utxos();
    const assets: Record<string, number> = {};
    for (let utxo of utxos) {
      utxo.assets.forEach((asset) => {
        const assetId = asset.tokenId;
        const assetAmount = Number(asset.amount);
        if (assets[asset.tokenId]) {
          /**
           * if it is already in the object, add the amount
           */
          assets[assetId] += assetAmount;
        } else {
          /**
           * if it is not, add new key
           */
          assets[assetId] = assetAmount;
        }
      });
    }
    return process.env.NETA_POLICY_ID
      ? assets[process.env.NETA_POLICY_ID] ?? 0
      : 0;
  };

  const getShortWalletAddress = async (): Promise<string> => {
    const addr = await getWalletAddress();
    if (!addr.length) return "";
    return addr.slice(0, 6) + "..." + addr.slice(addr.length - 3);
  };

  const signTx = async (unsignedTx: string) => {
    if (walletApi == null) return;
    const signedTx = await walletApi.sign_tx(unsignedTx);
    await walletApi.submit_tx(signedTx);
  };

  const stake = async (amount: number) => {
    /**
     * since neta/cneta doesnt have decimals, we don't need to convert the amount
     */

    const address = await getWalletAddress();
    const addresses = await getWalletAddresses();

    /**
     * if no address => staking fail
     */
    if (address === "" || addresses.length === 0) {
      throw new Error(ErrorKey.STAKE_FAIL);
    }

    const request = {
      amount,
      wallet: address,
      utxos: [],
      txFormat: ERGO_TX_FORMAT,
      addresses,
    };

    const unsignedTx = await getStakeNetaTx(request);
    await signTx(unsignedTx);
  };

  return {
    getWalletAddress,
    getWalletAddresses,
    getShortWalletAddress,
    getNetaInWallet,
    enableWallet,
    stake,
    maxNeta,
  };
};

export default useWallet;

/**
 * check if ergo has been enabled, if not, request access. If request denied
 * return null.
 *
 * NOTE: this implementation is deprecated, will use nautilus as default
 * wallet for ergo
 */

/*
    if (!(await (window as any).ergo_check_read_access())) {
      if(!(await (window as any).ergo_request_read_access())) {
        return { walletApi: null }
      }
    }

    return {
      walletApi: ergo // eslint-disable-line
    }
    */
