import React from "react";
import Head from "next/head";
import Header from "@components/Header";
import { useSelector } from "react-redux";
import { RootState } from "@services/store";

const Layout = ({ children }: { children: JSX.Element }) => {
  const { theme } = useSelector((state: RootState) => state.app);

  return (
    <div className={`theme-${theme} next-container relative min-h-full w-full`}>
      <Head>
        <link rel="icon" href="/favicon.ico"></link>
        <title>anetBTC Staking Platform</title>
      </Head>
      <Header></Header>
      {children}
    </div>
  );
};

export default Layout;
