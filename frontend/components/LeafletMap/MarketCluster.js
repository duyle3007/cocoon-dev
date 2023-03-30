import { useEffect } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import { useMap } from "react-leaflet";

const MarkerCluster = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const markerClusterGroup = L.markerClusterGroup();
    const leafletMarkers = markers.map(({ lat, lng, name }) => {
      const marker = L.marker([lat, lng]);
      if (name) marker.bindPopup(name);
      return marker;
    });

    markerClusterGroup.addLayers(leafletMarkers);
    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, markers]);

  return null;
};

export default MarkerCluster;
