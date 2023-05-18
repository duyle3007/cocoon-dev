import { Checkbox, Input, Select, Slider } from "antd";
import { useEffect, useState } from "react";
import {
  LeftOutlined,
  RightOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import RangeDatePicker from "../RangeDatePicker/RangeDatePicker";
import SegmenedSelector from "./SearchByFilter/SegmenedSelector/SegmenedSelector";

import styles from "./SearchControl.module.scss";
import { useRouter } from "next/router";
import { isMobile } from "@/utils/utils";

const { Option } = Select;

const LOCATION_LIST = [
  { label: "All location", value: "all" },
  { label: "Beach holidays", value: "beach" },
  { label: "Beachfront", value: "beachfront" },
  { label: "Waterfront", value: "waterfront" },
  { label: "Views", value: "view" },
  { label: "Unique Places", value: "unique" },
];

const SearchControl = ({
  onSearch,
  listLocation,
  onClick,
  handleReinitClick,
  searchType,
  mode,
}) => {
  const router = useRouter();

  const [tabActive, setTabActive] = useState("holiday");
  const [isMinimized, setIsMinimized] = useState(false);

  // search value
  const [searchValue, setSearchValue] = useState(null);
  const [villaType, setVillaType] = useState(null);
  const [selectedBedroom, setSelectedBedroom] = useState("Any");
  const [selectedBed, setSelectedBed] = useState("Any");
  const [selectedBadroom, setSelectedBadroom] = useState("Any");

  const [maxGuest, setMaxGuest] = useState(0);
  const [filterLocationList, setFilterLocationList] = useState([]);

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      setTabActive(hash);
    }
    if (router.query.villaType) {
      setVillaType(router.query.villaType);
    }
    if (router.query.searchValue) {
      setSearchValue(router.query.searchValue);
      onSearch(router.query.searchValue);
    }
  }, [router]);

  const onMinimize = () => {
    setIsMinimized(true);
    setTimeout(() => {
      handleReinitClick();
    }, 200);
  };

  const onMaximize = () => {
    setIsMinimized(false);
    setTimeout(() => {
      handleReinitClick();
    }, 200);
  };

  const updateLocationFilter = (selectedLocation) => {
    const temp = [...filterLocationList];
    if (filterLocationList.some((location) => location === selectedLocation)) {
      setFilterLocationList(
        temp.filter((location) => location !== selectedLocation)
      );
    } else {
      temp.push(selectedLocation);
      setFilterLocationList(temp);
    }
  };

  return (
    <>
      <div
        className={`${styles.searchControl} ${
          isMinimized ? styles.minimized : ""
        }`}
      >
        {!mode && (
          <div className={styles.topSearch}>
            {isMobile() && <LeftOutlined onClick={() => router.back()} />}
            <div className={styles.tabBar}>
              <div
                className={`${styles.tab} ${
                  tabActive === "holiday" && styles.active
                }`}
                onClick={() => setTabActive("holiday")}
              >
                HOLIDAYS
              </div>
              <div
                className={`${styles.tab} ${
                  tabActive === "photoshoots" && styles.active
                }`}
                onClick={() => setTabActive("photoshoots")}
              >
                PHOTOSHOOTS/EVENTS
              </div>
              {!isMobile() && <LeftOutlined onClick={onMinimize} />}
            </div>
          </div>
        )}

        {searchType === "filter" ? (
          <div className={styles.searchWrapper}>
            <div className={styles.inputWrapper}>
              <Input
                type="search"
                value={searchValue}
                placeholder="Villa name or location"
                prefix={<img src="/homepage/searchIcon.svg" />}
                className={styles.input}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  onSearch(e.target.value);
                }}
              />
              <Select
                placeholder="Choose villa type"
                value={villaType}
                className={styles.villaTypeSelector}
                onChange={(value) => setVillaType(value)}
              >
                <Option value="private">Private Villas</Option>
                <Option value="apartment">Apartments</Option>
                <Option value="luxury">Luxury Lodges</Option>
              </Select>
              <RangeDatePicker />
              {tabActive === "holiday" && (
                <div>
                  <div className={styles.inputTitle}>Bedrooms</div>
                  <SegmenedSelector
                    listOption={["Any", "1", "2", "3", "4", "5", "6++"]}
                    selectedOption={selectedBedroom}
                    onClick={(value) => setSelectedBedroom(value)}
                  />
                </div>
              )}
              <div>
                <div className={styles.inputTitle}>Beds</div>
                <SegmenedSelector
                  listOption={["Any", "1", "2", "3", "4", "5", "6++"]}
                  selectedOption={selectedBed}
                  onClick={(value) => setSelectedBed(value)}
                />
              </div>
              <div>
                <div className={styles.inputTitle}>Bathrooms</div>
                <SegmenedSelector
                  listOption={["Any", "1", "2", "3", "4", "5", "6++"]}
                  selectedOption={selectedBadroom}
                  onClick={(value) => setSelectedBadroom(value)}
                />
              </div>
            </div>
            {tabActive === "holiday" && (
              <div className={styles.inputWrapper} style={{ gap: "48px" }}>
                <div>
                  <div className="flex justify-between items-center">
                    <div className={styles.priceTitle}>
                      PRICE PER NIGHT (AUD)
                    </div>
                    <div className={styles.maxPrice}>$500 to +$5,000</div>
                  </div>

                  <Slider
                    className={styles.sliderPrice}
                    step={100}
                    range={{ draggableTrack: true }}
                    defaultValue={[800, 2000]}
                    tooltip={{
                      open: true,
                      placement: "bottom",
                      formatter: (value) => <div>${value}</div>,
                      getPopupContainer: (trigger) => {
                        return trigger;
                      },
                    }}
                    max={5000}
                    min={500}
                    // onChange={onChange}
                  />
                </div>
                <div className="flex justify-between">
                  <div
                    className={styles.inputTitle}
                    style={{ marginBottom: "0px" }}
                  >
                    Choose max guest
                  </div>
                  <div className="flex gap-4 items-center">
                    <div
                      className="flex justify-center items-center w-7 h-7 text-xs border border-[#E8E8E8] rounded-full cursor-pointer"
                      onClick={() => {
                        maxGuest > 0 && setMaxGuest(maxGuest - 1);
                      }}
                    >
                      <MinusOutlined />
                    </div>
                    {maxGuest}
                    <div
                      className="flex justify-center items-center w-7 h-7 text-xs bg-[#90744F] text-white rounded-full cursor-pointer"
                      onClick={() => setMaxGuest(maxGuest + 1)}
                    >
                      <PlusOutlined />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.inputWrapper}>
              <div className={styles.featuresTitle}>FEATURES</div>
              <Checkbox.Group className={styles.featureSelector}>
                <Checkbox value="ac">Air Conditioning</Checkbox>
                <Checkbox value="pool">Pool</Checkbox>
                <Checkbox value="gym">Gym</Checkbox>
                <Checkbox value="tub">Hot Tub</Checkbox>
                <Checkbox value="bbq">BBQ Grill</Checkbox>
              </Checkbox.Group>
            </div>

            <div className="flex gap-4 flex-wrap pl-10 pt-8 pb-10 pr-14">
              {LOCATION_LIST.map((location) => (
                <div
                  key={location.value}
                  className={`${styles.locationSelector} ${
                    filterLocationList.some(
                      (item) => item === location.value
                    ) && styles.selectedLocation
                  }`}
                  onClick={() => updateLocationFilter(location.value)}
                >
                  {location.label}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.searchWrapper}>
            <div className={styles.inputWrapper}>
              <Input
                type="search"
                value={searchValue}
                placeholder="Villa name or location"
                prefix={<img src="/homepage/searchIcon.svg" />}
                className={styles.input}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  onSearch(e.target.value);
                }}
              />
            </div>
            <div className={styles.numResult}>
              {listLocation.length} PROPERTIES
            </div>
            <div className={styles.searchResultList}>
              {listLocation.map((location, index) => {
                return (
                  <div
                    className={styles.locationCard}
                    key={index}
                    onClick={() => onClick(location.lat, location.lng)}
                  >
                    <img src="/map/marker.svg" />
                    <div className={styles.locationContent}>
                      <div>{location.name}</div>
                      <div className={styles.priceWrapper}>
                        <div className={styles.price}>AU${location.price}</div>
                        {location?.oldPrice && (
                          <div className={styles.discountPrice}>
                            AU${location.oldPrice}
                          </div>
                        )}
                        <span> /NIGHT</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {isMinimized && (
        <div className={styles.rightArrow} onClick={onMaximize}>
          <RightOutlined />
        </div>
      )}
    </>
  );
};

export default SearchControl;
