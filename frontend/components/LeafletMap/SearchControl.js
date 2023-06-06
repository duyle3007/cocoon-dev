import { Checkbox, Form, Input, Select, Slider } from "antd";
import { useEffect, useState } from "react";
import {
  LeftOutlined,
  RightOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

import RangeDatePicker from "../RangeDatePicker/RangeDatePicker";
import SegmenedSelector from "./SearchByFilter/SegmenedSelector/SegmenedSelector";
import { isMobile } from "@/utils/utils";
import MapCard from "./MapCard/MapCard";

import styles from "./SearchControl.module.scss";

const { Option } = Select;

export const LOCATION_LIST = [
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
  setTabActive,
  tabActive,
}) => {
  const router = useRouter();
  const formRef = Form.useFormInstance();

  const [isMinimized, setIsMinimized] = useState(false);

  // search value
  const rangeDate = Form.useWatch("rangeDate", formRef);
  const selectedBadroom = Form.useWatch("selectedBadroom", formRef);
  const maxGuest = Form.useWatch("maxGuest", formRef);
  const selectedLocation = Form.useWatch("selectedLocation", formRef);
  const selectedBedroom = Form.useWatch("selectedBedroom", formRef);
  const selectedBed = Form.useWatch("selectedBed", formRef);

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      setTabActive(hash);
    }
    if (router.query.villaType) {
      formRef.setFieldsValue({ villaType: router.query.villaType });
    }
    if (router.query.searchValue) {
      formRef.setFieldsValue({ searchValue: router.query.searchValue });
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

  const updateLocationFilter = (selectedValues) => {
    const temp = [...selectedLocation];
    if (selectedLocation.some((location) => location === selectedValues)) {
      formRef.setFieldsValue({
        selectedLocation: temp.filter(
          (location) => location !== selectedValues
        ),
      });
    } else {
      temp.push(selectedValues);
      formRef.setFieldsValue({ selectedLocation: temp });
    }
    formRef.submit();
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
              <Form.Item name="searchValue">
                <Input
                  type="search"
                  placeholder="Villa name"
                  prefix={<img src="/homepage/searchIcon.svg" />}
                  className={styles.input}
                />
              </Form.Item>
              <Form.Item name="villaType">
                <Select
                  placeholder="Choose villa type"
                  className={styles.villaTypeSelector}
                >
                  <Option value="private">Private Villas</Option>
                  <Option value="apartment">Apartments</Option>
                  <Option value="luxury">Luxury Lodges</Option>
                </Select>
              </Form.Item>
              <Form.Item name="rangeDate">
                <RangeDatePicker value={rangeDate} />
              </Form.Item>
              {tabActive === "holiday" && (
                <div>
                  <div className={styles.inputTitle}>Bedrooms</div>
                  <Form.Item name="selectedBedroom">
                    <SegmenedSelector
                      listOption={["Any", "1", "2", "3", "4", "5", "6++"]}
                      selectedOption={selectedBedroom}
                      onClick={(value) => {
                        formRef.setFieldsValue({ selectedBedroom: value });
                        formRef.submit();
                      }}
                    />
                  </Form.Item>
                </div>
              )}
              <div>
                <div className={styles.inputTitle}>Beds</div>
                <Form.Item name="selectedBed">
                  <SegmenedSelector
                    listOption={["Any", "1", "2", "3", "4", "5", "6++"]}
                    selectedOption={selectedBed}
                    onClick={(value) => {
                      formRef.setFieldsValue({ selectedBed: value });
                      formRef.submit();
                    }}
                  />
                </Form.Item>
              </div>
              <div>
                <div className={styles.inputTitle}>Bathrooms</div>
                <Form.Item name="selectedBadroom">
                  <SegmenedSelector
                    listOption={["Any", "1", "2", "3", "4", "5", "6++"]}
                    selectedOption={selectedBadroom}
                    onClick={(value) => {
                      formRef.setFieldsValue({ selectedBadroom: value });
                      formRef.submit();
                    }}
                  />
                </Form.Item>
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
                  <Form.Item name="rangePrice">
                    <Slider
                      className={styles.sliderPrice}
                      step={100}
                      range={{ draggableTrack: true }}
                      defaultValue={[800, 5000]}
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
                    />
                  </Form.Item>
                </div>
                <div className="flex justify-between">
                  <div
                    className={styles.inputTitle}
                    style={{ marginBottom: "0px" }}
                  >
                    Choose max guest
                  </div>
                  <Form.Item name="maxGuest">
                    <div className="flex gap-4 items-center">
                      <div
                        className="flex justify-center items-center w-7 h-7 text-xs border border-[#E8E8E8] rounded-full cursor-pointer"
                        onClick={() => {
                          maxGuest > 0 &&
                            formRef.setFieldsValue({ maxGuest: maxGuest - 1 });
                          formRef.submit();
                        }}
                      >
                        <MinusOutlined />
                      </div>
                      {maxGuest || 0}
                      <div
                        className="flex justify-center items-center w-7 h-7 text-xs bg-[#90744F] text-white rounded-full cursor-pointer"
                        onClick={() => {
                          formRef.setFieldsValue({ maxGuest: maxGuest + 1 });
                          formRef.submit();
                        }}
                      >
                        <PlusOutlined />
                      </div>
                    </div>
                  </Form.Item>
                </div>
              </div>
            )}
            <div className={styles.inputWrapper}>
              <div className={styles.featuresTitle}>FEATURES</div>
              <Form.Item name="feature">
                <Checkbox.Group className={styles.featureSelector}>
                  <Checkbox value="Air Conditioning">Air Conditioning</Checkbox>
                  <Checkbox value="Pool">Pool</Checkbox>
                  <Checkbox value="Gym">Gym</Checkbox>
                  <Checkbox value="Hot Tub">Hot Tub</Checkbox>
                  <Checkbox value="BBQ Grill">BBQ Grill</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </div>

            <Form.Item name="selectedLocation">
              <div className="flex gap-4 flex-wrap pl-10 pt-8 pb-10 pr-14">
                {LOCATION_LIST.map((location) => (
                  <div
                    key={location.value}
                    className={`${styles.locationSelector} ${
                      selectedLocation?.some(
                        (item) => item === location.value
                      ) && styles.selectedLocation
                    }`}
                    onClick={() => updateLocationFilter(location.value)}
                  >
                    {location.label}
                  </div>
                ))}
              </div>
            </Form.Item>
          </div>
        ) : (
          <div className={styles.searchWrapper}>
            <div className={styles.inputWrapper}>
              <Form.Item name="searchValue">
                <Input
                  type="search"
                  placeholder="Villa name"
                  prefix={<img src="/homepage/searchIcon.svg" />}
                  className={styles.input}
                  onChange={(e) => {
                    onSearch(e.target.value);
                  }}
                />
              </Form.Item>
            </div>
            <div className={styles.numResult}>
              {listLocation.length} PROPERTIES
            </div>
            <div className={styles.searchResultList}>
              {listLocation.map((location, index) => {
                return (
                  <MapCard
                    key={index}
                    location={location}
                    onClick={() => onClick(location.lat, location.lng)}
                  />
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
