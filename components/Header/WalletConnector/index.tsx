import Modal from "@components/Modal";
import { WalletName } from "@entities/wallet";
import { WalletConnectionStatus } from "@entities/wallet";
import { setWallet } from "@reducers/app";
import { RootState } from "@services/store";
import { enableWallet } from "@services/wallet";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConnectionStatus from "./ConnectionStatus";
import Disconnect from "./Disconnect";
import WalletList from "./WalletList";

const WalletConnector = () => {
  const [openWalletSelection, setOpenWalletSelection] =
    useState<boolean>(false);
  const [showDisconnectButton, setShowDisconnectButton] = useState(false);
  const [walletConnectionStatus, setWalletConnectionStatus] =
    useState<WalletConnectionStatus>(WalletConnectionStatus.notConnected);
  const { wallet, walletApi } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  /**
   * check if wallet has been automatically connected onload
   */
  useEffect(() => {
    if (wallet == null) {
      setWalletConnectionStatus(WalletConnectionStatus.notConnected);
    } else {
      setWalletConnectionStatus(WalletConnectionStatus.connected);
    }
  }, [wallet]);

  const connectWallet = async (walletName: WalletName) => {
    const { wallet, walletApi } = await enableWallet(walletName);
    dispatch(setWallet({ walletName, wallet, walletApi }));
    setOpenWalletSelection(false);
    setWalletConnectionStatus(WalletConnectionStatus.connected);
  };

  const handleOnClick = () => {
    switch (walletConnectionStatus) {
      case WalletConnectionStatus.connected:
        setShowDisconnectButton(!showDisconnectButton);
        break;
      case WalletConnectionStatus.notConnected:
        setOpenWalletSelection(true);
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
            wallet={wallet}
            walletApi={walletApi}
          />
        </div>
        {showDisconnectButton ? (
          <Disconnect
            closeButton={() => setShowDisconnectButton(false)}
          ></Disconnect>
        ) : null}
      </div>

      {openWalletSelection ? (
        <Modal closeModal={() => setOpenWalletSelection(false)}>
          <WalletList connectWallet={connectWallet}></WalletList>
        </Modal>
      ) : null}
    </>
  );
};

export default WalletConnector;
