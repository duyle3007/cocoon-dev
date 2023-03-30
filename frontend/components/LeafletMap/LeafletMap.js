import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerCluster from "./MarketCluster";

const addressPoints = [
  { lat: -37.8839, lng: 175.3745188667, name: "571" },
  { lat: -37.8869090667, lng: 175.3657417333, name: "486" },
  { lat: -37.8894207167, lng: 175.4015351167, name: "807" },
  { lat: -37.8927369333, lng: 175.4087452333, name: "899" },
  { lat: -37.90585105, lng: 175.4453463833, name: "1273" },
  { lat: -37.9064188833, lng: 175.4441556833, name: "1258" },
  { lat: -37.90584715, lng: 175.4463564333, name: "1279" },
  { lat: -37.9033391333, lng: 175.4244005667, name: "1078" },
  { lat: -37.9061991333, lng: 175.4492620333, name: "1309" },
  { lat: -37.9058955167, lng: 175.4445613167, name: "1261" },
  { lat: -37.88888045, lng: 175.39146475, name: "734" },
  { lat: -37.8950811333, lng: 175.41079175, name: "928" },
  { lat: -37.88909235, lng: 175.3922956333, name: "740" },
  { lat: -37.8889259667, lng: 175.3938591667, name: "759" },
  { lat: -37.8876576333, lng: 175.3859563833, name: "687" },
  { lat: -37.89027155, lng: 175.3973178833, name: "778" },
  { lat: -37.8864473667, lng: 175.3806136833, name: "631" },
  { lat: -37.9000262833, lng: 175.4183242167, name: "1012" },
  { lat: -37.90036495, lng: 175.4189457, name: "1024" },
  { lat: -37.9000976833, lng: 175.4197312167, name: "1027" },
  { lat: -37.90239975, lng: 175.42371165, name: "1067" },
  { lat: -37.9043379667, lng: 175.42430325, name: "1080" },
  { lat: -37.9026441, lng: 175.4231055167, name: "1068" },
];

// Fix for the missing icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/map/marker-icon-2x.png",
  iconUrl: "/map/marker-icon.png",
  shadowUrl: "/map/marker-shadow.png",
});

const LeafletMap = () => {
  return (
    <MapContainer
      center={[addressPoints[0].lat, addressPoints[0].lng]}
      zoom={13}
      touchZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerCluster markers={addressPoints} />
    </MapContainer>
  );
};

export default LeafletMap;
