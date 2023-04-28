import { Carousel } from "antd";
import { useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import styles from "./Slideshow.module.scss";

const Slideshow = ({
  data,
  className,
  cardMode = false,
  dots = false,
  ...props
}) => {
  const carouselRef = useRef();

  const onNextSlide = () => {
    carouselRef.current.next();
  };

  const onPrevSlide = () => {
    carouselRef.current.prev();
  };

  return (
    <div className={`${styles.slideShowContainer} ${className && className}`}>
      <Carousel
        ref={carouselRef}
        effect="fade"
        className={styles.slideShow}
        dots={dots}
      >
        {data.map((image, index) => (
          <img src={image} key={index} />
        ))}
      </Carousel>
      {data.length > 1 && (
        <>
          <div
            className={cardMode ? styles.leftArrowCard : styles.leftArrow}
            onClick={onPrevSlide}
          >
            <LeftOutlined />
          </div>
          <div
            className={cardMode ? styles.rightArrowCard : styles.rightArrow}
            onClick={onNextSlide}
          >
            <RightOutlined />
          </div>
        </>
      )}
    </div>
  );
};

export default Slideshow;
