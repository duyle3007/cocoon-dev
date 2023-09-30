import { Dropdown, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import Image from "../Image/Image";
import { isMobile } from "@/utils/utils";
import Drawer from "./Drawer/Drawer";
import { PropertyListContext } from "../Layout/Layout";

import styles from "./Header.module.scss";

export const AUSTRALIA_LIST = [
  {
    key: "1",
    label: (
      <Link href="/search?country=australia&villaType=private">
        Private Villas
      </Link>
    ),
  },
  // {
  //   key: "2",
  //   label: (
  //     <Link href="/search?country=australia&villaType=luxury">
  //       Luxury Lodges
  //     </Link>
  //   ),
  // },
];

const Header = () => {
  const { allLocation } = useContext(PropertyListContext);

  const router = useRouter();
  const [renderClientSideComponent, setRenderClientSideComponent] =
    useState(false);

  const isHomepage = router.asPath === "/";

  useEffect(() => {
    setRenderClientSideComponent(true);
  }, []);

  if (!renderClientSideComponent) {
    return <></>;
  }
  return (
    <div
      className={`${styles.headerContainer} ${
        !isHomepage && styles.whiteHeader
      }`}
    >
      <div
        className={`${styles.headerContent}  ${
          !isHomepage && styles.whiteContent
        }`}
      >
        <Link href="/">
          <img
            src={isHomepage ? "/logo.svg" : "/blackLogo.svg"}
            className={styles.logo}
          />
        </Link>
        {isMobile() && <Drawer />}
        <div className={styles.headerMenu}>
          <Link
            href="/"
            className={isHomepage ? styles.active : styles.nonActive}
          >
            <span>HOME</span>
          </Link>
          <Dropdown
            menu={{ items: AUSTRALIA_LIST }}
            overlayClassName={styles.dropdownMenu}
          >
            <div className={styles.dropdown}>
              AUSTRALIA
              <Image src="/downArrow.svg" />
            </div>
          </Dropdown>
          <Dropdown
            menu={{ items: allLocation }}
            overlayClassName={styles.dropdownMenu}
          >
            <div className={styles.dropdown}>
              DESTINATION
              <Image src="/downArrow.svg" />
            </div>
          </Dropdown>
          <Link
            href="/search#photoshoots"
            className={
              router.asPath === "/photoshoots"
                ? styles.activeBlack
                : styles.nonActive
            }
          >
            <span>PHOTOSHOOTS / EVENTS</span>
          </Link>
        </div>

        <div className={styles.contactInfo}>
          <Input
            className={`${styles.searchInput} ${
              !isHomepage && styles.searchInputBlack
            }`}
            placeholder="Search"
            bordered={false}
            suffix={
              <Image
                src="/homepage/searchIcon.svg"
                className={styles.searchIcon}
              />
            }
            onPressEnter={(e) =>
              router.push(`/search?searchValue=${e.target.value}&mode=map`)
            }
          />
          <MailOutlined onClick={() => router.push("/contact-us")} />
          <Link href="/holiday-sydney">
            <span
              className={`${styles.bookBtn} ${
                !isHomepage && styles.bookBtnBlack
              }`}
            >
              ENQUIRE NOW
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
