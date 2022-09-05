import { INetaStakeBox } from "@entities/ergo";
import { shorten } from "@/utils";
import { Currency } from "@entities/app";

interface Props {
  stakeBox: INetaStakeBox;
}

export default ({ stakeBox }: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full p-2.5 border border-theme rounded-2xl">
      <div>Stake ID: {shorten(stakeBox.stakeKeyId, 8)}</div>
      <div>
        Stake Amount: {stakeBox.stakeAmount} {Currency.NETA}
      </div>
      <button className="clickable button rounded-lg py-1 px-2.5 button-danger w-fit">
        Unstake
      </button>
    </div>
  );
};
