import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

import styles from "./MapTab.module.scss";

// Fix for the missing icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/map/marker-icon-2x.png",
  iconUrl: "/map/marker-icon.png",
  shadowUrl: "/map/marker-shadow.png",
});

const MapTab = ({ info }) => {
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
        <Marker position={[-37.8839, 175.3745188667]}></Marker>
      </MapContainer>
    </div>
  );
};

export default MapTab;
