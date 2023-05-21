import { Tabs } from "antd";

import DetailTab from "./DetailTab/DetailTab";
import AmenityTab from "./AmenityTab/AmenityTab";
import VideoTab from "./VideoTab/VideoTab";

import styles from "./MainTab.module.scss";
import ReviewTab from "./ReviewTab/ReviewTab";

const TabItems = (info) => {
  if (!info.videos || info.videos.length === 0) {
    return [
      {
        key: "1",
        label: `Details`,
        children: <DetailTab info={info} />,
      },
      {
        key: "2",
        label: `Amenities`,
        children: <AmenityTab info={info} />,
      },
      {
        key: "4",
        label: `Map`,
        children: `Content of Tab Pane 3`,
      },
      {
        key: "5",
        label: `Review`,
        children: <ReviewTab info={info} />,
      },
    ];
  }
  [
    {
      key: "1",
      label: `Details`,
      children: <DetailTab info={info} />,
    },
    {
      key: "2",
      label: `Amenities`,
      children: <AmenityTab info={info} />,
    },
    {
      key: "3",
      label: `Video`,
      children: <VideoTab info={info} />,
    },
    {
      key: "4",
      label: `Map`,
      children: `Content of Tab Pane 3`,
    },
    {
      key: "5",
      label: `Review`,
      children: <ReviewTab info={info} />,
    },
  ];
};
const MainTab = ({ info }) => {
  return (
    <div className={styles.mainTab}>
      <Tabs
        className={styles.tabBar}
        defaultActiveKey="1"
        items={TabItems(info)}
      />
    </div>
  );
};

export default MainTab;
