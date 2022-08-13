import { StakingLength } from "@entities/app";
import { useState } from "react";
import StakingInput from "./StakingInput";
import StakingLengthSelect from "./StakingLengthSelect";

const Stake = () => {
  const [stakingLength, setStakingLength] = useState<StakingLength>(
    StakingLength.sixMonth
  );
  const [apr, setApr] = useState<number>(15)
  const [stakingAmount, setStakingAmount] = useState<number>(0)

  return (
    <div className="w-full p-5 flex justify-center">
      <div className="max-w-lg w-full flex flex-col items-center justify-center">
        {/* Title */}
        <span className="w-fit text-2xl">NETA/cNETA Staking</span>

        {/* Staking box */}
        <div className="component p-5 w-full rounded-2xl mt-5 flex flex-col gap-4">
          <div className="w-full flex flex-row items-center">
            <StakingLengthSelect
              setStakingLength={setStakingLength}
              stakingLength={stakingLength}
            ></StakingLengthSelect>
            <div className="ml-auto text-agreen">APR {apr}%</div>
          </div>
          <StakingInput stakingAmount={stakingAmount} setStakingAmount={setStakingAmount} apr={apr}></StakingInput>
          <div className="clickable button rounded-lg py-1 px-2.5 text-center">
            Stake
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
