import Head from "next/head";
import Header from "@components/Header";
import Layout from "layouts/layout";
import Stake from "@components/Stake";

export default function Home() {
  return <Layout ChildComponent={Stake}></Layout>;
}
