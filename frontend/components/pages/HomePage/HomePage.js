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
        poster="https://cf.bstatic.com/xdata/images/hotel/max1280x900/280376741.jpg?k=5ed6e914c1cb16dd98dec8078680e0cf2b62e71fa4143950045a2a67dfe3958b&o=&hp=1"
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
