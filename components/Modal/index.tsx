import { useEffect, useRef } from "react";

const Modal = ({
  children,
  closeModal,
}: {
  closeModal: () => void;
  children?: JSX.Element;
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (ref.current && (ref.current as any).contains(e.target)) {
        closeModal();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-10">
      <div className="fixed bg-black opacity-80 w-full h-full" ref={ref}></div>
      <div className="p-5 rounded-2xl z-20 bg-slate-900 min-w-80">
        {children}
      </div>
    </div>
  );
};

export default Modal;
