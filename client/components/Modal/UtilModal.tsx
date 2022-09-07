import Modal from ".";
import {
  faCircleXmark,
  faCircleCheck,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@services/store";
import { setUtilModalSetting } from "@reducers/app";
import { IUtilModalType } from "@entities/app";

export default () => {
  const utilModalSetting = useSelector(
    (state: RootState) => state.app.utilModalSetting
  );
  const dispatch = useDispatch();

  const getIcon = () => {
    switch (utilModalSetting.type) {
      case IUtilModalType.fail:
        return (
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="h-20 text-ared"
          ></FontAwesomeIcon>
        );
      case IUtilModalType.success:
        return (
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="h-20 text-agreen"
          ></FontAwesomeIcon>
        );
      case IUtilModalType.info:
      default:
        return (
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="h-20"
          ></FontAwesomeIcon>
        );
    }
  };

  return utilModalSetting.open ? (
    <Modal closeModal={() => dispatch(setUtilModalSetting({ open: false }))}>
      <div className="flex flex-col items-center gap-4">
        {getIcon()}
        {utilModalSetting.text}
      </div>
    </Modal>
  ) : null;
};
