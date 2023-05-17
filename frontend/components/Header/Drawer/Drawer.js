import { MenuOutlined, CloseOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Collapse, Drawer as DrawerAnt, Input } from "antd";
import { useRouter } from "next/router";

import Image from "@/components/Image/Image";
import { DESTINATION_LIST } from "../Header";

import styles from "./Drawer.module.scss";

const { Panel } = Collapse;

const Drawer = () => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [renderCollapseChildren, setRenderCollapseChildren] = useState(null);

  const goBack = () => {};

  const goTo = (url, destination) => {
    if (url) {
      setOpenDrawer(false);
      router.push(url);
      setRenderCollapseChildren(null);
    } else if (destination.children?.length > 0) {
      const destinationChildrenHtml = (
        <div className={styles.collapseList}>
          <div className="flex gap-3">
            <LeftOutlined onClick={() => goBack(destination)} />
            <h4 onClick={(e) => e.preventDefault()}>{destination.label}</h4>
          </div>

          {destination.children.map((child) => (
            <p onClick={() => goTo(child.url, child)}>{child.label}</p>
          ))}
        </div>
      );
      setRenderCollapseChildren(destinationChildrenHtml);
    }
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
          <div className="max-h-[90%] flex flex-col overflow-auto">
            <div className="flex justify-between items-center">
              <Image src="/logo.svg" className={styles.logo} />
              <CloseOutlined onClick={() => setOpenDrawer(false)} />
            </div>
            <Input
              placeholder="Villa name or Location..."
              bordered={false}
              className={styles.searchVilla}
            />
            {renderCollapseChildren ? (
              renderCollapseChildren
            ) : (
              <div className={styles.drawerList}>
                <div onClick={() => goTo("/")}>HOME</div>
                <Collapse ghost accordion expandIcon={() => null}>
                  <Panel header="AUSTRALIA" key="1">
                    <p>PRIVATE VILLAS</p>
                    <p>LUXURY LODGES</p>
                  </Panel>
                  <Panel header="DESTINATION" key="2">
                    {DESTINATION_LIST.map((destination) => (
                      <div className="flex justify-between w-full">
                        <div
                          className="w-full"
                          onClick={() => goTo(destination.url, destination)}
                        >
                          {destination.label}
                        </div>
                        <RightOutlined className={styles.rightArrow} />
                      </div>
                    ))}
                  </Panel>
                </Collapse>
                <div onClick={() => goTo("/photoshoots")}>
                  PHOTOSHOOTS/ EVENTS
                </div>
                <div onClick={() => goTo("/about-us")}>ABOUT US</div>
              </div>
            )}
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
