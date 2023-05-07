import { useRef } from "react";
import { Image } from "antd";
import Slideshow from "../../HomePage/Slideshow/Slideshow";

import styles from "./PropertyImage.module.scss";

const PropertyImage = ({ listImage }) => {
  const slideshowRef = useRef();
  return (
    <>
      <div className={styles.propertyImage}>
        <Slideshow
          ref={slideshowRef}
          data={listImage}
          className={styles.slider}
          cardMode
          dots={true}
        />
        <div className="grid grid-flow-row grid-cols-5 gap-4">
          {listImage.slice(0, 5).map((image, index) => (
            <Image
              src={image}
              className={styles.imageSmall}
              preview={false}
              onClick={() => slideshowRef.current.goTo(index)}
            />
          ))}
        </div>
      </div>
      <div className={styles.placeholder} />
    </>
  );
};

export default PropertyImage;
