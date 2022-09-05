import { ErrorKey, ERROR_MESSAGE } from "@entities/app";
import { setErrorModalSetting } from "@reducers/app";
import { AxiosError } from "axios";
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

      /**
       * error from axios (API)
       */
      if (e.response?.data as AxiosError) {
        dispatch(
          setErrorModalSetting({
            text: e.response.data ?? ERROR_MESSAGE.UNKNOWN_ERROR,
          })
        );
        return;
      }

      /**
       * error from wallet
       */
      if (e.info) {
        dispatch(
          setErrorModalSetting({ text: e.info ?? ERROR_MESSAGE.UNKNOWN_ERROR })
        );
        return;
      }

      /**
       * unknown error
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
