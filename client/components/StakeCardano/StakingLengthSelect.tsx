import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Blockchain, StakingLength, STAKING_INFO } from "@entities/app";
import { useContext, useState } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import useClickOutside from "@hooks/useClickOutside";
import { StakeContext } from "../StakeErgo";

const StakingLengthSelect = () => {
  const { stakingLength, text, setStakingLength } = useContext(StakeContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useClickOutside(() => setShowDropdown(false));

  const handleStakingLengthSelect = (length: StakingLength) => {
    setStakingLength(length);
    setShowDropdown(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className="clickable button rounded-lg py-1 px-2.5 w-fit flex flex-row items-center gap-2"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <FontAwesomeIcon className="h-4" icon={faClock}></FontAwesomeIcon>
        {text}
        <FontAwesomeIcon
          className="h-4"
          icon={showDropdown ? faAngleUp : faAngleDown}
        ></FontAwesomeIcon>
      </button>
      {showDropdown ? (
        <div className="absolute mt-2 w-full flex flex-col gap-2 p-2 rounded-lg component border border-theme">
          {Object.keys(StakingLength).map((key) => {
            const { text } = STAKING_INFO[key as StakingLength];
            return (
              <div
                key={text}
                className="px-2.5 py-1 clickable button rounded-lg"
                onClick={() => handleStakingLengthSelect(key as StakingLength)}
              >
                {text}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default StakingLengthSelect;
