import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StakingLength } from "@entities/app";
import { useState } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import useClickOutside from "@hooks/useClickOutside";

interface Props {
  stakingLength: StakingLength;
  setStakingLength: (length: StakingLength) => void;
}

const StakingLengthSelect = ({ stakingLength, setStakingLength }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useClickOutside(() => setShowDropdown(false));

  const handleStakingLengthSelect = (length: StakingLength) => {
    setStakingLength(length);
    setShowDropdown(false);
  };

  return (
    <div className="relative" ref={ref}>
      <div
        className="clickable button rounded-lg py-1 px-2.5 w-fit flex flex-row items-center gap-2"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <FontAwesomeIcon className="h-4" icon={faClock}></FontAwesomeIcon>
        {stakingLength}
        <FontAwesomeIcon
          className="h-4"
          icon={showDropdown ? faAngleUp : faAngleDown}
        ></FontAwesomeIcon>
      </div>
      {showDropdown ? (
        <div
          className="absolute mt-2 w-full flex flex-col gap-2 p-2 rounded-lg component border border-theme"
        >
          {Object.values(StakingLength).map((value) => {
            return (
              <div
                className="px-2.5 py-1 clickable button rounded-lg"
                onClick={() =>
                  handleStakingLengthSelect(value as StakingLength)
                }
              >
                {value}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default StakingLengthSelect;
