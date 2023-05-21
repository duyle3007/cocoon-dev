import Header from "@/components/Header/Header";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";

import Footer from "../Footer/Footer";

import styles from "./Layout.module.scss";

export const PropertyListContext = createContext();

const Layout = ({ children }) => {
  const [propertyList, setPropertyList] = useState([]);
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: resMoto } = await axios.get(
          "https://cocoonluxury.in/wp-json/mphb/v1/accommodation_types",
          {
            auth: {
              username: process.env.NEXT_PUBLIC_MOTOPRESS_USERNAME,
              password: process.env.NEXT_PUBLIC_MOTOPRESS_PASSWORD,
            },
          }
        );
        const { data: resWp } = await axios.get(
          "https://cocoonluxury.in/wp-json/wp/v2/mphb_room_type"
        );
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

  return (
    <PropertyListContext.Provider
      value={{
        propertyList: propertyList,
        mediaList: mediaList,
      }}
    >
      <div className={styles.layout}>
        <Header />
        {children}
        <Footer />
      </div>
    </PropertyListContext.Provider>
  );
};

export default Layout;
