import Spinner from "@components/Spinner";
import { StakingLength, StakingState } from "@entities/app";

const LoadingStaking = () => {
  return (
    <div className="component p-10 w-full rounded-2xl mt-5 flex flex-col gap-4 items-center">
      <Spinner className="h-20"></Spinner>
      Staking
    </div>
  );
};

export default LoadingStaking;
