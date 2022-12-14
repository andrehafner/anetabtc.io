import useClickOutside from "@hooks/useClickOutside";

const Modal = ({
  children,
  closeModal,
}: {
  closeModal: () => void;
  children?: JSX.Element;
}) => {
  const ref = useClickOutside(closeModal);

  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-10">
      <div className="fixed bg-black opacity-80 w-full h-full"></div>
      <div
        className="p-5 rounded-2xl z-20 component min-w-80 flex flex-col gap-4 items-center"
        ref={ref}
      >
        {children}
        <button
          className="clickable button rounded-lg py-1 px-2.5 w-fit"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
