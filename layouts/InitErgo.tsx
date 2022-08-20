import { useEffect } from "react";
import useErgoWallet from "@hooks/useErgoWallet";
import { setWallet } from "@reducers/ergo";
import { useDispatch } from "react-redux";
import { ErrorKey, ERROR_MESSAGE, LocalStorageKey, Theme } from "@entities/app";
import { ErgoWalletName } from "@entities/ergo";
import { setErrorModalSetting, setTheme } from "@reducers/app";

const InitErgo = ({ children }: { children: JSX.Element }) => {
  const { enableWallet } = useErgoWallet();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const savedTheme = localStorage.getItem(LocalStorageKey.theme);
      const savedWalletName = localStorage.getItem(
        LocalStorageKey.walletNameErgo
      );
      if (savedTheme) {
        dispatch(setTheme(savedTheme as Theme));
      }
      if (savedWalletName && savedWalletName in ErgoWalletName) {
        try {
          /**
           * for now, we only support nautilus
           */
          const walletApi = await enableWallet();
          dispatch(setWallet({ walletApi }));
        } catch (e: any) {
          if (Object.keys(e).length === 0) {
            /**
             * if there is no keys => error was thrown from client
             */
            dispatch(
              setErrorModalSetting({
                text: ERROR_MESSAGE[e.message as ErrorKey],
              })
            );
          } else {
            /**
             * handle error from API/other sources
             */
            dispatch(
              setErrorModalSetting({ text: ERROR_MESSAGE.UNKNOWN_ERROR })
            );
          }
        }
      }
    })();
  }, []);

  return <>{children}</>;
};

export default InitErgo;
