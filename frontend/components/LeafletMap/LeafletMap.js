import dynamic from "next/dynamic";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
const { MapContainer, Marker, Popup, TileLayer } = dynamic(
  () => import("react-leaflet"),
  { ssr: false }
);
const LeafletMap = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
