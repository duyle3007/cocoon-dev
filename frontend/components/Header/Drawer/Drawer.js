import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Collapse, Drawer as DrawerAnt, Input } from "antd";
import { useRouter } from "next/router";

import Image from "@/components/Image/Image";

import styles from "./Drawer.module.scss";

const { Panel } = Collapse;

const Drawer = () => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  const goTo = (url) => {
    setOpenDrawer(false);
    router.push(url);
  };
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
              <Image src="/logo.svg" className={styles.logo} />
              <CloseOutlined onClick={() => setOpenDrawer(false)} />
            </div>
            <Input
              placeholder="Villa name or Location..."
              bordered={false}
              className={styles.searchVilla}
            />

            <div className={styles.drawerList}>
              <div onClick={() => goTo("/")}>HOME</div>
              <Collapse ghost expandIcon={() => null}>
                <Panel header="AUSTRALIA" key="1">
                  <p>PRIVATE VILLAS</p>
                  <p>LUXURY LODGES</p>
                </Panel>
                <Panel header="DESTINATION" key="2">
                  <p>ALL DESTINATIONS</p>
                  <p>AUSTRALIA</p>
                  <p>NEW ZEALAND</p>
                </Panel>
              </Collapse>
              <div onClick={() => goTo("/photoshoots")}>
                PHOTOSHOOTS/ EVENTS
              </div>
              <div onClick={() => goTo("/about-us")}>ABOUT US</div>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.followUs}>Follow us on</div>
            <div className={styles.socialMedia}>
              <Image
                src="/homepage/facebookLogo.svg"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/cocoonluxuryproperties/"
                  )
                }
              />
              <Image
                src="/homepage/youtubeLogo.svg"
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/channel/UCxprkxhJ9FodghRyyXUfPdw"
                  )
                }
              />
              <Image
                src="/homepage/linkedInLogo.svg"
                onClick={() =>
                  window.open(
                    "https://au.linkedin.com/company/cocoon-luxury-properties"
                  )
                }
              />
              <Image
                src="/homepage/twitterLogo.svg"
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/cocoonluxuryproperties/"
                  )
                }
              />
            </div>
          </div>
        </div>
      </DrawerAnt>
    </div>
  );
};

export default Drawer;
