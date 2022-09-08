import { useState } from "react";

import { INetaStakeBox } from "@entities/ergo";
import { Currency } from "@entities/app";
import { shorten } from "@/utils";
import useErrorHandler from "@hooks/useErrorHandler";
import useWallet from "@hooks/useErgoWallet";
import useUtilModal from "@hooks/useUtilModal";
import Modal from "@components/Modal";

interface Props {
  stakeBox: INetaStakeBox;
}

export default ({ stakeBox }: Props) => {
  const { handleError } = useErrorHandler();
  const { unstake } = useWallet();
  const { openSuccessModal } = useUtilModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountToUnstake, setAmountToUnstake] = useState("");

  const handleUnstake = async (amount: number) => {
    try {
      /**
       * validate input
       */
      if (amount > stakeBox.stakeAmount) {
        throw Error("You don't have enough staked NETA");
      }

      if (amount < 0) {
        throw Error("You cannot unstake negative value");
      }

      /**
       * unstake
       */
      await unstake(amount, stakeBox.boxId);
      setIsModalOpen(false);
      openSuccessModal("Unstaking successful!");
    } catch (e) {
      setIsModalOpen(false);
      handleError(e);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full p-2.5 border border-theme rounded-2xl">
      {isModalOpen ? (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <div className="flex flex-col gap-4">
            <div className="w-full sm:w-80 text-center">
              Enter the amount you want to unstake (Maximum is{" "}
              {stakeBox.stakeAmount} NETA)
            </div>
            <input
              type={"number"}
              className="bg-transparent border border-theme rounded-lg p-1 w-full"
              value={amountToUnstake}
              onChange={(e) => setAmountToUnstake(e.target.value)}
            ></input>
            <div className="flex flex-row gap-2">
              <button
                className="clickable button rounded-lg py-1 px-2.5 w-full"
                onClick={() => setAmountToUnstake(String(stakeBox.stakeAmount))}
              >
                Max
              </button>
              <button
                className="clickable button rounded-lg py-1 px-2.5 button-danger w-full"
                onClick={() => handleUnstake(Number(amountToUnstake))}
              >
                Unstake
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      <div>Stake ID: {shorten(stakeBox.stakeKeyId, 8)}</div>
      <div>
        Stake Amount: {stakeBox.stakeAmount} {Currency.NETA}
      </div>
      <button
        className="clickable button rounded-lg py-1 px-2.5 button-danger w-fit"
        onClick={() => setIsModalOpen(true)}
      >
        Unstake
      </button>
    </div>
  );
};
