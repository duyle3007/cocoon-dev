import { Carousel } from "antd";
import { useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import styles from "./Slideshow.module.scss";

const data = [
  {
    url: "https://e0.pxfuel.com/wallpapers/142/699/desktop-wallpaper-maldives-resort-in-high-resolution-for-get-island-resort.jpg",
  },
  {
    url: "https://i.pinimg.com/originals/cd/40/bc/cd40bcf0a42a320ff97cc3314a24dd7d.jpg",
  },
];

const Slideshow = () => {
  const carouselRef = useRef();

  const onNextSlide = () => {
    carouselRef.current.next();
  };

  const onPrevSlide = () => {
    carouselRef.current.prev();
  };

  return (
    <div className={styles.slideShowContainer}>
      <Carousel
        ref={carouselRef}
        effect="fade"
        className={styles.slideShow}
        dots={false}
      >
        {data.map((image, index) => (
          <div key={index}>
            <img src={image.url} />
          </div>
        ))}
      </Carousel>
      <LeftOutlined onClick={onPrevSlide} />
      <RightOutlined onClick={onNextSlide} />
    </div>
  );
};

export default Slideshow;
