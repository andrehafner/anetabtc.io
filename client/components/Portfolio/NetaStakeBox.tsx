import { INetaStakeBox } from "@entities/ergo";
import { shorten } from "@/utils";
import { Currency } from "@entities/app";
import useErrorHandler from "@hooks/useErrorHandler";
import useWallet from "@hooks/useErgoWallet";
import useUtilModal from "@hooks/useUtilModal";

interface Props {
  stakeBox: INetaStakeBox;
}

export default ({ stakeBox }: Props) => {
  const { handleError } = useErrorHandler();
  const { unstake } = useWallet();
  const { openSuccessModal } = useUtilModal();

  const handleUnstake = async () => {
    try {
      await unstake(stakeBox.stakeAmount, stakeBox.boxId);
      openSuccessModal("Unstaking successful!");
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full p-2.5 border border-theme rounded-2xl">
      <div>Stake ID: {shorten(stakeBox.stakeKeyId, 8)}</div>
      <div>
        Stake Amount: {stakeBox.stakeAmount} {Currency.NETA}
      </div>
      <button
        className="clickable button rounded-lg py-1 px-2.5 button-danger w-fit"
        onClick={handleUnstake}
      >
        Unstake
      </button>
    </div>
  );
};
