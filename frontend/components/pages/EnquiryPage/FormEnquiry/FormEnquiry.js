import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";

import GuestDropdown from "../../HomePage/SearchBanner/GuestDropdown/GuestDropdown";
import { isMobile } from "@/utils/utils";

import styles from "./FormEnquiry.module.scss";
import dayjs from "dayjs";

const { TextArea } = Input;

const FormEnquiry = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [momentStartDate, setMomentStartDate] = useState(null);
  const [momentEndDate, setMomentEndDate] = useState(null);
  const [loading, setLoading] = useState(false);

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
      };

      await axios.post("/api/createBooking", data);
      notification.success({ message: "Booking successfully" });
    } catch (e) {
      console.log("e", e);
      notification.error({ message: e.response.data.error.props });
    } finally {
      setLoading(false);
    }
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
          scrollToFirstError
        >
          <div className={styles.rowItem}>
            <Form.Item
              label="CHECK IN"
              name="checkIn"
              rules={[
                { required: true, message: "Please choose checkin date!" },
              ]}
            >
              <DatePicker
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
                  disabledDate={disabledEndDate}
                  format="MMM DD, YYYY"
                  onChange={onChangeEndDay}
                />
              </Form.Item>
            ) : (
              <Form.Item
                name="numPeople"
                rules={[{ required: true, message: "Please select!" }]}
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
                  disabledDate={disabledEndDate}
                  format="MMM DD, YYYY"
                  onChange={onChangeEndDay}
                />
              </Form.Item>
            ) : (
              <Form.Item
                name="numPeople"
                rules={[{ required: true, message: "Please choose!" }]}
              >
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
              <Input
                placeholder="Input zip code"
                className={styles.formInput}
              />
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

          <Button className={styles.sendBtn} type="primary" htmlType="submit">
            SEND YOUR INQUIRY
          </Button>
        </Form>
      </div>
    </Spin>
  );
};

export default FormEnquiry;
