import * as NextImage from "next/image";

import styles from "./Image.module.scss";

const Image = ({ src, className, style, onClick }) => {
  return (
    <div
      className={`${styles.imageContainer} ${className && className}`}
      style={style}
      onClick={onClick}
    >
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
