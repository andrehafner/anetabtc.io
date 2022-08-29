import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  className?: string;
}

const Spinner = ({ className }: Props) => {
  return (
    <FontAwesomeIcon
      className={`spinner ${className ?? ""}`}
      icon={faCircleNotch}
    ></FontAwesomeIcon>
  );
};

export default Spinner;
