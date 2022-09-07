import { ERROR_MESSAGE, IUtilModalType } from "@entities/app";
import { setUtilModalSetting } from "@reducers/app";
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
        setUtilModalSetting({ text: e.message, type: IUtilModalType.fail })
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
          setUtilModalSetting({
            text: e.response.data ?? ERROR_MESSAGE.UNKNOWN_ERROR,
            type: IUtilModalType.fail,
          })
        );
        return;
      }

      /**
       * error from wallet
       */
      if (e.info) {
        dispatch(
          setUtilModalSetting({
            text: e.info ?? ERROR_MESSAGE.UNKNOWN_ERROR,
            type: IUtilModalType.fail,
          })
        );
        return;
      }

      /**
       * unknown error
       */
      console.log(e);
      dispatch(
        setUtilModalSetting({
          text: e.message ?? ERROR_MESSAGE.UNKNOWN_ERROR,
          type: IUtilModalType.fail,
        })
      );
    }
  };

  return {
    handleError,
  };
};
