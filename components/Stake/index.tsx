import {
  Currency,
  StakingLength,
  StakingState,
  STAKING_INFO,
} from "@entities/app";
import { createContext, useCallback, useState } from "react";
import ConfirmStaking from "./ConfirmStaking";
import InitStaking from "./InitStaking";
import LoadingStaking from "./LoadingStaking";
import SuccessStaking from "./SuccessStaking";
import FailureStaking from "./FailureStaking";
import useCardanoWallet from "@hooks/useCardanoWallet";
import useErgoWallet from "@hooks/useErgoWallet";
import { useRouter } from "next/router";

export const StakeContext = createContext<any>(null);

const Stake = () => {
  /**
   * get currency for staking according to network
   */
  const pathname = useRouter().pathname;
  const currency = pathname === "/ergo" ? Currency.NETA : Currency.cNETA;
  const stakeOnCardano = useCardanoWallet().stake;
  const stakeOnErgo = useErgoWallet().stake;

  const [stakingLength, setStakingLength] = useState<StakingLength>(
    StakingLength.sixMonth
  );
  const [stakingAmount, setStakingAmount] = useState<number>(0);
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
      console.log(e)
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
        return <SuccessStaking />;
      case StakingState.failure:
        return <FailureStaking />;
      case StakingState.init:
      default:
        return <InitStaking />;
    }
  }, [stakingState]);

  const context = {
    ...STAKING_INFO[stakingLength],
    stakingAmount: stakingAmount,
    stakingLength: stakingLength,
    currency,
    setStakingState,
    setStakingLength,
    setStakingAmount,
    submitStake,
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
