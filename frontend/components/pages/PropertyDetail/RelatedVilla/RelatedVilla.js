import HotelCard from "@/components/HotelCard/HotelCard";
import styles from "./RelatedVilla.module.scss";
import { useContext } from "react";
import { PropertyListContext } from "@/components/Layout/Layout";

const RelatedVilla = ({ info }) => {
  const { propertyList } = useContext(PropertyListContext);

  return (
    <div className={styles.relatedVilla}>
      <div className={styles.title}>
        <h2>RELATED VILLAS</h2>
        <h5>Similar villas you may like</h5>
      </div>
      <div className={styles.villaList}>
        {info.acf.related_villas?.length > 0 &&
          info.acf.related_villas.map((villa, index) => (
            <HotelCard
              key={index}
              item={propertyList.find((property) => property.id === villa)}
              className={styles.hotel}
            />
          ))}
      </div>
    </div>
  );
};

export default RelatedVilla;
