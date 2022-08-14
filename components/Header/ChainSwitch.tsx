import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Blockchain } from "@entities/app";

const ChainSwitch = () => {
  return (
    <button className="clickable component h-full px-2.5 rounded-lg flex items-center">
      go to Cardano
    </button>
  );
};

export default ChainSwitch;
