import InitErgo from "@layouts/InitErgo";
import Stake from "@components/Stake";
import Header from "@components/Header";

export default function Ergo() {
  return (
    <InitErgo>
      <>
        <Header></Header>
        <Stake></Stake>
      </>
    </InitErgo>
  );
}
