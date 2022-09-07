import { IUtilModalSetting, IUtilModalType } from "@entities/app";
import { setUtilModalSetting } from "@reducers/app";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();

  const openSuccessModal = (text: string) => {
    dispatch(
      setUtilModalSetting({
        text,
        open: true,
        type: IUtilModalType.success,
      })
    );
  };

  const openFailModal = (text: string) => {
    dispatch(
      setUtilModalSetting({
        text,
        open: true,
        type: IUtilModalType.fail,
      })
    );
  };

  const openInfoModal = (text: string) => {
    dispatch(
      setUtilModalSetting({
        text,
        open: true,
        type: IUtilModalType.info,
      })
    );
  };

  const closeModal = () => {
    dispatch(setUtilModalSetting({ open: false }));
  };

  return {
    openSuccessModal,
    openFailModal,
    openInfoModal,
    closeModal,
  };
};
