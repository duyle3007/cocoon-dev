import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useRef } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import MarkerCluster from "./MarketCluster";
import SearchControl from "./SearchControl";

import styles from "./LeafletMap.module.scss";

const addressPoints = [
  {
    lat: -37.8839,
    lng: 175.3745188667,
    name: "Paris",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
    destinationUrl: "",
  },
  {
    lat: -37.8869090667,
    lng: 175.3657417333,
    name: "London",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
  },
  {
    lat: -37.8894207167,
    lng: 175.4015351167,
    name: "Madagascar",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
  },
  {
    lat: -37.8927369333,
    lng: 175.4087452333,
    name: "Vietnam",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
  },
  {
    lat: -37.90585105,
    lng: 175.4453463833,
    name: "NamSourth",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
  },
  {
    lat: -37.9064188833,
    lng: 175.4441556833,
    name: "Chicago",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
  },
  {
    lat: -37.90584715,
    lng: 175.4463564333,
    name: "United",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
  },
  {
    lat: -37.9033391333,
    lng: 175.4244005667,
    name: "China",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
  },
  {
    lat: -37.9061991333,
    lng: 175.4492620333,
    name: "Beach Valley",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
  },
  {
    lat: -37.9058955167,
    lng: 175.4445613167,
    name: "Sillicon Valley",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
  },
  {
    lat: -37.88888045,
    lng: 175.39146475,
    name: "Summer Beach",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
  },
];

// Fix for the missing icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/map/marker-icon-2x.png",
  iconUrl: "/map/marker-icon.png",
  shadowUrl: "/map/marker-shadow.png",
});

const LeafletMap = () => {
  const mapRef = useRef();
  const [listLocation, setListLocation] = useState(addressPoints);
  const onSearch = ({ target: { value } }) => {
    if (value) {
      const filterLocationList = addressPoints.filter((location) =>
        location.name.toLowerCase().includes(value.toLowerCase())
      );
      setListLocation(filterLocationList);
      filterLocationList.length > 0 &&
        mapRef.current.flyTo([
          filterLocationList[0].lat,
          filterLocationList[0].lng,
        ]);

      return;
    }
    setListLocation(addressPoints);
  };
  return (
    <div className={styles.mapContainer}>
      <div className={styles.searchContainer}>
        <SearchControl onSearch={onSearch} />
        <div className={styles.searchResultList}>
          {listLocation.map((location, index) => {
            return (
              <div className={styles.locationCard} key={index}>
                <img src={location.url} className={styles.locationImage} />
                <div className={styles.locationContent}>
                  <div>{location.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <MapContainer
        center={
          listLocation.length > 0 && [listLocation[0].lat, listLocation[0].lng]
        }
        zoom={13}
        touchZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerCluster ref={mapRef} markers={listLocation} />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
