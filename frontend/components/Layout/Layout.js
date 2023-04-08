import Header from "@/components/Header/Header";

import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
