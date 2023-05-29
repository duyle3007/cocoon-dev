import { MapContainer, TileLayer } from "react-leaflet";
import styles from "./MapTab.module.scss";

const MapTab = () => {
  return (
    <div className={styles.mapTab}>
      <MapContainer
        center={[-37.8839, 175.3745188667]}
        zoom={13}
        touchZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default MapTab;
