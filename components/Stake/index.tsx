import { StakingLength } from "@entities/app";
import { useState } from "react";
import StakingLengthButton from "./StakingLengthButton";

const Stake = () => {
  const [stakingLength, setStakingLength] = useState<StakingLength>(
    StakingLength.sixMonth
  );

  return (
    <div className="w-full p-5 flex justify-center">
      <div className="max-w-lg w-full flex flex-col items-center justify-center">
        {/* Title */}
        <span className="w-fit text-2xl">NETA/cNETA Staking</span>

        {/* Staking box */}
        <div className="component p-5 w-full rounded-2xl mt-5 flex flex-col gap-5">
          <div className="w-full flex flex-row items-center">
            <StakingLengthButton
              setStakingLength={setStakingLength}
              stakingLength={stakingLength}
            ></StakingLengthButton>
            <div className="ml-auto">APR 15.00%</div>
          </div>
          <div className="border border-theme p-5 rounded-lg">Hello</div>
          <div className="clickable button rounded-lg py-1 px-2.5 text-center">
            Stake
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
