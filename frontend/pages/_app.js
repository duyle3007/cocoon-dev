import "antd/dist/reset.css";
import "leaflet/dist/leaflet.css";
import "styles/globals.scss";

import Layout from "@/components/Layout/Layout";
import Head from "next/head";
import { ConfigProvider } from "antd";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Home - Cocoon Luxury Properties</title>
      </Head>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#90744F",
            borderRadius: 0
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </Layout>
  );
}

export default MyApp;
