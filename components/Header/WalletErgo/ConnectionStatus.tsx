import { WalletConnectionStatus } from "@entities/app";
import { NautilusErgoApi } from "@entities/ergo";
import useWallet from "@hooks/useErgoWallet";
import { useEffect, useState } from "react";

interface Props {
  walletApi: NautilusErgoApi | null;
  walletConnectionStatus: WalletConnectionStatus;
}

const ConnectionStatus = ({ walletApi, walletConnectionStatus }: Props) => {
  const { getShortWalletAddress } = useWallet();
  const [addr, setAddr] = useState("");

  useEffect(() => {
    (async () => {
      const address = await getShortWalletAddress();
      setAddr(address);
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
