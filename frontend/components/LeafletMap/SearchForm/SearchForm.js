import { Checkbox, Form, Input, Select, Slider, TreeSelect } from "antd";
import { useContext, useMemo } from "react";
import { useRouter } from "next/router";

import RangeDatePicker from "@/components/RangeDatePicker/RangeDatePicker";
import SegmenedSelector from "../SearchByFilter/SegmenedSelector/SegmenedSelector";
import { isMobile } from "@/utils/utils";
import { PropertyListContext } from "@/components/Layout/Layout";

import styles from "./SearchForm.module.scss";

const { Option } = Select;

const SearchForm = ({ tabActive }) => {
  const formRef = Form.useFormInstance();
  const router = useRouter();
  const { allLocation, allTags, allFeatures } = useContext(PropertyListContext);

  const rangeDate = Form.useWatch("rangeDate", formRef);
  const selectedBadroom = Form.useWatch("selectedBadroom", formRef);
  const maxGuest = Form.useWatch("maxGuest", formRef);
  const selectedBedroom = Form.useWatch("selectedBedroom", formRef);
  const selectedBed = Form.useWatch("selectedBed", formRef);
  const country = Form.useWatch("country", formRef);
  const location1 = Form.useWatch("location1", formRef);
  const location2 = Form.useWatch("location2", formRef);
  const selectedTag = Form.useWatch("tags", formRef);

  const isShowDestination = useMemo(() => {
    if (router.asPath === "/holiday-sydney") {
      return false;
    }

    return true;
  }, [router]);

  const onSelectTag = (tag) => {
    if (selectedTag.findIndex((tags) => tags === tag) === -1) {
      formRef.setFieldsValue({ tags: [...selectedTag, tag] });
    } else {
      formRef.setFieldsValue({
        tags: selectedTag.filter((tags) => tags !== tag),
      });
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.inputWrapper}>
        {isMobile() && isShowDestination && (
          <TreeSelect
            className={styles.treeSelect}
            placeholder="Choose destination"
            allowClear
            value={country || location1 || location2}
            treeData={allLocation}
            onChange={(value) => {
              if (!value) {
                router.push("/search");
              }
            }}
          />
        )}
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
            <div className="flex items-center justify-between">
              <div className={styles.priceTitle}>PRICE PER NIGHT (AUD)</div>
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
        )}
      </div>
      <div className={styles.inputWrapper} style={{ gap: "24px" }}>
        {tabActive === "holiday" && (
          <div>
            <div className={styles.inputTitle}>Bedrooms</div>
            <Form.Item name="selectedBedroom">
              <SegmenedSelector
                listOption={["Any", "1", "2", "3", "4", "5", "6++"]}
                selectedOption={selectedBedroom}
                onClick={(value) => {
                  formRef.setFieldsValue({ selectedBedroom: value });
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
            <div
              key={tag.slug}
              className={`${styles.locationSelector} ${
                selectedTag?.some((item) => item === tag.slug) &&
                styles.selectedLocation
              }`}
              onClick={() => onSelectTag(tag.slug)}
            >
              {tag.name}
            </div>
          ))}
        </div>
      </Form.Item>
    </div>
  );
};

export default SearchForm;
