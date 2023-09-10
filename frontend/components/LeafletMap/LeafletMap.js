import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useRef, useEffect, useCallback } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import L from "leaflet";
import { Form, Spin, notification } from "antd";
import { useRouter } from "next/router";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import axios from "axios";
import dayjs from "dayjs";

import SortModal from "./SortModal/SortModal";
import MarkerCluster from "./MarketCluster";
import SearchControl from "./SearchControl";
import SearchByFilter, { SORT_VALUES } from "./SearchByFilter/SearchByFilter";
import MapControl from "./MapControl/MapControl";
import { isMobile, debounce } from "@/utils/utils";
import MapCard from "./MapCard/MapCard";
import FilterModal from "./FilterModal/FilterModal";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { motopressAPIUrl, motopressUsername, motopressPassword } =
  publicRuntimeConfig;

import styles from "./LeafletMap.module.scss";

// Fix for the missing icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/map/marker-icon-2x.png",
  iconUrl: "/map/marker-icon.png",
  shadowUrl: "/map/marker-shadow.png",
});

export const DEFAULT_ZOOM_LEVEL = 14;

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

  const fetchPropertyList = async (fieldValues = {}) => {
    const {
      searchValue = null,
      villaType,
      rangeDate,
      selectedBedroom,
      selectedBed,
      selectedBadroom,
      rangePrice,
      maxGuest,
      feature,
      country,
      location1,
      location2,
      sort,
      tags,
    } = fieldValues;
    const params = {
      searchStr: searchValue?.length ? searchValue : null,
      villaType: villaType,
      noOfBedrooms: selectedBedroom !== "Any" ? selectedBedroom : null,
      beds: selectedBed !== "Any" ? selectedBed : null,
      noOfBathrooms: selectedBadroom !== "Any" ? selectedBadroom : null,
      guests: maxGuest,
      features: feature?.length > 0 ? feature?.join(",") : null,
      priceStart: rangePrice?.length > 0 ? rangePrice[0] : undefined,
      priceEnd: rangePrice?.length > 0 ? rangePrice[1] : undefined,
      mphb_room_type_category: tabActive === "holiday" ? 12 : 13,
      orderBy: sort ? sort.split(":")[0] : undefined,
      order: sort ? sort.split(":")[1] : undefined,
      country,
      location1,
      location2,
      startDate:
        rangeDate.length > 0 && rangeDate[0]
          ? dayjs(rangeDate[0]).format("YYYY-MM-DD")
          : null,
      endDate:
        rangeDate.length > 0 && rangeDate[1]
          ? dayjs(rangeDate[1]).format("YYYY-MM-DD")
          : null,
      tags: tags.toString(),
    };

    const searchAccommodationType = axios.get("/api/searchAccommodationTypes", {
      params,
    });
    const searchMotoPress = axios.get(
      "https://cocoonluxury.in/wp-json/mphb/v1/accommodation_types",
      {
        auth: {
          username: process.env.NEXT_PUBLIC_MOTOPRESS_USERNAME,
          password: process.env.NEXT_PUBLIC_MOTOPRESS_PASSWORD,
        },
      }
    );

    setLoading(true);
    try {
      const [
        {
          data: { data: res },
        },
        { data: resMoto },
      ] = await Promise.all([searchAccommodationType, searchMotoPress]);

      const mergeRes = res.map((result) => {
        const findItemInMoto = resMoto.find(
          (otherRes) => otherRes.id === result.id
        );
        if (findItemInMoto) {
          return { ...findItemInMoto, ...result };
        } else {
          return result;
        }
      });
      setListLocation(mergeRes);
    } catch (err) {
      console.log("Fetch list data", err);
      notification.error({
        message: "Something went wrong while trying to get list properties",
      });
    } finally {
      setLoading(false);
    }
  };

  const debounceFetchData = useCallback(debounce(fetchPropertyList), [
    tabActive,
  ]);

  useEffect(() => {
    formRef.submit();
  }, [tabActive]);

  useEffect(() => {
    const { mode: searchMode } = router.query;
    if (searchMode) {
      setSearchType(searchMode);
    }
  }, [router]);

  const onSearch = (value) => {
    if (value) {
      const filterLocationList = listLocation.filter((location) =>
        location.title.rendered.toLowerCase().includes(value.toLowerCase())
      );
      setListLocation(filterLocationList);
      if (searchType === "map" && filterLocationList.length > 0) {
        mapRef.current.flyTo([
          filterLocationList[0]?.acf.lat,
          filterLocationList[0]?.acf.long,
        ]);
      }
      return;
    }
  };

  const navigateTo = (lat, long) => {
    if (lat && long) {
      leafletRef.current.setView([lat, long], DEFAULT_ZOOM_LEVEL);
    }
  };

  const onFinishForm = (formValues) => {
    if (formValues.destination) {
      router.query.destination = formValues.destination;
      router.push(router);
    }
    debounceFetchData(formValues);
    modalRef.current.closeFilterModal();
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={formRef}
        initialValues={{
          selectedLocation: [],
          rangeDate: [],
          rangePrice: [800, 5000],
          maxGuest: null,
          selectedBedroom: "Any",
          selectedBed: "Any",
          selectedBadroom: "Any",
          feature: [],
          sort: SORT_VALUES[0].value,
          tags: [],
        }}
        onFinish={onFinishForm}
        onValuesChange={(_, allField) => debounceFetchData(allField)}
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
                  listLocation.length > 0
                    ? [listLocation[0].acf.lat, listLocation[0].acf.long]
                    : [-37.8839, 175.3745188667]
                }
                ref={leafletRef}
                zoom={DEFAULT_ZOOM_LEVEL}
                maxZoom={13}
                touchZoom={isMobile() ? false : true}
                zoomControl={true}
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
