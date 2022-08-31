import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@services/store";
import ErrorModal from "@components/Modal/ErrorModal";
import { LocalStorageKey, Theme } from "@entities/app";
import { setTheme } from "@reducers/app";

const Layout = ({ children }: { children: JSX.Element }) => {
  const { theme } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem(LocalStorageKey.theme);
    if (savedTheme) {
      dispatch(setTheme(savedTheme as Theme));
    }
  }, []);

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
