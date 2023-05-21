import { CheckOutlined } from "@ant-design/icons";

import styles from "./AmenityTab.module.scss";

const AmenityTab = ({ info }) => {
  return (
    <div className={styles.menityTab}>
      {info.amenities.length &&
        info.amenities.map((amenity, index) => (
          <div className="flex items-center gap-2" key={index}>
            <CheckOutlined />
            {amenity.name}
          </div>
        ))}
    </div>
  );
};

export default AmenityTab;
