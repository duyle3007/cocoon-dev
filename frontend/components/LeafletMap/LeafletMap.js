import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import L from "leaflet";
import { Form, Spin } from "antd";
import { useRouter } from "next/router";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import axios from "axios";

import SortModal from "./SortModal/SortModal";
import MarkerCluster from "./MarketCluster";
import SearchControl from "./SearchControl";
import SearchByFilter, { SORT_VALUES } from "./SearchByFilter/SearchByFilter";
import MapControl from "./MapControl/MapControl";
import { isMobile } from "@/utils/utils";
import MapCard from "./MapCard/MapCard";
import FilterModal from "./FilterModal/FilterModal";

import styles from "./LeafletMap.module.scss";

// Fix for the missing icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/map/marker-icon-2x.png",
  iconUrl: "/map/marker-icon.png",
  shadowUrl: "/map/marker-shadow.png",
});

const LeafletMap = ({ mode }) => {
  const router = useRouter();

  const mapRef = useRef();
  const leafletRef = useRef();
  const modalRef = useRef();
  const sortModalRef = useRef();
  const [formRef] = Form.useForm();
  const [listLocation, setListLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState("filter");
  const [tabActive, setTabActive] = useState("holiday");

  useEffect(() => {
    const fetchPropertyList = async () => {
      setLoading(true);
      try {
        const { data: resWp } = await axios.get(
          `https://cocoonluxury.in/wp-json/wp/v2/mphb_room_type?mphb_room_type_category=${
            tabActive === "holiday" ? 12 : 13
          }`
        );
        const { data: resMoto } = await axios.get(
          "https://cocoonluxury.in/wp-json/mphb/v1/accommodation_types",
          {
            auth: {
              username: process.env.NEXT_PUBLIC_MOTOPRESS_USERNAME,
              password: process.env.NEXT_PUBLIC_MOTOPRESS_PASSWORD,
            },
          }
        );
        const res = resWp.map((result) => {
          const findItemInMoto = resMoto.find(
            (otherRes) => otherRes.id === result.id
          );
          if (findItemInMoto) {
            return { ...findItemInMoto, ...result };
          } else {
            return result;
          }
        });
        setListLocation(res);
      } catch (err) {
        console.log("Fetch list data", err);
        notification.error({
          message: "Something went wrong while trying to get list properties",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyList();
  }, [tabActive]);

  console.log("listLocation", listLocation);

  const onSearch = (value) => {
    if (value) {
      const filterLocationList = listLocation.filter((location) =>
        location.title.rendered.toLowerCase().includes(value.toLowerCase())
      );
      setListLocation(filterLocationList);
      if (searchType === "map" && filterLocationList.length > 0) {
        mapRef.current.flyTo([
          filterLocationList[0]?.lat,
          filterLocationList[0]?.lng,
        ]);
      }
      return;
    }
  };

  const navigateTo = (lat, lng) => {
    if (lat && lng) {
      mapRef.current.flyTo([lat, lng], 18);
    }
  };

  const onFinishForm = (formValues) => {
    console.log("Form values", formValues);
    if (formValues.destination) {
      router.query.destination = formValues.destination;
      router.push(router);
    }
    modalRef.current.closeFilterModal();
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={formRef}
        initialValues={{
          selectedLocation: [],
          rangeDate: [],
          rangePrice: [800, 2000],
          maxGuest: 0,
          selectedBedroom: "Any",
          selectedBed: "Any",
          selectedBadroom: "Any",
          feature: [],
          sort: SORT_VALUES[0].value,
        }}
        onFinish={onFinishForm}
      >
        <div className={styles.mapContainer}>
          <SearchControl
            tabActive={tabActive}
            setTabActive={setTabActive}
            onSearch={onSearch}
            listLocation={listLocation}
            searchType={searchType}
            onClick={navigateTo}
            handleReinitClick={() => {
              leafletRef.current?.invalidateSize();
            }}
            mode={mode}
          />

          <FilterModal ref={modalRef} tabActive={tabActive} />
          <SortModal ref={sortModalRef} />
          <div className={styles.right}>
            {searchType === "filter" ? (
              <SearchByFilter listLocation={listLocation} mode={mode} />
            ) : (
              <MapContainer
                center={
                  // listLocation.length > 0
                  //   ? [listLocation[0].lat, listLocation[0].lng]
                  //   : [-37.8839, 175.3745188667]
                  [-37.8839, 175.3745188667]
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
                <MarkerCluster ref={mapRef} listLocation={listLocation} />
              </MapContainer>
            )}
            {mode ? (
              <div className={styles.searchTitle}>
                {mode === "holiday"
                  ? "HOLIDAYS PROPERTIES"
                  : mode === "photoshoot"
                  ? "PHOTOSHOOTS AND EVENTS"
                  : "HOLIDAYS VILLAS IN SYNDNEY"}
                {mode === "photoshoot" && (
                  <div className={styles.note}>
                    <div className={styles.noteItem}>
                      <CheckOutlined /> Only Available for Photoshoots, Filming
                      and TV Production.
                    </div>
                    <div className={styles.noteItem}>
                      <CloseOutlined /> Strictly No Parties are allowed.
                    </div>
                    <div className={styles.noteItem}>
                      <CloseOutlined />
                      No Engagement Parties, No Birthday Parties, No Hens or
                      Bucks Parties.
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <MapControl
                listLocation={listLocation}
                searchType={searchType}
                onChangeSearchType={setSearchType}
                onOpenFilter={() => modalRef.current.openFilterModal()}
                onOpenSort={() => sortModalRef.current.openSortModal()}
              />
            )}
          </div>
          {isMobile() && searchType === "map" && (
            <div className={styles.mapResultMobile}>
              {listLocation.map((location, index) => {
                return (
                  <MapCard
                    key={index}
                    location={location}
                    onClick={navigateTo}
                  />
                );
              })}
            </div>
          )}
        </div>
      </Form>
    </Spin>
  );
};

export default LeafletMap;
