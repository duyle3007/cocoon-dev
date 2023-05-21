import styles from "./MapCard.module.scss";

const MapCard = ({ location, onClick }) => {
  return (
    <div
      className={styles.locationCard}
      onClick={() => onClick(location.lat, location.lng)}
    >
      <img src="/map/marker.svg" />
      <div className={styles.locationContent}>
        <div>{location.name}</div>
        <div className={styles.priceWrapper}>
          <div className={styles.price}>AU${location.price}</div>
          {location?.oldPrice && (
            <div className={styles.discountPrice}>AU${location.oldPrice}</div>
          )}
          <span> /NIGHT</span>
        </div>
      </div>
    </div>
  );
};

export default MapCard;
