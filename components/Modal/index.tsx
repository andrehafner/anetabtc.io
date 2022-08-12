import { useSelector } from "react-redux";
import { RootState } from '@services/store'

const Modal = () => {
  const modalChild = useSelector((state: RootState) => state.app.modalChild)
  return modalChild ? <div className="fixed w-full h-full flex items-center justify-center z-10">
    <div className="absolute bg-black opacity-80 w-full h-full">
    </div>
    <div className="p-5 rounded-2xl z-20 bg-slate-900">
      {
        modalChild
      }
    </div>
  </div> : null;
};

export default Modal;
