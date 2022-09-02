import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StakingState } from "@entities/app";

interface IProps {
  setStakingState: Function;
}

const SuccessStaking = ({ setStakingState }: IProps) => {
  return (
    <div className="component p-5 w-full rounded-2xl mt-5 flex flex-col gap-4 items-center">
      <FontAwesomeIcon
        icon={faCheckCircle}
        className="text-agreen h-20"
      ></FontAwesomeIcon>
      Staking successful!
      <button
        className="button clickable w-full px-2.5 py-1 rounded-lg"
        onClick={() => setStakingState(StakingState.init)}
      >
        Return to home
      </button>
    </div>
  );
};

export default SuccessStaking;
