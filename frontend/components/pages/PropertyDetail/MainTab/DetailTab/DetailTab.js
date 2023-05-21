import ReactDomServer from "react-dom/server";
import { useContext } from "react";

import { PropertyListContext } from "@/components/Layout/Layout";

import styles from "./DetailTab.module.scss";

const DetailTab = ({ info }) => {
  const { mediaList } = useContext(PropertyListContext);

  const bedRoomConfiguration = () => (
    <div className={styles.bedroomConfigure}>
      {info.acf.bedroom_list?.map((bedRoom) => (
        <div className={styles.bed} key={bedRoom.name}>
          <img
            src={
              mediaList.find((media) => media.id === bedRoom.icon)?.source_url
            }
            className={styles.singleBed}
          />
          <div className={styles.subTitle}>{bedRoom.name}</div>
          <span>{bedRoom.info}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={styles.detailTab}
      dangerouslySetInnerHTML={{
        __html: info.acf.details.replace(
          "[bedroom_list]",
          ReactDomServer.renderToString(bedRoomConfiguration())
        ),
      }}
    />
  );
};

export default DetailTab;
