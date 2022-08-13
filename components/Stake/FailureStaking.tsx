import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StakingLength, StakingState } from "@entities/app";

interface Props {
  setStakingState: (arg: StakingState) => void;
}

const FailureStaking = ({ setStakingState }: Props) => {
  return (
    <div className="component p-10 w-full rounded-2xl mt-5 flex flex-col gap-4 items-center">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="h-20 text-ared"
      ></FontAwesomeIcon>
      Staking unsuccessful :(
    </div>
  );
};

export default FailureStaking;
