import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@services/store";
import UtilModal from "@components/Modal/UtilModal";
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
    <div
      className={`theme-${theme} next-container relative min-h-full w-full flex flex-col items-center`}
    >
      <div className="w-full">
        <UtilModal></UtilModal>
        <Head>
          <link rel="icon" href="/favicon.ico"></link>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <title>anetaBTC Staking Platform</title>
        </Head>
        {children}
      </div>
    </div>
  );
};

export default Layout;
