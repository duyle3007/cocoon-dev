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
import CocoonInstagram from "./CocoonInstagram/CocoonInstagram";

const data = [
  "https://e0.pxfuel.com/wallpapers/142/699/desktop-wallpaper-maldives-resort-in-high-resolution-for-get-island-resort.jpg",
  ,
  "https://i.pinimg.com/originals/cd/40/bc/cd40bcf0a42a320ff97cc3314a24dd7d.jpg",
];

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.videoWrapper}>
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
      </div>

      <div className={styles.banner}>
        <div className={styles.leftBanner}>
          <div className={styles.headerTitle}>COCOON LUXURY PROPERTIES</div>
          <div className={styles.headerSub}>
            Luxury Holidays homes and Locations Specialist.
          </div>
        </div>
      </div>
      <SearchBanner />

      <Headline />
      <Slideshow data={data} className={styles.slideShow} />

      <Holiday />
      <Photoshoot />
      <Event />
      <Service />
      <SayAboutUs />
      <Intro />
      <CocoonInstagram />
    </div>
  );
};

export default HomePage;
