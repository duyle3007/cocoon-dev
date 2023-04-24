import Header from "@/components/Header/Header";

import styles from "./Layout.module.scss";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
