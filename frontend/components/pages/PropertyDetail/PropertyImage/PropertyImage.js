import { useRef } from "react";
import { Image } from "antd";
import Slideshow from "../../HomePage/Slideshow/Slideshow";

import styles from "./PropertyImage.module.scss";
import { isMobile } from "@/utils/utils";

const PropertyImage = ({ listImage = [] }) => {
  const slideshowRef = useRef();
  return (
    <>
      <div className={styles.propertyImage}>
        <Slideshow
          ref={slideshowRef}
          data={listImage.map((image) => image.src)}
          className={styles.slider}
          cardMode
          dots={true}
        />
        <div className={styles.smallImageWrapper}>
          {isMobile()
            ? listImage
                .slice(0, 3)
                .map((image, index) => (
                  <Image
                    key={index}
                    src={image.src}
                    className={styles.imageSmall}
                    preview={false}
                    onClick={() => slideshowRef.current.goTo(index)}
                  />
                ))
            : listImage
                .slice(0, 5)
                .map((image, index) => (
                  <Image
                    key={index}
                    src={image.src}
                    className={styles.imageSmall}
                    preview={false}
                    onClick={() => slideshowRef.current.goTo(index)}
                  />
                ))}
        </div>
      </div>
    </>
  );
};

export default PropertyImage;
