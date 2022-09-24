import React from "react";
import { useEffect } from "react";

import { LocalStorageKey } from "@entities/app";
import { CardanoWalletName } from "@entities/cardano";
import useCardanoWallet from "@hooks/useCardanoWallet";

const InitCardano = ({ children }: { children: JSX.Element }) => {
  const { enableWallet } = useCardanoWallet();

  useEffect(() => {
    (async () => {
      const savedWalletName = localStorage.getItem(
        LocalStorageKey.walletNameCardano
      ) as CardanoWalletName;
      if (savedWalletName && savedWalletName in CardanoWalletName) {
        try {
          await enableWallet(savedWalletName);
        } catch (e) {}
      }
    })();
  }, []);

  return <>{children}</>;
};

export default InitCardano;
