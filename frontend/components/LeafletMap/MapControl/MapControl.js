import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form } from "antd";

import SelectWithPrefix from "@/components/SelectWithPrefix/SelectWithPrefix";
import { DESTINATION_LIST } from "@/components/Header/Header";

import styles from "./MapControl.module.scss";
import { isMobile } from "@/utils/utils";
import Image from "@/components/Image/Image";

export const COUNTRY_LIST = [
  {
    name: "All destinations",
    value: "all",
  },
  {
    name: "Australia",
    value: "australia",
  },
  {
    name: "New Zealand",
    value: "new_zealand",
  },
  {
    name: "Bali",
    value: "bali",
  },
  {
    name: "Thailand",
    value: "thai",
  },
  {
    name: "France",
    value: "france",
  },
  {
    name: "Italy",
    value: "italy",
  },
  {
    name: "Greece",
    value: "greece",
  },
];

const MapControl = ({
  searchType,
  onChangeSearchType,
  listLocation,
  onOpenFilter,
  onOpenSort,
}) => {
  const router = useRouter();
  const formRef = Form.useFormInstance();

  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if (router.query.country) {
      setDestination(router.query.country);
      formRef.setFieldsValue({
        country: router.query.country,
        location1: null,
        location2: null,
      });
      formRef.submit();
    } else if (router.query.location1) {
      const levelRouter = router.query.location1.split(",");
      setDestination(levelRouter);
      formRef.setFieldsValue({
        country: null,
        location1: levelRouter[1],
        location2: null,
      });
      formRef.submit();
    } else if (router.query.location2) {
      const levelRouter = router.query.location2.split(",");
      setDestination(levelRouter);
      formRef.setFieldsValue({
        country: null,
        location1: null,
        location2: levelRouter[2],
      });
      formRef.submit();
    } else {
      setDestination(null);
    }
  }, [router]);

  return (
    <div className={styles.mapControl}>
      <Form.Item name="country" hidden />
      <Form.Item name="location1" hidden />
      <Form.Item name="location2" hidden />
      {isMobile() ? (
        <div className="flex flex-col w-full">
          <div className={styles.searchMobile} onClick={onOpenFilter}>
            <Image src="/searchPage/whiteLocation.svg" className="mr-3" />
            <span>
              {COUNTRY_LIST.find((country) => country.value === destination)
                ?.name || "Choose  destination"}
            </span>
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
            options={DESTINATION_LIST}
            multipleLevel={true}
            onChange={(value) => setDestination(value)}
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
