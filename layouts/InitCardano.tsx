import React from "react";
import { useEffect } from "react";
import { LocalStorageKey, Theme } from "@entities/app";
import { CardanoWalletName } from "@entities/cardano";
import { setTheme } from "@reducers/app";
import { useDispatch } from "react-redux";
import { setWallet } from "@reducers/cardano";
import useCardanoWallet from "@hooks/useCardanoWallet";

const InitCardano = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const { enableWallet } = useCardanoWallet();

  useEffect(() => {
    (async () => {
      const savedTheme = localStorage.getItem(LocalStorageKey.theme);
      const savedWalletName = localStorage.getItem(
        LocalStorageKey.walletNameCardano
      ) as CardanoWalletName;
      if (savedTheme) {
        dispatch(setTheme(savedTheme as Theme));
      }
      if (savedWalletName && savedWalletName in CardanoWalletName) {
        try {
          const { wallet, walletApi } = await enableWallet(savedWalletName);
          dispatch(
            setWallet({ walletName: savedWalletName, wallet, walletApi })
          );
        } catch (e) {}
      }
    })();
  }, []);

  return <>{children}</>;
};

export default InitCardano;
