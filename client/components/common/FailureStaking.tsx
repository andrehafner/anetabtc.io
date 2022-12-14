import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StakingState } from "@entities/app";
import { useContext } from "react";
import { StakeContext } from "../StakeErgo";

interface IProps {
  setStakingState: Function;
}

const FailureStaking = ({ setStakingState }: IProps) => {
  return (
    <div className="component p-5 w-full rounded-2xl mt-5 flex flex-col gap-4 items-center">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="h-20 text-ared"
      ></FontAwesomeIcon>
      Staking unsuccessful :(
      <button
        className="button clickable w-full px-2.5 py-1 rounded-lg"
        onClick={() => setStakingState(StakingState.init)}
      >
        Return to home
      </button>
    </div>
  );
};

export default FailureStaking;
