import { Dropdown } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./Header.module.scss";
import Link from "next/link";

const DESTINATION_LIST = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        All destinations
      </a>
    ),
  },
  {
    key: "2",
    label: "Australia",
    children: [
      {
        key: "2-1",
        label: "Lower North Shore",
      },
      {
        key: "2-2",
        label: "Central Sydney",
      },
      {
        key: "2-3",
        label: "Eastern Suburbs",
      },
      {
        key: "2-4",
        label: "Eastern Suburbs Beach",
      },
      {
        key: "2-5",
        label: "Bryon Bay",
      },
      {
        key: "2-6",
        label: "Hunter Valley",
      },
      {
        key: "2-7",
        label: "Gold Coast",
      },
      {
        key: "2-8",
        label: "Noosa",
      },
    ],
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        France
      </a>
    ),
  },
  {
    key: "4",
    label: "Egypt",
  },
];

const serviceItems = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Holiday
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Phohrefshoots / Events
      </a>
    ),
  },
];

const Header = () => {
  const router = useRouter();

  const isHomepage = router.asPath === "/";

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
        <div className={styles.headerMenu}>
          <Link
            href="/"
            className={isHomepage ? styles.active : styles.nonActive}
          >
            <span>HOME</span>
          </Link>
          <Link
            href="/about-us"
            className={
              router.asPath === "/about-us"
                ? styles.activeBlack
                : styles.nonActive
            }
          >
            <span>ABOUT US</span>
          </Link>
          <Dropdown
            menu={{ items: DESTINATION_LIST }}
            overlayClassName={styles.dropdownMenu}
          >
            <div className={styles.dropdown}>
              DESTINATION
              <img src="/downArrow.svg" />
            </div>
          </Dropdown>
          <Dropdown
            menu={{ items: serviceItems }}
            overlayClassName={styles.dropdownMenu}
          >
            <div className={styles.dropdown}>
              SERVICE
              <img src="/downArrow.svg" />
            </div>
          </Dropdown>
          <Link
            href="/contact-us"
            className={
              router.asPath === "/contact-us"
                ? styles.activeBlack
                : styles.nonActive
            }
          >
            <span>CONTACT US</span>
          </Link>
        </div>

        <div className={styles.contactInfo}>
          <img src="/phoneIcon.svg" />
          <img src="/emailIcon.svg" />
          <span>BOOK NOW</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
