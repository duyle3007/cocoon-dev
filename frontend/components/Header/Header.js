import { Dropdown, Input } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import Image from "../Image/Image";
import { isMobile } from "@/utils/utils";
import Drawer from "./Drawer/Drawer";
import { PropertyListContext } from "../Layout/Layout";

import styles from "./Header.module.scss";

export const DESTINATION_LIST = [
  {
    key: "1",
    label: <Link href="/search">All destinations</Link>,
    url: "/search",
    value: "",
  },
  {
    key: "2",
    label: "Australia",
    value: "australia",
    children: [
      {
        key: "2-1",
        label: "North Queensland",
        value: "north-queensland",
        children: [
          {
            key: "2-1-1",
            label: (
              <Link href="/search?location2=australia,north-queensland,manly">
                Manly
              </Link>
            ),
            url: "/search?location2=australia,north-queensland,manly",
            value: "manly",
          },
          {
            key: "2-1-2",
            label: (
              <Link href="/search?location2=australia,north-queensland,vaucluse">
                Vaucluse
              </Link>
            ),
            url: "/search?location2=vaucluse",
            value: "vaucluse",
          },
          {
            key: "2-1-3",
            label: (
              <Link href="/search?location2=australia,north-queensland,point-piper">
                Point Piper
              </Link>
            ),
            url: "/search?location2=point-piper",
            value: "point-piper",
          },
        ],
      },
      {
        key: "2-2",
        label: (
          <Link href="/search?location1=australia,bryon-bay">Bryon Bay</Link>
        ),
        url: "/search?location1=bryon-bay",
        value: "bryon-bay",
      },
      {
        key: "2-3",
        label: (
          <Link href="/search?location1=australia,victoria">Victoria</Link>
        ),
        url: "/search?location1=victoria",
        value: "victoria",
      },
      {
        key: "2-4",
        label: (
          <Link href="/search?location1=australia,sydney-beaches">
            Sydney with beaches
          </Link>
        ),
        url: "/search?location1=australia,sydney-beaches",
        value: "sydney-beaches",
      },
      {
        key: "2-5",
        label: "Sydney",
        value: "sydney",
        children: [
          {
            key: "2-5-1",
            label: (
              <Link href="/search?location2=australia,sydney,manly">Manly</Link>
            ),
            url: "/search?location2=manly",
            value: "manly",
          },
          {
            key: "2-5-2",
            label: (
              <Link href="/search?location2=australia,sydney,vaucluse">
                Vaucluse
              </Link>
            ),
            url: "/search?location2=vaucluse",
            value: "vaucluse",
          },
          {
            key: "2-5-3",
            label: (
              <Link href="/search?location2=australia,sydney,point-piper">
                Point Piper
              </Link>
            ),
            url: "/search?location2=point-piper",
            value: "point-piper",
          },
          {
            key: "2-5-4",
            label: (
              <Link href="/search?location2=australia,sydney,mosman">
                Mosman
              </Link>
            ),
            url: "/search?location2=mosman",
            value: "mosman",
          },
          {
            key: "2-5-5",
            label: (
              <Link href="/search?location2=australia,sydney,bronte">
                Bronte
              </Link>
            ),
            url: "/search?location2=bronte",
            value: "bronte",
          },
          {
            key: "2-5-6",
            label: (
              <Link href="/search?location2=australia,sydney,balmoral-beach">
                Balmoral Beach
              </Link>
            ),
            url: "/search?location2=balmoral-beach",
            value: "balmoral-beach",
          },
          {
            key: "2-5-7",
            label: (
              <Link href="/search?location2=australia,sydney,bellevue-hill">
                Bellevue Hill
              </Link>
            ),
            url: "/search?location2=bellevue-hill",
            value: "bellevue-hill",
          },
          {
            key: "2-5-8",
            label: (
              <Link href="/search?location2=australia,sydney,bondi-beach">
                Bondi Beach
              </Link>
            ),
            url: "/search?location2=bondi-beach",
            value: "bondi-beach",
          },
          {
            key: "2-5-9",
            label: (
              <Link href="/search?location2=australia,sydney,coogee">
                Coogee
              </Link>
            ),
            url: "/search?location2=coogee",
            value: "coogee",
          },
          {
            key: "2-5-10",
            label: (
              <Link href="/search?location2=australia,sydney,darling-point">
                Darling Point
              </Link>
            ),
            url: "/search?location2=darling-point",
            value: "darling-point",
          },
          {
            key: "2-5-11",
            label: (
              <Link href="/search?location2=australia,sydney,darlinghurst">
                Darlinghurst
              </Link>
            ),
            url: "/search?location2=darlinghurst",
            value: "darlinghurst",
          },
          {
            key: "2-5-12",
            label: (
              <Link href="/search?location2=australia,sydney,double-bay">
                Double Bay
              </Link>
            ),
            url: "/search?location2=double-bay",
            value: "double-bay",
          },
          {
            key: "2-5-13",
            label: (
              <Link href="/search?location2=australia,sydney,rose-bay">
                Rose Bay
              </Link>
            ),
            url: "/search?location2=rose-bay",
            value: "rose-bay",
          },
          {
            key: "2-5-14",
            label: (
              <Link href="/search?location2=australia,sydney,tamarama">
                Tamarama
              </Link>
            ),
            url: "/search?location2=tamarama",
            value: "tamarama",
          },
          {
            key: "2-5-15",
            label: (
              <Link href="/search?location2=australia,sydney,potts-point">
                Potts Point
              </Link>
            ),
            url: "/search?location2=potts-point",
            value: "potts-point",
          },
          {
            key: "2-5-16",
            label: (
              <Link href="/search?location2=australia,sydney,gordon-bay">
                Gordon Bay
              </Link>
            ),
            url: "/search?location2=gordon-bay",
            value: "gordon-bay",
          },
          {
            key: "2-5-17",
            label: (
              <Link href="/search?location2=australia,sydney,woollahra">
                Woollahra
              </Link>
            ),
            url: "/search?location2=woollahra",
            value: "woollahra",
          },
          {
            key: "2-5-18",
            label: (
              <Link href="/search?location2=australia,sydney,watsons-bay">
                Watsons Bay
              </Link>
            ),
            url: "/search?location2=watsons-bay",
            value: "watsons-bay",
          },
          {
            key: "2-5-19",
            label: (
              <Link href="/search?location2=australia,sydney,balgowlah-heights">
                Balgowlah Heights
              </Link>
            ),
            url: "/search?location2=australia,sydney,balgowlah-heights",
            value: "balgowlah-heights",
          },
          {
            key: "2-5-20",
            label: (
              <Link href="/search?location2=australia,sydney,kensington">
                Kensington
              </Link>
            ),
            url: "/search?location2=kensington",
            value: "kensington",
          },
        ],
      },
      {
        key: "2-6",
        label: (
          <Link href="/search?location1=australia,port-stephens">
            Port Stephens
          </Link>
        ),
        url: "/search?location1=port-stephens",
        value: "port-stephens",
      },
      {
        key: "2-7",
        label: (
          <Link href="/search?location1=australia,gold-coast">Gold Coast</Link>
        ),
        url: "/search?location1=gold-coast",
        value: "gold-coast",
      },
      {
        key: "2-8",
        label: <Link href="/search?location1=australia,noosa">Noosa</Link>,
        url: "/search?location1=noosa",
        value: "noosa",
      },
      {
        key: "2-9",
        label: (
          <Link href="/search?location1=australia,melbource">Melbource</Link>
        ),
        url: "/search?location1=melbource",
        value: "melbource",
      },
      {
        key: "2-10",
        label: (
          <Link href="/search?location1=australia,southern-nsw">
            Southern NSW Coast & Highlands
          </Link>
        ),
        url: "/search?location1=southern-nsw",
        value: "southern-nsw",
      },
    ],
  },
  {
    key: "3",
    label: <Link href="/search?country=new-zealand">New Zealand</Link>,
    value: "new-zealand",
  },
  {
    key: "5",
    label: <Link href="/search?country=thailand">Thailand</Link>,
    value: "thailand",
  },
  {
    key: "6",
    label: <Link href="/search?country=france">France</Link>,
    value: "france",
  },
  {
    key: "7",
    label: <Link href="/search?country=italy">Italy</Link>,
    value: "italy",
  },
  {
    key: "8",
    label: <Link href="/search?country=greece">Greece</Link>,
    value: "greece",
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

  console.log("allLocation", allLocation);

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
