import "@styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { store } from "@services/store";
import InitEffect from "@layouts/InitEffect";
import Layout from "@layouts/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <InitEffect>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </InitEffect>
    </Provider>
  );
}

export default MyApp;
