import { ReducersName, Theme } from "@entities/app";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { RootState } from "@services/store";
import useReduxDispatch from "@hooks/useReduxDispatch";

const ThemeSwitch = () => {
  const theme: Theme = useSelector((state: RootState) => state.app.theme);
  const dispatch = useReduxDispatch();

  return (
    <div
      className="button cursor-pointer bg-slate-900 h-full px-2.5 rounded-lg flex items-center"
      onClick={() => dispatch(ReducersName.toggleTheme)}
    >
      <FontAwesomeIcon
        className="h-4"
        icon={theme === Theme.dark ? faSun : faMoon}
      />
    </div>
  );
};

export default ThemeSwitch;
