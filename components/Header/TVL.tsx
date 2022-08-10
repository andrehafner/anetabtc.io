import React from "react";

const TVL: React.FC = () => {
  return (
    <div className="flex flex-row gap-1 h-full p-1 bg-slate-500 rounded-lg">
      <div className="whitespace-nowrap	bg-slate-900 rounded-lg px-2 flex items-center">
        NETA TVL: 10929
      </div>
      <div className="whitespace-nowrap	bg-slate-900 rounded-lg px-2 flex items-center">
        cNETA TVL: 10929
      </div>
    </div>
  );
};

export default TVL;
