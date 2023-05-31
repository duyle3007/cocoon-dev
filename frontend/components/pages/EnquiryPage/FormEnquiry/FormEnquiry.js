import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";

import GuestDropdown from "../../HomePage/SearchBanner/GuestDropdown/GuestDropdown";

import styles from "./FormEnquiry.module.scss";
import { isMobile } from "@/utils/utils";

const { TextArea } = Input;

const FormEnquiry = () => {
  const [form] = Form.useForm();

  const [momentStartDate, setMomentStartDate] = useState(null);
  const [momentEndDate, setMomentEndDate] = useState(null);

  const [renderClientSideComponent, setRenderClientSideComponent] =
    useState(false);

  useEffect(() => {
    setRenderClientSideComponent(true);
  }, []);

  const disabledEndDate = (current) => {
    return momentStartDate ? current && current < momentStartDate : false;
  };

  const disabledStartDate = (current) => {
    return momentEndDate ? current && current > momentEndDate : false;
  };

  const onChangeStartDay = (date) => {
    setMomentStartDate(date);
  };

  const onChangeEndDay = (date) => {
    setMomentEndDate(date);
  };

  if (!renderClientSideComponent) {
    return <></>;
  }

  return (
    <div className={styles.formEnquiry}>
      <Form form={form} layout="vertical">
        <div className={styles.rowItem}>
          <Form.Item label="CHECK IN" name="checkIn">
            <DatePicker
              format="MMM DD, YYYY"
              disabledDate={disabledStartDate}
              onChange={onChangeStartDay}
            />
          </Form.Item>
          {isMobile() ? (
            <Form.Item label="CHECK OUT" name="checkOut">
              <DatePicker
                disabledDate={disabledEndDate}
                format="MMM DD, YYYY"
                onChange={onChangeEndDay}
              />
            </Form.Item>
          ) : (
            <Form.Item name="numPeople">
              <GuestDropdown
                onUpdateGuest={(value) =>
                  form.setFieldsValue({ numPeople: value })
                }
                className={styles.numPeople}
              />
            </Form.Item>
          )}
        </div>

        <div className={styles.rowItem}>
          {!isMobile() ? (
            <Form.Item label="CHECK OUT" name="checkOut">
              <DatePicker
                disabledDate={disabledEndDate}
                format="MMM DD, YYYY"
                onChange={onChangeEndDay}
              />
            </Form.Item>
          ) : (
            <Form.Item name="numPeople">
              <GuestDropdown
                onUpdateGuest={(value) =>
                  form.setFieldsValue({ numPeople: value })
                }
                className={styles.numPeople}
              />
            </Form.Item>
          )}
          <Form.Item label="NIGHT BUDGET" name="budget">
            <Select
              placeholder="Select"
              options={[
                {
                  value: "100",
                  label: "100 AUD",
                },
                {
                  value: "200",
                  label: "200 AUD",
                },
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item name="isFlexible">
          <Checkbox>My dates are flexible</Checkbox>
        </Form.Item>

        <div className={styles.rowItem}>
          <Form.Item label="FIRST NAME" name="firstName">
            <Input
              placeholder="Input your first name"
              className={styles.formInput}
            />
          </Form.Item>
          <Form.Item label="LAST NAME" name="lastName">
            <Input
              placeholder="Input your last name"
              className={styles.formInput}
            />
          </Form.Item>
        </div>

        <Form.Item label="ADDRESS" name="address">
          <Input
            placeholder="Input your address"
            className={styles.formInput}
          />
        </Form.Item>

        <div className={styles.rowItem}>
          <Form.Item label="COUNTRY" name="country">
            <Select
              placeholder="Choose country"
              options={[
                {
                  value: "100",
                  label: "100 AUD",
                },
                {
                  value: "200",
                  label: "200 AUD",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="STATE" name="state">
            <Select
              placeholder="Choose state"
              options={[
                {
                  value: "100",
                  label: "100 AUD",
                },
                {
                  value: "200",
                  label: "200 AUD",
                },
              ]}
            />
          </Form.Item>
        </div>

        <div className={styles.rowItem}>
          <Form.Item label="CITY" name="city">
            <Select
              placeholder="Choose city"
              options={[
                {
                  value: "100",
                  label: "100 AUD",
                },
                {
                  value: "200",
                  label: "200 AUD",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="ZIP" name="zip">
            <Input placeholder="Input zip code" className={styles.formInput} />
          </Form.Item>
        </div>

        <Form.Item label="MESSAGE" name="message">
          <TextArea
            rows={6}
            placeholder="Are there any special requirements we can help you with?"
          />
        </Form.Item>

        <Form.Item name="remember">
          <Checkbox>Remember my details</Checkbox>
        </Form.Item>

        <Form.Item name="exclusive">
          <Checkbox>Send me exclusive Villa Getaways offers</Checkbox>
        </Form.Item>

        <Button className={styles.sendBtn} type="primary">
          SEND YOUR INQUIRY
        </Button>
      </Form>
    </div>
  );
};

export default FormEnquiry;
