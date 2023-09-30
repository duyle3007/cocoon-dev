import { Checkbox, Form, Input, Select, Slider, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import { PropertyListContext } from "@/components/Layout/Layout";
import RangeDatePicker from "../RangeDatePicker/RangeDatePicker";
import SegmenedSelector from "./SearchByFilter/SegmenedSelector/SegmenedSelector";
import { isMobile } from "@/utils/utils";
import MapCard from "./MapCard/MapCard";

import styles from "./SearchControl.module.scss";
import { useContext } from "react";

const { Option } = Select;

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
  const { allTags, allFeatures } = useContext(PropertyListContext);

  // search value
  const rangeDate = Form.useWatch("rangeDate", formRef);
  const selectedBadroom = Form.useWatch("selectedBadroom", formRef);
  const maxGuest = Form.useWatch("maxGuest", formRef);
  const selectedTag = Form.useWatch("tags", formRef);
  const selectedBedroom = Form.useWatch("selectedBedroom", formRef);
  const selectedBed = Form.useWatch("selectedBed", formRef);

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      setTabActive(hash);
    } else {
      setTabActive("holiday");
    }
    if (router.query.villaType) {
      formRef.setFieldsValue({ villaType: router.query.villaType });
    }
    if (router.query.searchValue) {
      formRef.setFieldsValue({ searchValue: router.query.searchValue });
      onSearch(router.query.searchValue);
    }
    if (router.query.guest) {
      formRef.setFieldsValue({ maxGuest: router.query.guest });
    }
    if (router.query.startDate && router.query.endDate) {
      formRef.setFieldsValue({
        rangeDate: [dayjs(router.query.startDate), dayjs(router.query.endDate)],
      });
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

  const onSelectTag = (tag) => {
    if (selectedTag.findIndex((tags) => tags === tag) === -1) {
      formRef.setFieldsValue({ tags: [...selectedTag, tag] });
    } else {
      formRef.setFieldsValue({
        tags: selectedTag.filter((tags) => tags !== tag),
      });
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
        {!mode && !isMobile() && (
          <div className={styles.topSearch}>
            {isMobile() && <LeftOutlined onClick={() => router.back()} />}
            <div className={styles.tabBar}>
              {/* <div
                className={`${styles.tab} ${
                  tabActive === "holiday" && styles.active
                }`}
                onClick={() => {
                  setTabActive("holiday");
                  // formRef.resetFields();
                }}
              >
                HOLIDAYS
              </div>
              <div
                className={`${styles.tab} ${
                  tabActive === "photoshoots" && styles.active
                }`}
                onClick={() => {
                  setTabActive("photoshoots");
                  // formRef.resetFields();
                }}
              >
                PHOTOSHOOTS/EVENTS
              </div> */}
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
              {tabActive === "holiday" && (
                <Form.Item name="villaType">
                  <Select
                    placeholder="Choose villa type"
                    className={styles.villaTypeSelector}
                    allowClear
                  >
                    <Option value="private">Private Villas</Option>
                    <Option value="apartment">Apartments</Option>
                  </Select>
                </Form.Item>
              )}
              <Form.Item name="rangeDate">
                <RangeDatePicker value={rangeDate} />
              </Form.Item>
              {tabActive === "holiday" && (
                <div>
                  <div>
                    <div className="flex items-center justify-between">
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
                </div>
              )}
            </div>
            <div className={styles.inputWrapper}>
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
            <div className={styles.inputWrapper}>
              <div className={styles.featuresTitle}>FEATURES</div>
              <Form.Item name="feature">
                <Checkbox.Group className={styles.featureSelector} options={allFeatures} />
              </Form.Item>
            </div>

            <Form.Item name="tags">
              <div className="flex flex-wrap gap-4 pt-8 pb-10 pl-10 pr-14">
                {allTags.map((tag) => (
                  <Tooltip title={tag.tooltip} key={tag.slug}>
                    <div
                      className={`${styles.locationSelector} ${
                        selectedTag?.some((item) => item === tag.slug) &&
                        styles.selectedLocation
                      }`}
                      onClick={() => onSelectTag(tag.slug)}
                    >
                      {tag.name}
                    </div>
                  </Tooltip>
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
              <Form.Item name="rangeDate">
                <RangeDatePicker value={rangeDate} />
              </Form.Item>
              <div>
                <div>
                  <div className="flex items-center justify-between">
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
              </div>
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
                    onClick={() => {
                      onClick(location.acf.lat, location.acf.long);
                    }}
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
