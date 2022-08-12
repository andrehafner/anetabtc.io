import Modal from "@components/Modal";
import { WalletName } from "@entities/wallet";
import { useState } from "react";
import { useDispatch } from "react-redux";

const WalletConnector = () => {
  const [openWalletSelection, setOpenWalletSelection] =
    useState<boolean>(false);
  const dispatch = useDispatch();

  const WalletList = () => {
    const cardano = (window as any).cardano;
    if (cardano == null) return <>No Cardano wallet found</>;
    return (
      <div className="flex flex-col gap-4 w-full">
        {Object.keys(cardano)
          .filter((walletName) => WalletName[walletName as WalletName])
          .map((walletName) => (
            <div className="rounded-lg border border-theme p-2.5 cursor-pointer">
              <div className="flex flex-row gap-2 items-center">
                <img className="h-6" src={cardano[walletName].icon}></img>
                {cardano[walletName].name}
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <>
      <div
        className="button cursor-pointer bg-slate-900 h-full px-5 rounded-lg flex items-center"
        onClick={() => setOpenWalletSelection(true)}
      >
        Connect Wallet
      </div>
      {openWalletSelection ? (
        <Modal closeModal={() => setOpenWalletSelection(false)}>
          <WalletList></WalletList>
        </Modal>
      ) : null}
    </>
  );
};

export default WalletConnector;
