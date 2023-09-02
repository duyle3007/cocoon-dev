import * as NextImage from "next/legacy/image";

import styles from "./Image.module.scss";

const Image = ({ src, className, style, onClick, fallback }) => {
  if (!src) {
    return (
      <div
        className={`${styles.imageContainer} ${className && className}`}
        style={style}
        onClick={onClick}
      >
        <NextImage
          src={fallback || "/avatarPlaceholder.png"}
          className={`${styles.nextImage} `}
          alt="Picture"
          layout="fill"
          objectFit="cover"
        />
      </div>
    );
  }
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
