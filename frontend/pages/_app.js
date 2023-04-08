import "styles/globals.scss";
import "antd/dist/reset.css";
import "leaflet/dist/leaflet.css";
import Layout from "@/components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
