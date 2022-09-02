import { createContext, useCallback, useState } from "react";

import ConfirmStaking from "./ConfirmStaking";
import InitStaking from "./InitStaking";

import LoadingStaking from "@components/common/LoadingStaking";
import SuccessStaking from "@components/common/SuccessStaking";
import FailureStaking from "@components/common/FailureStaking";
import { Currency, StakingState } from "@entities/app";
import useErrorHandler from "@hooks/useErrorHandler";
import useCardanoWallet from "@hooks/useCardanoWallet";
import { IcnetaStakingContext, StakingLength } from "@entities/cardano";

export const CnetaStakingContext = createContext<IcnetaStakingContext>({
  stakingAmount: 0,
  stakingLength: StakingLength.sixMonth,
  setStakingLength: () => {},
  setStakingState: () => {},
  setStakingAmount: () => {},
  submitStake: () => {},
});

const Stake = () => {
  const currency = Currency.cNETA;
  const { stake } = useCardanoWallet();
  const { handleError } = useErrorHandler();

  const [stakingLength, setStakingLength] = useState<StakingLength>(
    StakingLength.sixMonth
  );
  const [stakingAmount, setStakingAmount] = useState(0);
  const [stakingState, setStakingState] = useState<StakingState>(
    StakingState.init
  );

  const submitStake = async () => {
    try {
      await stake();
      setStakingState(StakingState.success);
    } catch (e) {
      handleError(e);
      setStakingState(StakingState.failure);
    }
  };

  const RenderContentBox = useCallback(() => {
    switch (stakingState) {
      case StakingState.loading:
        return <LoadingStaking />;
      case StakingState.confirm:
        return <ConfirmStaking />;
      case StakingState.success:
        return <SuccessStaking setStakingState={setStakingState} />;
      case StakingState.failure:
        return <FailureStaking setStakingState={setStakingState} />;
      case StakingState.init:
      default:
        return <InitStaking />;
    }
  }, [stakingState, stakingAmount]);

  const context = {
    stakingLength,
    stakingAmount,
    setStakingState,
    setStakingAmount,
    submitStake,
    setStakingLength,
  };

  return (
    <CnetaStakingContext.Provider value={context}>
      <div className="w-full p-5 flex justify-center">
        <div className="max-w-lg w-full gap-4 flex flex-col items-center justify-center">
          {/* Title */}
          <span className="w-fit text-3xl font-bold">{currency} Staking</span>
          {/* Staking box */}
          <RenderContentBox></RenderContentBox>
        </div>
      </div>
    </CnetaStakingContext.Provider>
  );
};

export default Stake;
