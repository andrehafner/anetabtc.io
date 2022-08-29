import Modal from ".";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@services/store";
import { setErrorModalSetting } from "@reducers/app";

export default () => {
  const errorModalSetting = useSelector(
    (state: RootState) => state.app.errorModalSetting
  );
  const dispatch = useDispatch();

  const error = (
    <div className="flex flex-col gap-4">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="h-20 text-ared"
      ></FontAwesomeIcon>
      {errorModalSetting.text}
    </div>
  );

  return errorModalSetting.open ? (
    <Modal closeModal={() => dispatch(setErrorModalSetting({ open: false }))}>
      {error}
    </Modal>
  ) : null;
};
