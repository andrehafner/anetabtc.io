import InitErgo from "@layouts/InitErgo";
import Stake from "@components/Stake";
import Header from "@components/Header";
import Portfolio from "@components/Portfolio";

export default function Ergo() {
  return (
    <InitErgo>
      <>
        <Header></Header>
        <Portfolio></Portfolio>
      </>
    </InitErgo>
  );
}
