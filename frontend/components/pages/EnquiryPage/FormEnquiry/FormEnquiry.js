import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import GuestDropdown from "../../HomePage/SearchBanner/GuestDropdown/GuestDropdown";
import { getCountryList, isMobile } from "@/utils/utils";

import styles from "./FormEnquiry.module.scss";

const { Option } = Select;

const { TextArea } = Input;

const FormEnquiry = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const countryList = getCountryList();

  const [momentStartDate, setMomentStartDate] = useState(null);
  const [momentEndDate, setMomentEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countryPhone, setCountryPhone] = useState("61");

  const [renderClientSideComponent, setRenderClientSideComponent] =
    useState(false);

  useEffect(() => {
    setRenderClientSideComponent(true);
    const { startDate, endDate } = router.query;
    form.setFieldsValue({
      checkIn: dayjs(startDate),
      checkOut: dayjs(endDate),
    });
    setMomentStartDate(dayjs(startDate));
    setMomentEndDate(dayjs(endDate));
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

  const onSubmit = async (formData) => {
    const {
      checkIn,
      checkOut,
      firstName,
      lastName,
      numPeople,
      address,
      zip,
      message,
      email,
      phoneNumber,
    } = formData;
    setLoading(true);
    try {
      const data = {
        accommodationTypeId: router.query.propertyId,
        checkInDate: dayjs(checkIn).format("YYYY-MM-DD"),
        checkOutDate: dayjs(checkOut).format("YYYY-MM-DD"),
        numberOfAdult: Number(numPeople.split(",")[0].split(" ")[0]),
        numberOfChild: Number(numPeople.split(",")[1].split(" ")[1]),
        firstNam: firstName,
        lastName: lastName,
        address: address,
        zip: zip,
        message: message,
        email,
        phoneNumber: `+${countryPhone} ${phoneNumber}`,
      };

      await axios.post("/api/createBooking", data);
      notification.success({ message: "Booking successfully" });

      // Reset form
      form.resetFields();
      setCountryPhone("61");
    } catch (e) {
      console.log("e", e);
      notification.error({ message: e.response.data.error.props });
    } finally {
      setLoading(false);
    }
  };

  const PhoneCountrySelect = () => {
    return (
      <Select
        value={countryPhone}
        className={styles.phoneSelect}
        getPopupContainer={(trigger) => trigger}
        popupMatchSelectWidth={false}
        onChange={(value) => setCountryPhone(value)}
      >
        {Object.keys(countryList).map(function (key) {
          const country = countryList[key];
          return (
            <Option
              key={country.name}
              value={country.phone}
              className="flex items-center"
            >
              {`${country.emoji} +`}
              <span className="opacity-75">{country.phone}</span>
            </Option>
          );
        })}
      </Select>
    );
  };

  if (!renderClientSideComponent) {
    return <></>;
  }

  return (
    <Spin spinning={loading}>
      <div className={styles.formEnquiry}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          onFinishFailed={({ errorFields }) =>
            notification.error({ message: errorFields[0].errors[0] })
          }
          scrollToFirstError
        >
          <div className={`${styles.rowItem} items-end`}>
            <Form.Item
              label="CHECK IN"
              name="checkIn"
              rules={[
                { required: true, message: "Please choose checkin date!" },
              ]}
            >
              <DatePicker
                disabled
                format="MMM DD, YYYY"
                disabledDate={disabledStartDate}
                onChange={onChangeStartDay}
              />
            </Form.Item>
            {isMobile() ? (
              <Form.Item
                label="CHECK OUT"
                name="checkOut"
                rules={[
                  { required: true, message: "Please choose checkout date!" },
                ]}
              >
                <DatePicker
                  disabled
                  disabledDate={disabledEndDate}
                  format="MMM DD, YYYY"
                  onChange={onChangeEndDay}
                />
              </Form.Item>
            ) : (
              <Form.Item
                name="numPeople"
                rules={[
                  { required: true, message: "Please select number of guest!" },
                ]}
              >
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
              <Form.Item
                label="CHECK OUT"
                name="checkOut"
                rules={[
                  { required: true, message: "Please choose checkout date!" },
                ]}
              >
                <DatePicker
                  disabled
                  disabledDate={disabledEndDate}
                  format="MMM DD, YYYY"
                  onChange={onChangeEndDay}
                />
              </Form.Item>
            ) : (
              <Form.Item
                name="numPeople"
                rules={[
                  { required: true, message: "Please select number of guest!" },
                ]}
              >
                <GuestDropdown
                  onUpdateGuest={(value) =>
                    form.setFieldsValue({ numPeople: value })
                  }
                  className={styles.numPeople}
                />
              </Form.Item>
            )}
            {/* <Form.Item label="NIGHT BUDGET" name="budget">
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
            </Form.Item> */}
            <Form.Item label="Postcode" name="zip">
              <Input
                placeholder="Input postcode code"
                className={styles.formInput}
              />
            </Form.Item>
          </div>
          {/* <Form.Item name="isFlexible">
            <Checkbox>My dates are flexible</Checkbox>
          </Form.Item> */}

          <div className={styles.rowItem}>
            <Form.Item
              label="FIRST NAME"
              name="firstName"
              rules={[
                { required: true, message: "Please fill your first name!" },
              ]}
            >
              <Input
                placeholder="Input your first name"
                className={styles.formInput}
              />
            </Form.Item>
            <Form.Item
              label="LAST NAME"
              name="lastName"
              rules={[
                { required: true, message: "Please fill your last name!" },
              ]}
            >
              <Input
                placeholder="Input your last name"
                className={styles.formInput}
              />
            </Form.Item>
          </div>

          <div className={styles.rowItem}>
            <Form.Item
              label="EMAIL"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input
                placeholder="Input your email"
                className={styles.formInput}
              />
            </Form.Item>
            <Form.Item label="Phone number" name="phoneNumber">
              <InputNumber
                addonBefore={<PhoneCountrySelect />}
                controls={false}
                placeholder="Input your phone"
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

          {/* <div className={styles.rowItem}>
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
          </div> */}

          {/* <div className={styles.rowItem}>
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
              <Input
                placeholder="Input zip code"
                className={styles.formInput}
              />
            </Form.Item>
          </div> */}

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

          <Button className={styles.sendBtn} type="primary" htmlType="submit">
            SEND YOUR INQUIRY
          </Button>
        </Form>
      </div>
    </Spin>
  );
};

export default FormEnquiry;
