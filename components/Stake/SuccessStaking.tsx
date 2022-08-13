import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StakingLength, StakingState } from "@entities/app";

interface Props {
  setStakingState: (arg: StakingState) => void;
}

const SuccessStaking = ({ setStakingState }: Props) => {
  return (
    <div className="component p-10 w-full rounded-2xl mt-5 flex flex-col gap-4 items-center">
      <FontAwesomeIcon
        icon={faCheckCircle}
        className="text-agreen h-20"
      ></FontAwesomeIcon>
      Staking successful!
    </div>
  );
};

export default SuccessStaking;
