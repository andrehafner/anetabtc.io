import React from "react";
import Head from "next/head";
import Header from "@components/Header";
import { useSelector } from "react-redux";
import { RootState } from "@services/store";
import { Theme } from "@entities/app";

const Layout = ({ children }: { children: JSX.Element }) => {
  const theme: Theme = useSelector((state: RootState) => state.app.theme);

  return (
    <div className={`theme-${theme} next-container`}>
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
