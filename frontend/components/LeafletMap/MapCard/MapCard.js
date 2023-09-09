import styles from "./MapCard.module.scss";

const MapCard = ({ location, onClick }) => {
  return (
    <div
      className={styles.locationCard}
      onClick={() => onClick(location.acf.lat, location.acf.long)}
    >
      <img src="/map/marker.svg" />
      <div className={styles.locationContent}>
        <div
          dangerouslySetInnerHTML={{
            __html: location?.title?.rendered,
          }}
        />
        <div className={styles.priceWrapper}>
          <div className={styles.price}>AU${location.acf.starting_price}</div>
          {location?.acf.oldPrice && (
            <div className={styles.discountPrice}>
              AU${location.acf.oldPrice}
            </div>
          )}
          <span> /NIGHT</span>
        </div>
      </div>
    </div>
  );
};

export default MapCard;
