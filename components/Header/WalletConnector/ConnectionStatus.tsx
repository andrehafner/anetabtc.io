import { Cip30Wallet, WalletApi } from "@cardano-sdk/cip30";
import { WalletConnectionStatus } from "@entities/app";
import useWallet from "@hooks/useCardanoWallet";
import { useEffect, useState } from "react";

interface Props {
  wallet: Cip30Wallet | null;
  walletApi: WalletApi | null;
  walletConnectionStatus: WalletConnectionStatus;
}

const Buffer = require("buffer").Buffer;

const ConnectionStatus = ({
  wallet,
  walletApi,
  walletConnectionStatus,
}: Props) => {
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
      if (wallet == null) return <>Connect Wallet</>;
      return (
        <div className="flex gap-2 items-center">
          <img className="h-4" src={wallet.icon}></img>
          {addr}
        </div>
      );
    case WalletConnectionStatus.connecting:
      return <>Connecting...</>;
    case WalletConnectionStatus.notConnected:
    default:
      return <>Connect Wallet</>;
  }
};

export default ConnectionStatus;
