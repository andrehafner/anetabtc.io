import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ThemeSwitch = () => {
  return (
    <div className="button cursor-pointer bg-slate-900 h-full px-2.5 rounded-lg flex items-center">
      <FontAwesomeIcon icon={faSun}/>
    </div>
  ) 
}

export default ThemeSwitch