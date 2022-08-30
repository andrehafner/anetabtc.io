import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { createContext, useCallback, useEffect, useState } from "react";

import ConfirmStaking from "./ConfirmStaking";
import InitStaking from "./InitStaking";

import LoadingStaking from "@components/common/LoadingStaking";
import SuccessStaking from "@components/common/SuccessStaking";
import FailureStaking from "@components/common/FailureStaking";
import { Currency, StakingState } from "@entities/app";
import useErrorHandler from "@hooks/useErrorHandler";
import { getStakedNetaStats } from "@services/ergo";
import useCardanoWallet from "@hooks/useCardanoWallet";
import useErgoWallet from "@hooks/useErgoWallet";

export const StakeContext = createContext<any>(null);

const Stake = () => {
  /**
   * get currency for staking according to network
   */
  const pathname = useRouter().pathname;
  const currency = pathname === "/ergo" ? Currency.NETA : Currency.cNETA;
  const { stake: stakeOnCardano } = useCardanoWallet();
  const { stake: stakeOnErgo } = useErgoWallet();
  const { handleError } = useErrorHandler();

  const [apr, setApr] = useState(0);
  const [stakingAmount, setStakingAmount] = useState(0);
  const [stakingState, setStakingState] = useState<StakingState>(
    StakingState.init
  );

  const submitStake = async () => {
    try {
      switch (pathname) {
        case "/ergo":
          await stakeOnErgo(stakingAmount);
          break;
        case "/cardano":
          await stakeOnCardano();
          break;
        default:
          return;
      }
      setStakingState(StakingState.success);
    } catch (e) {
      handleError(e);
      setStakingState(StakingState.failure);
    }
  };

  const init = async () => {
    const stats = await getStakedNetaStats();
    setApr(stats.apr);
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
        return <SuccessStaking />;
      case StakingState.failure:
        return <FailureStaking />;
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
