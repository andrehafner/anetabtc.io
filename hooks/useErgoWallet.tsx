import { ERGO_TX_FORMAT, ErrorKey, NETA_PROJECT_ID } from "@entities/app";
import { NautilusErgoApi } from "@entities/ergo";
import { RootState } from "@services/store";
import { useSelector } from "react-redux";
import axios from "axios";

const useWallet = () => {
  const { walletApi } = useSelector((state: RootState) => state.ergo);

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

  const getShortWalletAddress = async (): Promise<string> => {
    const addr = await getWalletAddress();
    if (!addr.length) return "";
    return addr.slice(0, 6) + "..." + addr.slice(addr.length - 3);
  };

  const stake = async (amount: number) => {
    /**
     * since neta/cneta doesnt have decimals, we don't need to convert the amount
     */

    const address = await getWalletAddress();
    const addresses = await getWalletAddresses();
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    /**
     * if no address => staking fail
     */
    if (address === "" || addresses.length === 0) {
      throw new Error(ErrorKey.STAKE_FAIL);
    }

    const request = {
      stakeBox: null, // TODO: change this
      amount,
      address,
      utxos: [],
      txFormat: ERGO_TX_FORMAT,
      addresses,
    };

    const res = await axios.post(
      `${process.env.ERGOPAD_API_URL}/staking/${NETA_PROJECT_ID}/addstake/`,
      request,
      { ...defaultOptions }
    );

    return res;
  };

  return {
    getWalletAddress,
    getShortWalletAddress,
    enableWallet,
    stake,
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
