import SearchBanner from "@/components/SearchBanner/SearchBanner";
import Header from "../../Header/Header";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <Header />
      <video
        autoPlay
        muted
        loop
        className={styles.youtubeEmbed}
        poster={"/placeholder_banner.png"}
      >
        <source
          src="https://drive.google.com/uc?id=1w5xZgy1RW6rGWSIT5Y64A8WU5oUdcVIc&export=download"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className={styles.banner}>
        <div className={styles.leftBanner}>
          <div className={styles.headerTitle}>COCOON LUXURY</div>
          <div className={styles.headerSub}>Accommodation Specialist</div>
        </div>

        <SearchBanner />
      </div>
    </div>
  );
};

export default HomePage;
