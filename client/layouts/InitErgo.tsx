import { useEffect } from "react";
import useErgoWallet from "@hooks/useErgoWallet";
import { setWallet } from "@reducers/ergo";
import { useDispatch } from "react-redux";
import { ErrorKey, ERROR_MESSAGE, LocalStorageKey, Theme } from "@entities/app";
import { ErgoWalletName } from "@entities/ergo";
import { setErrorModalSetting, setTheme } from "@reducers/app";
import useErrorHandler from "@hooks/useErrorHandler";
import { getStakedNetaStats } from "@services/ergo";

const InitErgo = ({ children }: { children: JSX.Element }) => {
  const { enableWallet } = useErgoWallet();
  const { handleError } = useErrorHandler();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const savedWalletName = localStorage.getItem(
        LocalStorageKey.walletNameErgo
      );
      if (savedWalletName && savedWalletName in ErgoWalletName) {
        try {
          /**
           * for now, we only support nautilus
           */
          const walletApi = await enableWallet();
          await getStakedNetaStats();
          dispatch(setWallet({ walletApi }));
        } catch (e: any) {
          handleError(e);
        }
      }
    })();
  }, []);

  return <>{children}</>;
};

export default InitErgo;
