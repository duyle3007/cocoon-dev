import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useRef } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import MarkerCluster from "./MarketCluster";
import SearchControl from "./SearchControl";
import SearchByFilter from "./SearchByFilter/SearchByFilter";
import MapControl from "./MapControl/MapControl";

import styles from "./LeafletMap.module.scss";

const addressPoints = [
  {
    lat: -37.8839,
    lng: 175.3745188667,
    name: "Paris",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
    destinationUrl: "",
    location: "Tangalle, Sri Lanka",
    location: "Tangalle, Sri Lanka",
    numBedroom: 4,
    numBathroom: 5,
    numPeople: 6,
    discount: 10,
    price: 3500,
    oldPrice: 4000,
  },
  {
    lat: -37.8869090667,
    lng: 175.3657417333,
    name: "London",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
    location: "Tangalle, Sri Lanka",
    location: "Tangalle, Sri Lanka",
    numBedroom: 4,
    numBathroom: 5,
    numPeople: 6,
    discount: 10,
    price: 3500,
  },
  {
    lat: -37.8894207167,
    lng: 175.4015351167,
    name: "Madagascar",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
    location: "Tangalle, Sri Lanka",
    location: "Tangalle, Sri Lanka",
    numBedroom: 4,
    numBathroom: 5,
    numPeople: 6,
    discount: 10,
    price: 3500,
  },
  {
    lat: -37.8927369333,
    lng: 175.4087452333,
    name: "Vietnam",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
    location: "Tangalle, Sri Lanka",
    location: "Tangalle, Sri Lanka",
    numBedroom: 4,
    numBathroom: 5,
    numPeople: 6,
    discount: 10,
    price: 3500,
  },
  {
    lat: -37.90585105,
    lng: 175.4453463833,
    name: "NamSourth",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
    location: "Tangalle, Sri Lanka",
    location: "Tangalle, Sri Lanka",
    numBedroom: 4,
    numBathroom: 5,
    numPeople: 6,
    discount: 10,
    price: 3500,
  },
  {
    lat: -37.9064188833,
    lng: 175.4441556833,
    name: "Chicago",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
    location: "Tangalle, Sri Lanka",
    location: "Tangalle, Sri Lanka",
    numBedroom: 4,
    numBathroom: 5,
    numPeople: 6,
    discount: 10,
    price: 3500,
  },
  {
    lat: -37.90584715,
    lng: 175.4463564333,
    name: "United",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
    location: "Tangalle, Sri Lanka",
    location: "Tangalle, Sri Lanka",
    numBedroom: 4,
    numBathroom: 5,
    numPeople: 6,
    discount: 10,
    price: 3500,
  },
  {
    lat: -37.9033391333,
    lng: 175.4244005667,
    name: "China",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
    location: "Tangalle, Sri Lanka",
    location: "Tangalle, Sri Lanka",
    numBedroom: 4,
    numBathroom: 5,
    numPeople: 6,
    discount: 10,
    price: 3500,
  },
  {
    lat: -37.9061991333,
    lng: 175.4492620333,
    name: "Beach Valley",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
    location: "Tangalle, Sri Lanka lasdk dwimdw kcjiwdk",
    numBedroom: 4,
    numBathroom: 5,
    numPeople: 6,
    price: 3500,
  },
  {
    lat: -37.9058955167,
    lng: 175.4445613167,
    name: "Sillicon Valley",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
    location: "Tangalle, Sri Lanka",
    numBedroom: 4,
    numBathroom: 5,
    numPeople: 6,
    discount: 10,
    price: 3500,
  },
  {
    lat: -37.88888045,
    lng: 175.39146475,
    name: "Summer Beach",
    url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/97/bf/7b/oh-pool-cabanas.jpg",
    location: "Tangalle, Sri Lanka",
    numBedroom: 4,
    numBathroom: 5,
    numPeople: 6,
    discount: 10,
    price: 3500,
    description:
      "White Hampton’s style 5 bedroom home with amazing swimming pool and lawn area. Dog friendly villa in Mosman.",
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
  const leafletRef = useRef();
  const [listLocation, setListLocation] = useState(addressPoints);
  const [searchType, setSearchType] = useState("filter");

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

  const navigateTo = (lat, lng) => {
    mapRef.current.flyTo([lat, lng], 18);
  };

  return (
    <div className={styles.mapContainer}>
      <SearchControl
        onSearch={onSearch}
        listLocation={listLocation}
        searchType={searchType}
        onClick={navigateTo}
        handleReinitClick={() => {
          leafletRef.current.invalidateSize();
        }}
      />
      <div className={styles.right}>
        {searchType === "filter" ? (
          <SearchByFilter listLocation={listLocation} />
        ) : (
          <MapContainer
            center={
              listLocation.length > 0 && [
                listLocation[0].lat,
                listLocation[0].lng,
              ]
            }
            ref={leafletRef}
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
        )}

        <MapControl
          searchType={searchType}
          onChangeSearchType={setSearchType}
        />
      </div>
    </div>
  );
};

export default LeafletMap;
