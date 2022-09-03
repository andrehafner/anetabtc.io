import { createContext, useCallback, useEffect, useState } from "react";

import ConfirmStaking from "./ConfirmStaking";
import InitStaking from "./InitStaking";

import LoadingStaking from "@components/common/LoadingStaking";
import SuccessStaking from "@components/common/SuccessStaking";
import FailureStaking from "@components/common/FailureStaking";
import { Currency, StakingState } from "@entities/app";
import useErrorHandler from "@hooks/useErrorHandler";
import { getStakedNetaStats } from "@services/ergo";
import useErgoWallet from "@hooks/useErgoWallet";

export const StakeContext = createContext<any>(null);

const Stake = () => {
  /**
   * get currency for staking according to network
   */
  const currency = Currency.NETA;
  const { stake } = useErgoWallet();
  const { handleError } = useErrorHandler();

  const [apr, setApr] = useState(0);
  const [stakingAmount, setStakingAmount] = useState(0);
  const [stakingState, setStakingState] = useState<StakingState>(
    StakingState.init
  );

  const submitStake = async () => {
    try {
      await stake(stakingAmount);
      setStakingState(StakingState.success);
    } catch (e) {
      handleError(e);
      setStakingState(StakingState.failure);
    }
  };

  const init = async () => {
    try {
      const stats = await getStakedNetaStats();
      setApr(stats.apr);
    } catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    init();
  }, []);

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

  const calcRewards = (stakingAmount: number, apr: number) => {
    return ((stakingAmount * apr) / 100).toFixed(2);
  };

  const context = {
    stakingAmount,
    apr,
    currency,
    setStakingState,
    setStakingAmount,
    submitStake,
    calcRewards,
  };

  return (
    <StakeContext.Provider value={context}>
      <div className="w-full p-5 flex justify-center">
        <div className="max-w-lg w-full gap-4 flex flex-col items-center justify-center">
          {/* Title */}
          <span className="w-fit text-3xl font-bold">{currency} Staking</span>
          {/* Staking box */}
          <RenderContentBox></RenderContentBox>
        </div>
      </div>
    </StakeContext.Provider>
  );
};

export default Stake;
