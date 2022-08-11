import { useDispatch } from "react-redux";
import * as appReducers from "@reducers/app";
import { ReducersName } from "@entities/app";

const useReduxDispatch = () => {
  const reduxDispatch = useDispatch();

  const dispatch = (action: ReducersName, payload?: any) => {
    switch (action) {
      case ReducersName.toggleTheme:
        reduxDispatch(appReducers.toggleTheme());
      default:
    }
  };

  return dispatch;
};

export default useReduxDispatch;
