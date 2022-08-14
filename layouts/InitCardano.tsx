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

  const initWallet = async (walletName: CardanoWalletName) => {
    try {
      const { wallet, walletApi } = await enableWallet(walletName);
      dispatch(setWallet({ walletName, wallet, walletApi }));
    } catch (e) {}
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(LocalStorageKey.theme);
    const savedWalletName = localStorage.getItem(LocalStorageKey.walletName);
    if (savedTheme) {
      dispatch(setTheme(savedTheme as Theme));
    }
    if (savedWalletName) {
      initWallet(savedWalletName as CardanoWalletName);
    }
  });

  return <>{children}</>;
};

export default InitCardano;
