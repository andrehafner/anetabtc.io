import React from "react";
import { useEffect } from "react";

import { LocalStorageKey } from "@entities/app";
import { CardanoWalletName } from "@entities/cardano";
import useCardanoWallet from "@hooks/useCardanoWallet";
import useErrorHandler from "@hooks/useErrorHandler";

const InitCardano = ({ children }: { children: JSX.Element }) => {
  const { enableWallet } = useCardanoWallet();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    (async () => {
      const savedWalletName = localStorage.getItem(
        LocalStorageKey.walletNameCardano
      ) as CardanoWalletName;
      if (savedWalletName && savedWalletName in CardanoWalletName) {
        try {
          await enableWallet(savedWalletName);
        } catch (e) {
          handleError(e);
        }
      }
    })();
  }, []);

  return <>{children}</>;
};

export default InitCardano;
