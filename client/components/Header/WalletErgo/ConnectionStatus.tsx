import { ErrorKey, ERROR_MESSAGE, WalletConnectionStatus } from "@entities/app";
import { NautilusErgoApi } from "@entities/ergo";
import useWallet from "@hooks/useErgoWallet";
import { setErrorModalSetting } from "@reducers/app";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
  walletApi: NautilusErgoApi | null;
  walletConnectionStatus: WalletConnectionStatus;
}

const ConnectionStatus = ({ walletApi, walletConnectionStatus }: Props) => {
  const { getShortWalletAddress } = useWallet();
  const dispatch = useDispatch();
  const [addr, setAddr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const address = await getShortWalletAddress();
        setAddr(address);
      } catch (e: any) {
        if (Object.keys(e).length === 0) {
          /**
           * if there is no keys => error was thrown from client
           */
          dispatch(
            setErrorModalSetting({ text: ERROR_MESSAGE[e.message as ErrorKey] })
          );
        } else {
          /**
           * handle error from API/other sources
           */
          dispatch(setErrorModalSetting({ text: ERROR_MESSAGE.UNKNOWN_ERROR }));
        }
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
