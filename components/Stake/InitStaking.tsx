import { StakingLength, StakingState, STAKING_INFO } from "@entities/app";
import { useContext, useRef } from "react";
import { StakeContext } from ".";
import StakingInput from "./StakingInput";
import StakingLengthSelect from "./StakingLengthSelect";

interface Props {
  setStakingLength: (arg: StakingLength) => void;
  setStakingAmount: (arg: number) => void;
  setStakingState: (arg: StakingState) => void;
}

const InitStaking = ({
  setStakingLength,
  setStakingAmount,
  setStakingState,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const stakeContext = useContext(StakeContext);
  const { apr } = stakeContext;

  const handleStake = () => {
    if (inputRef.current == null) return;
    const stakingAmount = Number(inputRef.current.value);
    if (isNaN(stakingAmount)) return;
    setStakingAmount(stakingAmount);
    setStakingState(StakingState.confirm);
  };

  return (
    <div className="component p-5 w-full rounded-2xl flex flex-col gap-4">
      <div className="w-full flex flex-row items-center">
        <StakingLengthSelect
          setStakingLength={setStakingLength}
        ></StakingLengthSelect>
        <div className="ml-auto text-agreen">APR {apr}%</div>
      </div>
      <StakingInput ref={inputRef}></StakingInput>
      <button
        className="clickable button rounded-lg py-1 px-2.5 text-center"
        onClick={handleStake}
      >
        Stake
      </button>
    </div>
  );
};

export default InitStaking;