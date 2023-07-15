import Header from "@/components/Header/Header";
import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { notification } from "antd";
import { useRouter } from "next/router";

import Footer from "../Footer/Footer";

import styles from "./Layout.module.scss";

export const PropertyListContext = createContext();

const Layout = ({ children }) => {
  const router = useRouter();

  const [propertyList, setPropertyList] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [allLocation, setAllLocation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
        setAllLocation(allLocation);
      } catch (err) {
        console.log("Fetch list data", err);
        notification.error({
          message: "Something went wrong while trying to get list properties",
        });
      }
    };
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
        <Header />
        <div className={styles.bodyWrapper}>{children}</div>
        {isShowFooter && <Footer />}
      </div>
    </PropertyListContext.Provider>
  );
};

export default Layout;
