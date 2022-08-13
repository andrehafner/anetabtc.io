import { StakingLength, StakingState } from "@entities/app";
import { useCallback, useState } from "react";
import ConfirmStaking from "./ConfirmStaking";
import InitStaking from "./InitStaking";
import LoadingStaking from "./LoadingStaking";

const Stake = () => {
  const [stakingLength, setStakingLength] = useState<StakingLength>(
    StakingLength.sixMonth
  );
  const [apr, setApr] = useState<number>(15);
  const [stakingAmount, setStakingAmount] = useState<number>(0);
  const [stakingState, setStakingState] = useState<StakingState>(
    StakingState.init
  );

  const RenderContentBox = useCallback(() => {
    switch (stakingState) {
      case StakingState.loading:
        return (
          <LoadingStaking
            stakingAmount={stakingAmount}
            stakingLength={stakingLength}
            apr={apr}
            setStakingAmount={setStakingAmount}
            setStakingLength={setStakingLength}
            setStakingState={setStakingState}
          ></LoadingStaking>
        );
      case StakingState.confirm:
        return (
          <ConfirmStaking
            stakingAmount={stakingAmount}
            stakingLength={stakingLength}
            apr={apr}
            setStakingAmount={setStakingAmount}
            setStakingLength={setStakingLength}
            setStakingState={setStakingState}
          ></ConfirmStaking>
        );
      case StakingState.init:
      default:
        return (
          <InitStaking
            stakingAmount={stakingAmount}
            stakingLength={stakingLength}
            apr={apr}
            setStakingAmount={setStakingAmount}
            setStakingLength={setStakingLength}
            setStakingState={setStakingState}
          ></InitStaking>
        );
    }
  }, [stakingState]);

  return (
    <div className="w-full p-5 flex justify-center">
      <div className="max-w-lg w-full flex flex-col items-center justify-center">
        {/* Title */}
        <span className="w-fit text-2xl">NETA/cNETA Staking</span>
        {/* Staking box */}
        <RenderContentBox></RenderContentBox>
      </div>
    </div>
  );
};

export default Stake;
