import { Tabs } from "antd";

import DetailTab from "./DetailTab/DetailTab";
import AmenityTab from "./AmenityTab/AmenityTab";

import styles from "./MainTab.module.scss";

const MainTab = ({ info }) => {
  return (
    <div className={styles.mainTab}>
      <Tabs
        className={styles.tabBar}
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: `DETAILS`,
            children: <DetailTab info={info} />,
          },
          {
            key: "2",
            label: `AMENITIES`,
            children: <AmenityTab info={info} />,
          },
          {
            key: "3",
            label: `VIDEO`,
            children: `Content of Tab Pane 3`,
          },
          {
            key: "4",
            label: `MAP`,
            children: `Content of Tab Pane 3`,
          },
          {
            key: "5",
            label: `REVIEW`,
            children: `Content of Tab Pane 3`,
          },
        ]}
      />
    </div>
  );
};

export default MainTab;
