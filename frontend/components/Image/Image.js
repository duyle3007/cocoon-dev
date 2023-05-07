import * as NextImage from "next/image";

import styles from "./Image.module.scss";

const Image = ({ src, className }) => {
  return (
    <div className={`${styles.imageContainer} ${className && className}`}>
      <NextImage
        src={src}
        className={`${styles.nextImage} `}
        alt="Picture"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default Image;
