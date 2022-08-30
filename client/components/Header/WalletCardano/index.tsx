import Modal from "@components/Modal";
import { WalletConnectionStatus } from "@entities/app";
import { CardanoWalletName } from "@entities/cardano";
import { setWallet } from "@reducers/cardano";
import { RootState } from "@services/store";
import useCardanoWallet from "@hooks/useCardanoWallet";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConnectionStatus from "./ConnectionStatus";
import Disconnect from "./Disconnect";
import WalletList from "./WalletList";

const WalletCardano = () => {
  const [openWalletSelection, setOpenWalletSelection] =
    useState<boolean>(false);
  const [showDisconnectButton, setShowDisconnectButton] = useState(false);
  const [walletConnectionStatus, setWalletConnectionStatus] =
    useState<WalletConnectionStatus>(WalletConnectionStatus.notConnected);
  const { wallet, walletApi } = useSelector(
    (state: RootState) => state.cardano
  );
  const dispatch = useDispatch();
  const { enableWallet } = useCardanoWallet();

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

  const connectWallet = async (walletName: CardanoWalletName) => {
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

  // return (
  //   <>
  //     <div className="relative h-full">
  //       <div
  //         className="clickable component h-full px-2.5 rounded-lg flex items-center"
  //         onClick={handleOnClick}
  //       >
  //         <ConnectionStatus
  //           walletConnectionStatus={walletConnectionStatus}
  //           wallet={wallet}
  //           walletApi={walletApi}
  //         />
  //       </div>
  //       {showDisconnectButton ? (
  //         <Disconnect
  //           closeButton={() => setShowDisconnectButton(false)}
  //         ></Disconnect>
  //       ) : null}
  //     </div>

  //     {openWalletSelection ? (
  //       <Modal closeModal={() => setOpenWalletSelection(false)}>
  //         <WalletList connectWallet={connectWallet}></WalletList>
  //       </Modal>
  //     ) : null}
  //   </>
  // );
  return null;
};

export default WalletCardano;
