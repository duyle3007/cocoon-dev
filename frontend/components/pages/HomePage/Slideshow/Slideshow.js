import { Carousel } from "antd";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import styles from "./Slideshow.module.scss";

// eslint-disable-next-line react/display-name
const Slideshow = forwardRef(
  ({ data, className, cardMode = false, dots = false, ...props }, ref) => {
    const carouselRef = useRef();

    useImperativeHandle(ref, () => ({
      goTo: (slideNumber) => {
        carouselRef.current.goTo(slideNumber);
      },
    }));
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
        {/* {data.length > 1 && (
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
        )} */}
      </div>
    );
  }
);

export default Slideshow;
