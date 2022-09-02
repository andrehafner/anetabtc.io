import StakeCardano from "@components/StakeCardano";
import Header from "@components/Header";
import InitCardano from "@layouts/InitCardano";

export default function Cardano() {
  return (
    <InitCardano>
      <>
        <Header></Header>
        <StakeCardano></StakeCardano>
      </>
    </InitCardano>
  );
}
