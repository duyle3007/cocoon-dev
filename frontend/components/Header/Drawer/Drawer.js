import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Drawer as DrawerAnt } from "antd";

import styles from "./Drawer.module.scss";
import Image from "@/components/Image/Image";

const Drawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div>
      <MenuOutlined onClick={() => setOpenDrawer(true)} />
      <DrawerAnt
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        closable={false}
        rootClassName={styles.drawer}
      >
        <div className={styles.drawerWrapper}>
          <div className={styles.content}>
            <div className="flex justify-between items-center">
              <Image src="/logo.svg" />
              <CloseOutlined onClick={() => setOpenDrawer(false)} />
            </div>
          </div>
        </div>
      </DrawerAnt>
    </div>
  );
};

export default Drawer;
