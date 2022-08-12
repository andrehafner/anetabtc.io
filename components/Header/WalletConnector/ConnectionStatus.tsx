import { Cip30Wallet } from "@cardano-sdk/cip30";
import { WalletConnectionStatus } from "@entities/wallet";
import { useEffect, useState } from "react";

interface Props {
  wallet: Cip30Wallet | null;
  walletConnectionStatus: WalletConnectionStatus;
}

const ConnectionStatus = ({ wallet, walletConnectionStatus }: Props) => {
  switch (walletConnectionStatus) {
    case WalletConnectionStatus.connected:
      if (wallet == null) return <>Connect Wallet</>;
      return (
        <div className="flex gap-2 items-center">
          <img className="h-4" src={wallet.icon}></img>
          {wallet.name}
        </div>
      );
    case WalletConnectionStatus.connecting:
      return <>Connecting</>;
    case WalletConnectionStatus.notConnected:
    default:
      return <>Connect Wallet</>;
  }
};

export default ConnectionStatus;
