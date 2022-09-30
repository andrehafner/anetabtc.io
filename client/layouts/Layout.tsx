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
          <title>anetaBTC Staking Platform</title>
        </Head>
        {children}
      </div>
    </div>
  );
};

export default Layout;
