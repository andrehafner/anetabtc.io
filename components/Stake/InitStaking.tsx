import { StakingLength, StakingState, STAKING_INFO } from "@entities/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import { StakeContext } from ".";
import StakingInput from "./StakingInput";
import StakingLengthSelect from "./StakingLengthSelect";

const InitStaking = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const stakeContext = useContext(StakeContext);
  const router = useRouter();
  const pathname = router.pathname;
  const { apr, setStakingState, setStakingAmount, setStakingLength } =
    stakeContext;

  const handleStake = () => {
    if (inputRef.current == null) return;
    const stakingAmount = Number(inputRef.current.value);
    if (isNaN(stakingAmount)) return;
    setStakingAmount(stakingAmount);
    setStakingState(StakingState.confirm);
  };

  return (
    <div className="component p-5 w-full rounded-2xl flex flex-col gap-4">
      {/* <div className="w-full flex flex-row items-center">
        <StakingLengthSelect></StakingLengthSelect>
        <div className="ml-auto text-agreen">APR {apr}%</div>
      </div> */}
      <StakingInput ref={inputRef}></StakingInput>
      <div className="flex items-center gap-4">
        <button
          className="clickable button rounded-lg py-1 px-2.5 text-center w-full"
          onClick={handleStake}
        >
          Stake
        </button>
        <Link href={`${pathname}/portfolio`}>
          <button className="button clickable rounded-lg py-1 px-2.5 text-center w-full">
            View Portfolio
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InitStaking;
