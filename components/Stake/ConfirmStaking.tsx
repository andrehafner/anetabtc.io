import { StakingLength, StakingState } from "@entities/app";

interface Props {
  stakingLength: StakingLength;
  setStakingLength: (arg: StakingLength) => void;
  apr: number;
  stakingAmount: number;
  setStakingAmount: (arg: number) => void;
  setStakingState: (arg: StakingState) => void;
}

const ConfirmStaking = ({
  stakingLength,
  setStakingLength,
  apr,
  stakingAmount,
  setStakingAmount,
  setStakingState,
}: Props) => {
  return (
    <div className="component p-5 w-full rounded-2xl mt-5 flex flex-col gap-4">
      Confirm
    </div>
  );
};

export default ConfirmStaking;
