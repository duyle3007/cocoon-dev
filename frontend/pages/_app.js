import "styles/globals.scss";
import "antd/dist/reset.css";
import "leaflet/dist/leaflet.css";
import Layout from "@/components/Layout/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Home - Cocoon Luxury Properties</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
