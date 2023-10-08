import { useContext} from "react";
import { InstagramOutlined } from "@ant-design/icons";
import { PropertyListContext } from "@/components/Layout/Layout";
import Image from "@/components/Image/Image";
import { isMobile } from "@/utils/utils";

import styles from "./CocoonInstagram.module.scss";

const INSTAGRAM_URL = "https://www.instagram.com/cocoonluxuryproperties/";

const InstaCard = ({ property }) => {
  return (
    <a target="_blank" href={property.acf.post_link.url}>
      <div className={styles.instaCard}>
        <img src={property.acf.image} alt={property.title.rendered} />
        <div className={styles.instaIcon}>
          <InstagramOutlined />
        </div>
      </div>
    </a>
  );
};
const CocoonInstagram = () => {
  const { instaPosts } = useContext(PropertyListContext);
  return (
    <div className={styles.cocoonInstagram}>
      <div className={styles.title}>@COCOONLUXURYPROPERTIES</div>
      <div className={styles.sub}>
        <span>Specializes in short term luxury vacation rental homes</span>
        {!isMobile() && (
          <a target="_blank" href={INSTAGRAM_URL}>
            <div className={styles.followInsta}>
              FOLLOW INSTAGRAM
              <Image src="/rightArrow.png" />
            </div>
          </a>
        )}
      </div>
      <div className={styles.listImage}>
        {instaPosts.slice(0, 4).map((property, index) => (
          <InstaCard key={property.id} property={property} />
        ))}
      </div>
      {isMobile() && (
        <a target="_blank" href={INSTAGRAM_URL}>
          <div className={styles.followInsta}>
            FOLLOW INSTAGRAM
            <Image src="/rightArrow.png" />
          </div>
        </a>
      )}
    </div>
  );
};

export default CocoonInstagram;
