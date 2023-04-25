import { useEffect, forwardRef } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import { useMap } from "react-leaflet";
import { useImperativeHandle } from "react/cjs/react.development";

import styles from "./MarkerCluster.module.scss";

// eslint-disable-next-line react/display-name
const MarkerCluster = forwardRef(({ markers }, ref) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const markerClusterGroup = L.markerClusterGroup();
    const leafletMarkers = markers.map(({ lat, lng, name, url }) => {
      const customMarker = new L.DivIcon({
        className: "custom-marker-wrapper",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        html: `<div class=${styles.customMarkerContent}>
          <img src="/map/marker.svg"/>
          AU$3500
          </div>`,
      });
      const marker = L.marker([lat, lng], { icon: customMarker });

      marker.on("click", function () {
        const customMarkers = document.querySelectorAll(
          ".custom-marker-wrapper"
        );

        customMarkers.forEach((customMarker) => {
          if (customMarker !== this.getElement()) {
            const firstChild = customMarker.firstElementChild;
            firstChild.classList.remove(styles.activeMarker);
          }
        });

        const currChild = this.getElement().querySelector(":first-child");
        currChild.classList.add(styles.activeMarker);
      });

      if (name) {
        const popupContent = `<div class=${styles.markerPopup}>
        <img src=${url} class=${styles.locationImage} />
        <div class=${styles.locationContent}>
          <div>${name}</div>
          <div class=${styles.info}>
            
          </div>
        </div>
      </div>`;
        const customPopup = L.popup({
          maxWidth: "auto",
          minWidth: 100,
          closeButton: false,
          className: styles.markerPopupWrapper,
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
