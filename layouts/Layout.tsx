import React from "react";
import Head from "next/head";
import Header from "@components/Header";

const Layout = ({ ChildComponent }: { ChildComponent: React.FC }) => {
  return (
    <div className="theme-dark next-container">
      <Head>
        <link rel="icon" href="/favicon.ico"></link>
        <title>anetBTC Staking Platform</title>
      </Head>
      <Header></Header>
      <ChildComponent></ChildComponent>
    </div>
  );
};

export default Layout;
