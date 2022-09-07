import {
  faCircleXmark,
  faCircleCheck,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

import { RootState } from "@services/store";
import { IUtilModalType } from "@entities/app";
import useUtilModal from "@hooks/useUtilModal";

import Modal from ".";

export default () => {
  const utilModalSetting = useSelector(
    (state: RootState) => state.app.utilModalSetting
  );
  const { closeModal } = useUtilModal();

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
    <Modal closeModal={closeModal}>
      <div className="flex flex-col items-center gap-4">
        {getIcon()}
        {utilModalSetting.text}
      </div>
    </Modal>
  ) : null;
};
