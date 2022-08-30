import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "@services/store";
import ErrorModal from "@components/Modal/ErrorModal";

const Layout = ({ children }: { children: JSX.Element }) => {
  const { theme } = useSelector((state: RootState) => state.app);

  return (
    <div className={`theme-${theme} next-container relative min-h-full w-full`}>
      <ErrorModal></ErrorModal>
      <Head>
        <link rel="icon" href="/favicon.ico"></link>
        <title>anetaBTC Staking Platform</title>
      </Head>
      {children}
    </div>
  );
};

export default Layout;
