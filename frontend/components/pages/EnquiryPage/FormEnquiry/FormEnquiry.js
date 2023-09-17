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
import { useRouter } from "next/router";
import dayjs from "dayjs";

import GuestDropdown from "../../HomePage/SearchBanner/GuestDropdown/GuestDropdown";
import { isMobile } from "@/utils/utils";
import PhoneInput from "@/components/PhoneInput/PhoneInput";

import styles from "./FormEnquiry.module.scss";
import CountrySelect from "@/components/CountrySelect/CountrySelect";

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
      budget,
      message,
      email,
      phoneNumber,
      country,
      exclusive,
    } = formData;
    setLoading(true);
    try {
      const data = {
        accommodationTypeId: router.query.propertyId,
        checkInDate: dayjs(checkIn).format("YYYY-MM-DD"),
        checkOutDate: dayjs(checkOut).format("YYYY-MM-DD"),
        numberOfAdult: Number(numPeople.split(",")[0].split(" ")[0]),
        numberOfChild: Number(numPeople.split(",")[1].split(" ")[1]),
        firstName,
        lastName,
        address,
        budget,
        message,
        email,
        phoneNumber,
        country,
        exclusive,
      };

      await axios.post("/api/createBooking", data);
      notification.success({ message: "Booking successfully" });

      // Reset form
      form.resetFields();
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
          onFinishFailed={({ errorFields }) =>
            notification.error({ message: errorFields[0].errors[0] })
          }
          initialValues={{ exclusive: false }}
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

            <Form.Item label="Nightly Budget" name="budget">
              <Select
                placeholder="Nightly budget?"
                options={[
                  {
                    value: "300",
                    label: "$300 - $500",
                  },
                  {
                    value: "500",
                    label: "$500 - $750",
                  },
                  {
                    value: "750",
                    label: "$750 - $1000",
                  },
                  {
                    value: "1000",
                    label: "$1000 - $1250",
                  },
                  {
                    value: "1250",
                    label: "$1250 - $1500",
                  },
                  {
                    value: "1500",
                    label: "$1500 - $2000",
                  },
                  {
                    value: "2000",
                    label: "$2000 - $2500",
                  },
                  {
                    value: "2500",
                    label: "$2500 - $5000",
                  },
                  {
                    value: "5000",
                    label: "$5000 - $10000",
                  },
                  {
                    value: "10000",
                    label: "$10000+",
                  },
                ]}
              />
            </Form.Item>
          </div>

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
              <PhoneInput />
            </Form.Item>
          </div>

          <div className={styles.rowItem}>
            <Form.Item label="ADDRESS" name="address">
              <Input
                placeholder="Input your address"
                className={styles.formInput}
              />
            </Form.Item>
            <Form.Item label="COUNTRY" name="country">
              <CountrySelect />
            </Form.Item>
          </div>

          <Form.Item label="MESSAGE" name="message">
            <TextArea
              rows={6}
              placeholder="Are there any special requirements we can help you with?"
            />
          </Form.Item>

          <Form.Item name="exclusive" valuePropName="checked">
            <Checkbox>
              Send me exclusive Cocoon Luxury Properties offers
            </Checkbox>
          </Form.Item>

          <Button className={styles.sendBtn} type="primary" htmlType="submit">
            SEND YOUR ENQUIRY
          </Button>
        </Form>
      </div>
    </Spin>
  );
};

export default FormEnquiry;
