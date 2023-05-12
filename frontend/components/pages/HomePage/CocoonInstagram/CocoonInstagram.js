const INSTAGRAM_URL = "https://www.instagram.com/cocoonluxuryproperties/";

import Image from "@/components/Image/Image";
import { InstagramOutlined } from "@ant-design/icons";

import styles from "./CocoonInstagram.module.scss";

const INSTA_LIST = [
  {
    imgUrl:
      "https://i.ibb.co/fqgf4g2/z4322407638875-d306f5a9940fde805a2f0e07af74a0bb.jpg",
    link: "https://www.instagram.com/p/Crnwng-LmIG/",
  },
  {
    imgUrl:
      "https://i.ibb.co/LPG13L5/z4322413498100-6cb879a08461ce641191040ff82e368c.jpg",
    link: "https://www.instagram.com/p/Crj-5DCuyNR/",
  },
  {
    imgUrl:
      "https://i.ibb.co/5TdskyS/z4322414338274-dc0078818e7b0503b98acb92980d096f.jpg",
    link: "https://www.instagram.com/p/CqZvkTugnNM/",
  },
  {
    imgUrl:
      "https://i.ibb.co/whKQnz4/z4322415139054-db383e0784c0c7ba7f6d61a5d164511e.jpg",
    link: "https://www.instagram.com/p/CmSb0u9BuQW/",
  },
];
const InstaCard = ({ property }) => {
  return (
    <a href={property.link}>
      <div className={styles.instaCard}>
        <img src={property.imgUrl} />
        <div className={styles.instaIcon}>
          <InstagramOutlined />
        </div>
      </div>
    </a>
  );
};
const CocoonInstagram = () => {
  return (
    <div className={styles.cocoonInstagram}>
      <div className={styles.title}>@COCOONLUXURYPROPERTIES</div>
      <div className={styles.sub}>
        <span>Specializes in short term luxury vacation rental homes</span>
        <a href="https://www.instagram.com/cocoonluxuryproperties/">
          <div className={styles.followInsta}>
            FOLLOW INSTAGRAM
            <Image src="/rightArrow.png" />
          </div>
        </a>
      </div>
      <div className={styles.listImage}>
        {INSTA_LIST.map((property) => (
          <InstaCard property={property} />
        ))}
      </div>
    </div>
  );
};

export default CocoonInstagram;
