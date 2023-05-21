import ReactPlayer from "react-player";

import styles from "./VideoTab.module.scss";

const VideoTab = ({ info }) => {
  return (
    <div className={styles.videoTab}>
      {info.videos?.length &&
        info.videos.map((video, index) => (
          <ReactPlayer
            key={index}
            url={video}
            controls={true}
            className={styles.videoEmbed}
          />
        ))}
    </div>
  );
};

export default VideoTab;
