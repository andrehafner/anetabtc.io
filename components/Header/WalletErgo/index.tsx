import Modal from "@components/Modal";
import { WalletConnectionStatus } from "@entities/app";
import { CardanoWalletName } from "@entities/cardano";
import { setWallet } from "@reducers/ergo";
import { RootState } from "@services/store";
import useErgoWallet from "@hooks/useErgoWallet";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConnectionStatus from "./ConnectionStatus";
import Disconnect from "./Disconnect";
import WalletList from "./WalletList";

const WalletCardano = () => {
  const [showDisconnectButton, setShowDisconnectButton] = useState(false);
  const [walletConnectionStatus, setWalletConnectionStatus] =
    useState<WalletConnectionStatus>(WalletConnectionStatus.notConnected);
  const walletApi = useSelector((state: RootState) => state.ergo.walletApi);
  const dispatch = useDispatch();
  const { enableWallet } = useErgoWallet();

  /**
   * check if wallet has been automatically connected onload
   */
  useEffect(() => {
    if (walletApi == null) {
      setWalletConnectionStatus(WalletConnectionStatus.notConnected);
    } else {
      setWalletConnectionStatus(WalletConnectionStatus.connected);
    }
  }, [walletApi]);

  const connectWallet = async () => {
    const walletApi = await enableWallet();
    dispatch(setWallet({ walletApi }));
    setWalletConnectionStatus(WalletConnectionStatus.connected);
  };

  const handleOnClick = () => {
    switch (walletConnectionStatus) {
      case WalletConnectionStatus.connected:
        setShowDisconnectButton(!showDisconnectButton);
        break;
      case WalletConnectionStatus.notConnected:
        connectWallet();
        break;
      case WalletConnectionStatus.connecting:
      default:
        break;
    }
  };

  return (
    <>
      <div className="relative h-full">
        <div
          className="clickable component h-full px-2.5 rounded-lg flex items-center"
          onClick={handleOnClick}
        >
          <ConnectionStatus
            walletConnectionStatus={walletConnectionStatus}
            walletApi={walletApi}
          />
        </div>
        {showDisconnectButton ? (
          <Disconnect
            closeButton={() => setShowDisconnectButton(false)}
          ></Disconnect>
        ) : null}
      </div>
    </>
  );
};

export default WalletCardano;
