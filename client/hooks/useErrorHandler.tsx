import { AxiosError } from "axios";

import { ERROR_MESSAGE } from "@entities/app";

import useUtilModal from "./useUtilModal";

export default () => {
  const { openFailModal } = useUtilModal();

  const handleError = (e: any) => {
    console.log(e);
    if (Object.keys(e).length === 0) {
      /**
       * if there is no keys => error was thrown from client
       */
      openFailModal(e.message);
    } else {
      /**
       * handle error from API/other sources
       */

      /**
       * error from axios (API)
       */
      if (e.response?.data as AxiosError) {
        openFailModal(e.response.data ?? ERROR_MESSAGE.UNKNOWN_ERROR);
        return;
      }

      /**
       * error from wallet
       */
      if (e.info) {
        openFailModal(e.info ?? ERROR_MESSAGE.UNKNOWN_ERROR);
        return;
      }

      /**
       * unknown error
       */
      console.log(e);
      openFailModal(e.message ?? ERROR_MESSAGE.UNKNOWN_ERROR);
    }
  };

  return {
    handleError,
  };
};
