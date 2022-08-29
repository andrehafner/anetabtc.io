import useClickOutside from "@hooks/useClickOutside";
import { setWallet } from "@reducers/ergo";
import { useDispatch } from "react-redux";

const Disconnect = ({ closeButton }: { closeButton: Function }) => {
  const dispatch = useDispatch();
  const ref = useClickOutside(closeButton);

  const handleOnClick = () => {
    closeButton();
    dispatch(setWallet({ walletApi: null }));
  };

  return (
    <div
      className="absolute clickable rounded-lg component py-1 px-2.5 right-0 mt-2 min-w-fit w-full text-center"
      onClick={handleOnClick}
      ref={ref}
    >
      Disconnect
    </div>
  );
};

export default Disconnect;
