import { INetaStakeBox } from "@entities/ergo";
import { shorten } from "@/utils";
import { Currency, IUtilModalType } from "@entities/app";
import useErrorHandler from "@hooks/useErrorHandler";
import useWallet from "@hooks/useErgoWallet";
import { useDispatch } from "react-redux";
import { setUtilModalSetting } from "@reducers/app";

interface Props {
  stakeBox: INetaStakeBox;
}

export default ({ stakeBox }: Props) => {
  const { handleError } = useErrorHandler();
  const { unstake } = useWallet();
  const dispatch = useDispatch();

  const handleUnstake = async () => {
    try {
      await unstake(stakeBox.stakeAmount, stakeBox.boxId);
      dispatch(
        setUtilModalSetting({
          type: IUtilModalType.success,
          text: "Unstaking successful!",
          open: true,
        })
      );
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
