import React from "react";
import { useEffect } from "react";
import { LocalStorageKey, Theme } from "@entities/app";
import { getWallet } from "@services/wallet";
import { WalletName } from "@entities/wallet";
import { setTheme, setWallet } from "@reducers/app";
import { useDispatch } from "react-redux";

const InitEffect = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();

  const initWallet = async (walletName: WalletName) => {
    try {
      const wallet = await getWallet(walletName);
      const walletApi = await wallet.enable();
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
      initWallet(savedWalletName as WalletName);
    }
  });

  return <>{children}</>;
};

export default InitEffect;
