import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";

const Dashboard = React.forwardRef(({ }, ref) => {

  useEffect(() => { });

  return (
    <>
      <div className="flex gap-4">
        <div className="rectangle">
          <div className="title flex-1 text-center justify-center flex flex-col"><p>Number of stakers</p></div>
          <div className="data flex-1 text-center justify-center flex flex-col">2,334</div>
        </div>
        <div className="rectangle">
          <div className="title flex-1 text-center justify-center flex flex-col">cNETA tokens staked</div>
          <div className="data flex-1 text-center justify-center flex flex-col">88,000,000</div>
        </div>
        <div className="rectangle">
          <div className="title flex-1 text-center justify-center flex flex-col">NETA tokens staked</div>
          <div className="data flex-1 text-center justify-center flex flex-col">88,000,000</div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="rectangle">
          <div className="title flex-1 text-center justify-center flex flex-col">NETA TVL</div>
          <div className="data flex-1 text-center justify-center flex flex-col">800k ERG</div>
        </div>
        <div className="rectangle">
          <div className="title flex-1 text-center justify-center flex flex-col">cNETA TVL</div>
          <div className="data flex-1 text-center justify-center flex flex-col">6.3M ADA</div>
        </div>
      </div>
    </>
  );
});

export default Dashboard;
