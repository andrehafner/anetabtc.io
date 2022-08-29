import { Theme } from "@entities/app";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@services/store";
import { toggleTheme } from "@reducers/app";

const ThemeSwitch = () => {
  const theme: Theme = useSelector((state: RootState) => state.app.theme);
  const dispatch = useDispatch();

  return (
    <button
      className="clickable component h-full px-2.5 rounded-lg flex items-center"
      onClick={() => dispatch(toggleTheme())}
    >
      <FontAwesomeIcon
        className="h-4"
        icon={theme === Theme.dark ? faSun : faMoon}
      />
    </button>
  );
};

export default ThemeSwitch;
