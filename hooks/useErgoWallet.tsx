import { NautilusErgoApi } from "@entities/ergo";
import { RootState } from "@services/store";
import { useSelector } from "react-redux";

const useWallet = () => {
  const { walletApi } = useSelector((state: RootState) => state.ergo);

  const enableWallet = async (): Promise<NautilusErgoApi | null> => {
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

    /**
     * Recommended by nautilus to use window.ergoConnector
     */
    const ergoConnector = (window as any).ergoConnector;
    if (ergoConnector == null) return null;

    const nautilus = ergoConnector.nautilus;
    if (nautilus == null) return null;

    const nautilusConnected = await nautilus.connect();
    if (nautilusConnected) {
      return await nautilus.getContext();
    }
    return null;
  };

  const getWalletAddress = async (): Promise<string> => {
    if (walletApi == null) return "";
    const addrs = await walletApi.get_used_addresses();
    const addr = addrs[0];
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
