import Header from "@/components/Header/Header";
import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Spin, notification } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

import Footer from "../Footer/Footer";

import styles from "./Layout.module.scss";

export const PropertyListContext = createContext();

const Layout = ({ children }) => {
  const router = useRouter();

  const [propertyList, setPropertyList] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [allLocation, setAllLocation] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const searchMotoPress = axios.get(
        "https://cocoonluxury.in/wp-json/mphb/v1/accommodation_types",
        {
          auth: {
            username: process.env.NEXT_PUBLIC_MOTOPRESS_USERNAME,
            password: process.env.NEXT_PUBLIC_MOTOPRESS_PASSWORD,
          },
        }
      );
      const searchWp = axios.get(
        "https://cocoonluxury.in/wp-json/wp/v2/mphb_room_type"
      );

      const getAllLocation = axios.get("/api/locations");
      try {
        const [
          { data: resWp },
          { data: resMoto },
          {
            data: { data: allLocation },
          },
        ] = await Promise.all([searchWp, searchMotoPress, getAllLocation]);

        const res = resMoto.map((result) => {
          const findItemInWp = resWp.find(
            (otherRes) => otherRes.id === result.id
          );
          if (findItemInWp) {
            return { ...result, ...findItemInWp };
          } else {
            return result;
          }
        });
        setPropertyList(res);

        const formattedLocation = processData(allLocation);
        setAllLocation([
          {
            key: "0",
            label: <Link href="/search">All destinations</Link>,
            url: "/search",
            value: "",
          },
          ...formattedLocation,
        ]);
      } catch (err) {
        console.log("Fetch list data", err);
        notification.error({
          message: "Something went wrong while trying to get list properties",
        });
      } finally {
        setLoading(false);
      }
    };

    let currentKeyIndex = 1;

    function processItem(item, parentPath = "", parentValue = "") {
      const currentKey = currentKeyIndex++;
      const key = parentPath ? `${parentPath}-${currentKey}` : `${currentKey}`;

      const label = item.label;
      const url = generateURL(item, parentValue);

      const formattedItem = {
        key,
        label: url ? <Link href={url}>{label}</Link> : label,
        value: item.slug || "",
        url: url,
      };

      if (item.children && item.children.length > 0) {
        formattedItem.children = item.children.map((child) =>
          processItem(
            child,
            key,
            parentValue ? `${parentValue},${item.slug}` : item.slug
          )
        );
      }

      return formattedItem;
    }

    function generateURL(item, parentValue) {
      if (!parentValue) {
        return `/search?country=${item.slug}` || "";
      } else {
        const locationLevel = (parentValue.match(/,/g) || []).length + 1;
        const locationValue = parentValue
          ? `${parentValue},${item.slug}`
          : item.slug;
        return `/search?location${locationLevel}=${locationValue}`;
      }
    }

    function processData(data) {
      currentKeyIndex = 1;
      return data.map((item) => processItem(item));
    }
    const getMediaList = async () => {
      try {
        const { data: res } = await axios.get(
          "https://cocoonluxury.in/wp-json/wp/v2/media?per_page=100"
        );
        setMediaList(res);
      } catch (err) {
        console.log("Error while getting media list", err);
      }
    };

    fetchData();
    getMediaList();
  }, []);

  const isShowFooter = useMemo(() => {
    if (router.pathname !== "/search") {
      return true;
    }
    return false;
  }, [router]);

  return (
    <PropertyListContext.Provider
      value={{
        propertyList: propertyList,
        mediaList: mediaList,
        allLocation: allLocation,
      }}
    >
      <div className={styles.layout}>
        <Spin spinning={loading}>
          <Header />
          <div className={styles.bodyWrapper}>{children}</div>
          {isShowFooter && <Footer />}
        </Spin>
      </div>
    </PropertyListContext.Provider>
  );
};

export default Layout;
