import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { Form } from "antd";

import SelectWithPrefix from "@/components/SelectWithPrefix/SelectWithPrefix";
import { isMobile } from "@/utils/utils";
import Image from "@/components/Image/Image";
import { PropertyListContext } from "@/components/Layout/Layout";

import styles from "./MapControl.module.scss";

const MapControl = ({
  searchType,
  onChangeSearchType,
  listLocation,
  onOpenFilter,
  onOpenSort,
}) => {
  const { allLocation } = useContext(PropertyListContext);

  const router = useRouter();
  const formRef = Form.useFormInstance();

  const [destination, setDestination] = useState(null);

  const locationTitle = useMemo(() => {
    if (typeof destination === "string") {
      return destination.charAt(0).toUpperCase() + destination.slice(1);
    }
    if (destination) {
      return destination[destination.length - 1]
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return null;
  });

  useEffect(() => {
    if (router.query.country) {
      setDestination(router.query.country);
      formRef.setFieldsValue({
        country: router.query.country,
        location1: null,
        location2: null,
      });
    } else if (router.query.location1) {
      const levelRouter = router.query.location1.split(",");
      setDestination(levelRouter);
      formRef.setFieldsValue({
        country: null,
        location1: levelRouter[1],
        location2: null,
      });
    } else if (router.query.location2) {
      const levelRouter = router.query.location2.split(",");
      setDestination(levelRouter);
      formRef.setFieldsValue({
        country: null,
        location1: null,
        location2: levelRouter[2],
      });
    } else {
      setDestination([""]);
      formRef.setFieldsValue({
        country: null,
        location1: null,
        location2: null,
      });
    }

    if (!isMobile()) {
      formRef.submit();
    }
  }, [router, isMobile]);

  return (
    <div className={styles.mapControl}>
      <Form.Item name="country" hidden />
      <Form.Item name="location1" hidden />
      <Form.Item name="location2" hidden />
      {isMobile() ? (
        <div className="flex flex-col w-full">
          <div className={styles.searchMobile} onClick={onOpenFilter}>
            <Image src="/searchPage/whiteLocation.svg" className="mr-3" />
            <span>{locationTitle || "Choose  destination"}</span>
            <Image
              src="/searchPage/filterMobile.svg"
              className="right-4"
              style={{ position: "absolute" }}
            />
          </div>
          <div className={styles.underSearchMobile}>
            <div className={styles.properties}>
              {listLocation.length} PROPERTIES
            </div>
            <div className={styles.searchType}>
              <Image
                src="/searchPage/sort.svg"
                className={styles.sortIcon}
                onClick={onOpenSort}
              />
              <div
                className={`${styles.info} ${
                  searchType === "filter" && styles.active
                }`}
                onClick={() => onChangeSearchType("filter")}
              >
                <img src="/searchPage/filter.svg" />
                LIST
              </div>

              <div
                className={`${styles.info} ${
                  searchType === "map" && styles.active
                }`}
                onClick={() => onChangeSearchType("map")}
              >
                <img src="/searchPage/map.svg" />
                MAP
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <SelectWithPrefix
            className={styles.selectPrefix}
            prefix={<img src="/homepage/discoverIcon.svg" />}
            value={destination}
            placeholder="Choose a destination"
            options={allLocation}
            multipleLevel={true}
            onChange={(value) => {
              if (!value) {
                router.push("/search");
              } else {
                setDestination(value);
              }
            }}
          />
          <div className={styles.searchType}>
            <div
              className={`${styles.info} ${
                searchType === "filter" && styles.active
              }`}
              onClick={() => onChangeSearchType("filter")}
            >
              <img src="/searchPage/filter.svg" />
              FILTER
            </div>

            <div
              className={`${styles.info} ${
                searchType === "map" && styles.active
              }`}
              onClick={() => onChangeSearchType("map")}
            >
              <img src="/searchPage/map.svg" />
              MAP
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MapControl;
