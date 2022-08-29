import React from "react";

const TVL: React.FC = () => {
  return (
    <div className="hidden sm:flex flex-row gap-2 h-full rounded-lg">
      <div className="whitespace-nowrap	component rounded-lg px-2 flex items-center">
        NETA TVL: 0 ERG
      </div>
      <div className="whitespace-nowrap	component rounded-lg px-2 flex items-center">
        cNETA TVL: 0 ADA
      </div>
    </div>
  );
};

export default TVL;
