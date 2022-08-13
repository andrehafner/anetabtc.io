import { StakingLength, StakingState } from "@entities/app";
import StakingInput from "./StakingInput";
import StakingLengthSelect from "./StakingLengthSelect";

interface Props {
  stakingLength: StakingLength;
  setStakingLength: (arg: StakingLength) => void;
  apr: number;
  stakingAmount: number;
  setStakingAmount: (arg: number) => void;
  setStakingState: (arg: StakingState) => void;
}

const InitStaking = ({
  stakingLength,
  setStakingLength,
  apr,
  stakingAmount,
  setStakingAmount,
  setStakingState,
}: Props) => {
  return (
    <div className="component p-5 w-full rounded-2xl mt-5 flex flex-col gap-4">
      <div className="w-full flex flex-row items-center">
        <StakingLengthSelect
          setStakingLength={setStakingLength}
          stakingLength={stakingLength}
        ></StakingLengthSelect>
        <div className="ml-auto text-agreen">APR {apr}%</div>
      </div>
      <StakingInput
        stakingAmount={stakingAmount}
        setStakingAmount={setStakingAmount}
        apr={apr}
      ></StakingInput>
      <button
        className="clickable button rounded-lg py-1 px-2.5 text-center"
        onClick={() => setStakingState(StakingState.confirm)}
      >
        Stake
      </button>
    </div>
  );
};

export default InitStaking;
