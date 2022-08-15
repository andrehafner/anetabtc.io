import {
  Currency,
  StakingLength,
  StakingState,
  STAKING_INFO,
} from "@entities/app";
import { createContext, useContext, useEffect, useState } from "react";
import ConfirmStaking from "./ConfirmStaking";
import InitStaking from "./InitStaking";
import LoadingStaking from "./LoadingStaking";
import SuccessStaking from "./SuccessStaking";
import FailureStaking from "./FailureStaking";
import { useRouter } from "next/router";

export const StakeContext = createContext({
  ...STAKING_INFO[StakingLength.sixMonth],
  stakingAmount: 0,
  stakingLength: StakingLength.sixMonth,
});

const Stake = () => {
  /**
   * get currency for staking according to network
   */
  const pathname = useRouter().pathname;
  const currency = pathname === "/ergo" ? Currency.NETA : Currency.cNETA;

  const [stakingLength, setStakingLength] = useState<StakingLength>(
    StakingLength.sixMonth
  );
  const [stakingAmount, setStakingAmount] = useState<number>(0);
  const [stakingState, setStakingState] = useState<StakingState>(
    StakingState.init
  );

  const submitStake = () => {
    console.log(stakingAmount, stakingLength);
    setStakingState(StakingState.success);
    /**
     * handle tx
     */
    // setStakingState(StakingState.init)
  };

  const RenderContentBox = () => {
    switch (stakingState) {
      case StakingState.loading:
        return <LoadingStaking></LoadingStaking>;
      case StakingState.confirm:
        return (
          <ConfirmStaking
            setStakingState={setStakingState}
            submitStake={submitStake}
          ></ConfirmStaking>
        );
      case StakingState.success:
        return (
          <SuccessStaking setStakingState={setStakingState}></SuccessStaking>
        );
      case StakingState.failure:
        return (
          <FailureStaking setStakingState={setStakingState}></FailureStaking>
        );
      case StakingState.init:
      default:
        return (
          <InitStaking
            setStakingLength={setStakingLength}
            setStakingAmount={setStakingAmount}
            setStakingState={setStakingState}
          ></InitStaking>
        );
    }
  };

  const context = {
    ...STAKING_INFO[stakingLength],
    stakingAmount: stakingAmount,
    stakingLength: stakingLength,
  };

  return (
    <StakeContext.Provider value={context}>
      <div className="w-full p-5 flex justify-center">
        <div className="max-w-lg w-full gap-4 flex flex-col items-center justify-center">
          {/* Title */}
          <span className="w-fit text-2xl">{currency} Staking</span>
          {/* Staking box */}
          <RenderContentBox></RenderContentBox>
        </div>
      </div>
    </StakeContext.Provider>
  );
};

export default Stake;
