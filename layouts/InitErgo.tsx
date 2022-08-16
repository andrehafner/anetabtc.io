import { useEffect } from "react";
import useErgoWallet from "@hooks/useErgoWallet";
import { setWallet } from "@reducers/ergo";
import { useDispatch } from "react-redux";
import { LocalStorageKey, Theme } from "@entities/app";
import { ErgoWalletName } from "@entities/ergo";
import { setTheme } from "@reducers/app";

const InitErgo = ({ children }: { children: JSX.Element }) => {
  const { enableWallet } = useErgoWallet();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const walletApi = await enableWallet();
      dispatch(setWallet({ walletApi }));
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
        } catch (e) {}
      }
    })();
  }, []);

  return <>{children}</>;
};

export default InitErgo;
