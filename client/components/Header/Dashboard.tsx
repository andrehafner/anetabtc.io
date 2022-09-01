import { Pages } from "@entities/app";
import { setPage } from "@reducers/app";
import { RootState } from "@services/store";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Dashboard: React.FC = () => {
  const page: Pages = useSelector((state: RootState) => state.app.page);
  const dispatch = useDispatch();

  return (
    <div className="sm:flex flex-row h-full rounded-lg">
      <div className={`whitespace-nowrap ${page === Pages.Stake ? 'componentselected' : 'componentunselected'} rounded-l-lg px-2 flex items-center`}
        onClick={() => dispatch(setPage(Pages.Stake))}>
        Stake
      </div>
      <div className={`whitespace-nowrap	${page === Pages.Dashboard ? 'componentselected' : 'componentunselected'} rounded-r-lg px-2 flex items-center`}
        onClick={() => dispatch(setPage(Pages.Dashboard))}>
        Dashboard
      </div>
    </div>
  );
};

export default Dashboard;
