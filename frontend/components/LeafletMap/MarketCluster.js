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
      (
        {
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
        },
        locationIndex
      ) => {
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
        let bannerIndex = 0;

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
          const popupContent = document.getElementById("body");

          popupContent.addEventListener("click", function () {
            router.push(`/properties/${slug}`);
          });

          const prevBtn = document.getElementById(`prevBtn${locationIndex}`);
          prevBtn.addEventListener("click", () => {
            if (bannerIndex === 0) {
              bannerIndex = images.length - 1;
            } else {
              bannerIndex = bannerIndex - 1;
            }
            const carousel = document.getElementById(
              `carousel${locationIndex}`
            );
            carousel.style.transform = `translateX(-${bannerIndex * 310}px)`;
          });

          const nextBtn = document.getElementById(`nextBtn${locationIndex}`);
          nextBtn.addEventListener("click", () => {
            if (bannerIndex === images.length - 1) {
              bannerIndex = 0;
            } else {
              bannerIndex = bannerIndex + 1;
            }
            const carousel = document.getElementById(
              `carousel${locationIndex}`
            );
            carousel.style.transform = `translateX(-${bannerIndex * 310}px)`;
          });
        });
        marker.on("popupclose", () => {
          bannerIndex = 0;
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
          <div class=${styles.carouselOverflow}>
            ${
              images.length > 0 &&
              `<div class=${styles.prevBtn}>
              <img class=${
                styles.rightArrow
              } id=${`prevBtn${locationIndex}`} src='/shortLeftArrow.png'>
            </div>`
            }
            ${
              images.length > 0 &&
              `<div class=${styles.nextBtn}>
              <img class=${
                styles.rightArrow
              } id=${`nextBtn${locationIndex}`} src='/shortRightArrow.png'>
            </div>`
            }
            <div id=${`carousel${locationIndex}`} class=${styles.carousel}>
              ${images
                .map(
                  (image) =>
                    `<img src=${image.src} class=${styles.locationImage} />`
                )
                .join("")}
            </div>
          </div>
          <div id="body" class=${styles.locationContent}>
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
