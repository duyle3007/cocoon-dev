import { useEffect, forwardRef } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import { useMap } from "react-leaflet";
import { useImperativeHandle } from "react/cjs/react.development";
import { Divider } from "antd";

import styles from "./MarkerCluster.module.scss";

// eslint-disable-next-line react/display-name
const MarkerCluster = forwardRef(({ markers }, ref) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const markerClusterGroup = L.markerClusterGroup();
    const leafletMarkers = markers.map(
      ({
        lat,
        lng,
        name,
        url,
        location,
        numBedroom,
        numBathroom,
        numPeople,
        price,
        discount,
        description,
      }) => {
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
        marker.on("popupopen", function () {
          const popupContent = document.querySelector(".leaflet-popup-content");

          popupContent.addEventListener("click", function () {
            console.log("Popup clicked");
          });
        });

        if (name) {
          const popupContent = `
        <div class=${styles.markerPopup}>
          ${
            discount
              ? `<div class=${styles.discountWrapper}>
          <img src="/map/camera.svg" />
          OFF ${discount || 0}%
          </div>`
              : ""
          }
          <img src=${url[0]} class=${styles.locationImage} />
          <div class=${styles.locationContent}>
            <h5 class=${styles.name}>${name}</h5>
            <div class=${styles.infoWrapper}>
              <div class=${styles.info}>
                <img src="/homepage/discoverIcon.svg" />
                <span>${location}</span>
              </div>
              <div class=${styles.info}>
                <img src="/map/bedIcon.svg" />
                ${numBedroom || 0} bedrooms
              </div>
            </div>
            <div class=${styles.infoWrapper}>
              <div class=${styles.info}>
                <img src="/map/bathIcon.svg" />
                ${numBathroom || 0} bathrooms
              </div>
              <div class=${styles.info}>
                <img src="/map/peopleIcon.svg" />
                ${numPeople || 0} peoples
              </div>
            </div>
           
            ${
              description
                ? `<div class=${styles.info}>
                ${description}
              </div>`
                : ""
            }

            <div class=${styles.divider}></div>

            <div class=${styles.priceWrapper}>
              ${price ? `<div class=${styles.price}>AU$${price}</div>` : "..."}
              <span> /NIGHT</span>
            </div>
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
      }
    );

    markerClusterGroup.addLayers(leafletMarkers);
    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, markers]);

  useImperativeHandle(ref, () => ({
    flyTo: goTo,
  }));

  const goTo = (location, zoomLevel = 13) => {
    map.flyTo(location, zoomLevel);
  };

  return null;
});

export default MarkerCluster;
