import { Dropdown, Input } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

import Image from "../Image/Image";
import { isMobile } from "@/utils/utils";
import Drawer from "./Drawer/Drawer";

import styles from "./Header.module.scss";

export const DESTINATION_LIST = [
  {
    key: "1",
    label: <Link href="/search?destination=all">All destinations</Link>,
    url: "/search?destination=all",
  },
  {
    key: "2",
    label: "Australia",
    children: [
      {
        key: "2-1",
        label: "North Queensland",
        children: [
          {
            key: "2-1-1",
            label: "Manly ",
            url: "/search?destination=manly",
          },
          {
            key: "2-1-2",
            label: "Vaucluse ",
            url: "/search?destination=vaucluse",
          },
          {
            key: "2-1-3",
            label: "Point Piper ",
            url: "/search?destination=point-piper",
          },
        ],
      },
      {
        key: "2-2",
        label: "Bryon Bay",
        url: "/search?destination=bryon-bay",
      },
      {
        key: "2-3",
        label: "Victoria",
        url: "/search?destination=victoria",
      },
      {
        key: "2-4",
        label: "Sydney with beaches",
        url: "/search?destination=sydney-beaches",
      },
      {
        key: "2-5",
        label: "Sydney",
        children: [
          {
            key: "2-5-1",
            label: "Manly ",
            url: "/search?destination=manly",
          },
          {
            key: "2-5-2",
            label: "Vaucluse ",
            url: "/search?destination=vaucluse",
          },
          {
            key: "2-5-3",
            label: "Point Piper ",
            url: "/search?destination=point-piper",
          },
          {
            key: "2-5-4",
            label: "Mosman ",
            url: "/search?destination=mosman",
          },
          {
            key: "2-5-5",
            label: "Bronte ",
            url: "/search?destination=bronte",
          },
          {
            key: "2-5-6",
            label: "Balmoral Beach ",
            url: "/search?destination=balmoral-beach",
          },
          {
            key: "2-5-7",
            label: "Bellevue Hill ",
            url: "/search?destination=bellevue-hill",
          },
          {
            key: "2-5-8",
            label: "Bondi Beach ",
            url: "/search?destination=bondi-beach",
          },
          {
            key: "2-5-9",
            label: "Coogee ",
            url: "/search?destination=coogee",
          },
          {
            key: "2-5-10",
            label: "Darling Point ",
            url: "/search?destination=darling-point",
          },
          {
            key: "2-5-11",
            label: "Darlinghurst ",
            url: "/search?destination=darlinghurst",
          },
          {
            key: "2-5-12",
            label: "Double Bay ",
            url: "/search?destination=double-bay",
          },
          {
            key: "2-5-13",
            label: "Rose Bay ",
            url: "/search?destination=rose-bay",
          },
          {
            key: "2-5-14",
            label: "Tamarama ",
            url: "/search?destination=tamarama",
          },
          {
            key: "2-5-15",
            label: "Potts Point ",
            url: "/search?destination=potts-point",
          },
          {
            key: "2-5-16",
            label: "Gordon Bay ",
            url: "/search?destination=gordon-bay",
          },
          {
            key: "2-5-17",
            label: "Woollahra ",
            url: "/search?destination=woollahra",
          },
          {
            key: "2-5-18",
            label: "Watsons Bay ",
            url: "/search?destination=watsons-bay",
          },
          {
            key: "2-5-19",
            label: "Balgowlah Heights ",
            url: "/search?destination=balgowlah-heights",
          },
          {
            key: "2-5-20",
            label: "Kensington ",
            url: "/search?destination=kensington",
          },
        ],
      },
      {
        key: "2-6",
        label: "Port Stephens",
        url: "/search?destination=port-stephens",
      },
      {
        key: "2-7",
        label: "Gold Coast",
        url: "/search?destination=gold-coast",
      },
      {
        key: "2-8",
        label: "Noosa",
        url: "/search?destination=noosa",
      },
      {
        key: "2-9",
        label: "Melbource",
        url: "/search?destination=melbource",
      },
      {
        key: "2-10",
        label: "Southern NSW Coast & Highlands",
        url: "/search?destination=southern-nsw",
      },
    ],
  },
  {
    key: "3",
    label: <Link href="/search?country=new-zealand">NEW ZEALAND</Link>,
  },
  {
    key: "5",
    label: <Link href="/search?country=thailand">THAILAND</Link>,
  },
  {
    key: "6",
    label: <Link href="/search?country=france">France</Link>,
  },
  {
    key: "7",
    label: <Link href="/search?country=italy">ITALY</Link>,
  },
  {
    key: "8",
    label: <Link href="/search?country=greece">GREECE</Link>,
  },
];

export const AUSTRALIA_LIST = [
  {
    key: "1",
    label: (
      <Link href="/search?country=australia&villaType=private">
        Private Villas
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link href="/search?country=australia&villaType=luxury">
        Luxury Lodges
      </Link>
    ),
  },
];

const Header = () => {
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
            menu={{ items: DESTINATION_LIST }}
            overlayClassName={styles.dropdownMenu}
          >
            <div className={styles.dropdown}>
              DESTINATION
              <Image src="/downArrow.svg" />
            </div>
          </Dropdown>
          <Link
            href="/photoshoots"
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
              router.push(`/search?searchValue=${e.target.value}`)
            }
          />
          <Link href="/holiday-sydney">
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
