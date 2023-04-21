import SearchBanner from "@/components/pages/HomePage/SearchBanner/SearchBanner";
import styles from "./HomePage.module.scss";
import Headline from "@/components/pages/HomePage/Headline/Headline";
import Slideshow from "@/components/pages/HomePage/Slideshow/Slideshow";
import Holiday from "@/components/pages/HomePage/Holiday/Holiday";
import Photoshoot from "./Photoshoot/Photoshoot";
import Event from "./Event/Event";
import Service from "./Service/Service";
import SayAboutUs from "./SayAboutUs/SayAboutUs";
import Intro from "./Intro/Intro";

const HomePage = () => {
  return (
    <div className={styles.homepage}>
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

      <Headline />
      <Slideshow />

      <Holiday />
      <Photoshoot />
      <Event />
      <Service />
      <SayAboutUs />
      <Intro />
    </div>
  );
};

export default HomePage;
