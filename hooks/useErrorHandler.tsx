import { ErrorKey, ERROR_MESSAGE } from "@entities/app";
import { setErrorModalSetting } from "@reducers/app";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();

  const handleError = (e: any) => {
    if (Object.keys(e).length === 0) {
      /**
       * if there is no keys => error was thrown from client
       */
      dispatch(
        setErrorModalSetting({ text: ERROR_MESSAGE[e.message as ErrorKey] })
      );
    } else {
      /**
       * handle error from API/other sources
       */
      console.log(e);
      dispatch(
        setErrorModalSetting({ text: e.message ?? ERROR_MESSAGE.UNKNOWN_ERROR })
      );
    }
  };

  return {
    handleError,
  };
};
