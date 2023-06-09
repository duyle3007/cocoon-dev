import { useEffect, forwardRef, useImperativeHandle } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import { useMap } from "react-leaflet";
import { useRouter } from "next/router";

import styles from "./MarkerCluster.module.scss";

// eslint-disable-next-line react/display-name
const MarkerCluster = forwardRef(({ listLocation }, ref) => {
  const map = useMap();
  const router = useRouter();

  useEffect(() => {
    if (!map) return;
    const markerClusterGroup = L.markerClusterGroup();
    const leafletMarkers = listLocation.map(
      ({
        title: { rendered: name },
        slug,
        acf: {
          description,
          starting_price,
          no_of_bedrooms,
          no_of_bathrooms,
          min_of_nights,
          location1,
          discount,
          lat,
          long,
        },
        images,
      }) => {
        const customMarker = new L.DivIcon({
          className: "custom-marker-wrapper",
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          html: `<div class=${styles.customMarkerContent}>
          <img src="/map/marker.svg"/>
          AU$${starting_price}
          </div>`,
        });
        const marker = L.marker([lat, long], { icon: customMarker });

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
            router.push(`/properties/${slug}`);
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
          <img src=${images[0].src} class=${styles.locationImage} />
          <div class=${styles.locationContent}>
            <h5 class=${styles.name}>${name}</h5>
            <div class=${styles.infoWrapper}>
              <div class=${styles.info}>
                <img src="/homepage/discoverIcon.svg" />
                <span>${location1}</span>
              </div>
              <div class=${styles.info}>
                <img src="/map/bedIcon.svg" />
                ${no_of_bedrooms || 0} bedrooms
              </div>
            </div>
            <div class=${styles.infoWrapper}>
              <div class=${styles.info}>
                <img src="/map/bathIcon.svg" />
                ${no_of_bathrooms || 0} bathrooms
              </div>
              <div class=${styles.info}>
                <img src="/map/peopleIcon.svg" />
                ${min_of_nights || 0} peoples
              </div>
            </div>
           
            <div class=${styles.divider}></div>

            <div class=${styles.priceWrapper}>
              ${
                starting_price
                  ? `<div class=${styles.price}>AU$${starting_price}</div>`
                  : "..."
              }
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
  }, [map, listLocation]);

  useImperativeHandle(ref, () => ({
    flyTo: goTo,
  }));

  const goTo = (location, zoomLevel = 13) => {
    map.flyTo(location, zoomLevel);
  };

  return null;
});

export default MarkerCluster;
