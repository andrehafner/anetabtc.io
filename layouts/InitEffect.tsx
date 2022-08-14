import React from "react";
import { useEffect } from "react";
import { LocalStorageKey, Theme } from "@entities/app";
import { enableWallet } from "@services/wallet";
import { CardanoWalletName } from "@entities/cardano";
import { setTheme } from "@reducers/app";
import { useDispatch } from "react-redux";
import { setWallet } from "@reducers/cardano";

const InitEffect = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();

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

export default InitEffect;
