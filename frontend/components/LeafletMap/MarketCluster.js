import { useEffect, forwardRef } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import { useMap } from "react-leaflet";
import { useImperativeHandle } from "react/cjs/react.development";

const MarkerCluster = forwardRef(({ markers }, ref) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const markerClusterGroup = L.markerClusterGroup();
    const leafletMarkers = markers.map(({ lat, lng, name, url }) => {
      const marker = L.marker([lat, lng]);
      if (name) {
        const popupContent = `<div className={rounded}>
        <img src=${url} className={styles.locationImage} />
        <div className={styles.locationContent}>
          <div>${name}</div>
        </div>
      </div>`;
        const customPopup = L.popup({
          maxWidth: "auto",
          minWidth: 100,
          closeButton: true, // Customize this value if you want to show or hide the close button
          className: "custom-popup", // You can set your own custom CSS class here
        }).setContent(popupContent);
        marker.bindPopup(customPopup);
      }
      return marker;
    });

    markerClusterGroup.addLayers(leafletMarkers);
    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, markers]);

  useImperativeHandle(ref, () => ({
    flyTo: goTo,
  }));

  const goTo = (location) => {
    map.flyTo(location, 13);
  };

  return null;
});

export default MarkerCluster;
