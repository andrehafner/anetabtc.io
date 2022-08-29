import Header from "@components/Header";
import Stake from "@components/Stake";
import InitCardano from "@layouts/InitCardano";

export default function Cardano() {
  return (
    <InitCardano>
      <>
        <Header></Header>
        <Stake></Stake>
      </>
    </InitCardano>
  );
}
