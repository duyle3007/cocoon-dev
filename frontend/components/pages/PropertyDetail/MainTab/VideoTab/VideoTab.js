import styles from "./VideoTab.module.scss";

const VideoTab = ({ info }) => {
  return (
    <div className={styles.videoTab}>
      {info.videos?.length &&
        info.videos.map((video, index) => (
          <video
            key={index}
            className={styles.videoEmbed}
            controls
            poster={"/placeholder_banner.png"}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
    </div>
  );
};

export default VideoTab;
