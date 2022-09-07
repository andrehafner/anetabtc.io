import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { WalletConnectionStatus } from "@entities/app";
import { NautilusErgoApi } from "@entities/ergo";
import useWallet from "@hooks/useErgoWallet";
import useErrorHandler from "@hooks/useErrorHandler";

interface Props {
  walletApi: NautilusErgoApi | null;
  walletConnectionStatus: WalletConnectionStatus;
}

const ConnectionStatus = ({ walletApi, walletConnectionStatus }: Props) => {
  const { getShortWalletAddress } = useWallet();
  const { handleError } = useErrorHandler();
  const dispatch = useDispatch();
  const [addr, setAddr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const address = await getShortWalletAddress();
        setAddr(address);
      } catch (e: any) {
        handleError(e);
      }
    })();
  }, [walletApi]);

  switch (walletConnectionStatus) {
    case WalletConnectionStatus.connected:
      if (walletApi == null) return <>Connect Nautilus</>;
      return (
        <div className="flex gap-2 items-center">
          <img className="h-4" src="/nautilus-logo.png"></img>
          {addr}
        </div>
      );
    case WalletConnectionStatus.connecting:
      return <>Connecting...</>;
    case WalletConnectionStatus.notConnected:
    default:
      return <>Connect Nautilus</>;
  }
};

export default ConnectionStatus;
