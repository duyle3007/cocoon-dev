import { Dropdown, Input } from "antd";
import { useRouter } from "next/router";

import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "../Image/Image";

const DESTINATION_LIST = [
  {
    key: "1",
    label: <Link href="/search?destination=all">All destinations</Link>,
  },
  {
    key: "2",
    label: "Australia",
    children: [
      {
        key: "2-1",
        label: "North Queensland (65)",
        children: [
          {
            key: "2-1-1",
            label: "Manly (12)",
          },
          {
            key: "2-1-2",
            label: "Vaucluse (13)",
          },
          {
            key: "2-1-3",
            label: "Point Piper (4)",
          },
        ],
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
    label: <Link href="/search?destination=france">France</Link>,
  },
  {
    key: "4",
    label: <Link href="/search?destination=egypt">Egypt</Link>,
  },
];

const AUSTRALIA_LIST = [
  {
    key: "1",
    label: <Link href="/search?villaType=private">Private Villas</Link>,
  },
  {
    key: "2",
    label: <Link href="/search?villaType=luxury">Luxury Lodges</Link>,
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
          <Dropdown
            menu={{ items: AUSTRALIA_LIST }}
            overlayClassName={styles.dropdownMenu}
          >
            <div className={styles.dropdown}>
              AUSTRALIA
              <img src="/downArrow.svg" />
            </div>
          </Dropdown>
          <Dropdown
            menu={{ items: DESTINATION_LIST }}
            overlayClassName={styles.dropdownMenu}
          >
            <div className={styles.dropdown}>
              DESTINATION
              <img src="/downArrow.svg" />
            </div>
          </Dropdown>
          <Link
            href="/search#photoshoots"
            className={
              router.asPath === "/search#photoshoots"
                ? styles.activeBlack
                : styles.nonActive
            }
          >
            <span>PHOTOSHOOTS/ EVENTS</span>
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
          />
          <Link href="/enquiry">
            <span
              className={`${styles.bookBtn} ${
                !isHomepage && styles.bookBtnBlack
              }`}
            >
              SEND INQUIRE
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
