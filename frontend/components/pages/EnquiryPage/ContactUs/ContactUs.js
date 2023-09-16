import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  notification,
} from "antd";

import Image from "@/components/Image/Image";

import styles from "./ContactUs.module.scss";
import { getCountryList, isMobile } from "@/utils/utils";
import PhoneInput from "@/components/PhoneInput/PhoneInput";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

const NeedHelpContent = () => {
  return (
    <div className={styles.needHelpContent}>
      <div>
        If you have any question please don&apos;t hesitate to contact us
      </div>
      <div className={styles.info}>
        <Image src="/phoneIcon.svg" className={styles.icon} /> 0407 008 176
      </div>
      <div className={styles.info}>
        <Image src="/emailIcon.svg" className={styles.icon} />{" "}
        julian@cocoonluxuryproperties.com
      </div>
      <div className={styles.info}>
        <Image src="/emailIcon.svg" className={styles.icon} />{" "}
        manish@cocoonluxuryproperties.com
      </div>
    </div>
  );
};

const ContactUs = () => {
  const countryList = getCountryList();
  const [form] = Form.useForm();

  const onSubmit = async (formData) => {
    const { firstName, lastName, email, phoneNumber, country } = formData;
    setLoading(true);
    try {
      const data = {
        firstNam: firstName,
        lastName: lastName,
        address: address,
        email,
        phoneNumber: phoneNumber,
        country,
      };

      // await axios.post("/api/createBooking", data);
      notification.success({ message: "Send successfully" });

      // Reset form
      form.resetFields();
    } catch (e) {
      console.log("e", e);
      notification.error({ message: e.response.data.error.props });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactUs}>
      <div className={styles.wrapper}>
        {/* <Popconfirm
          placement={isMobile() ? "bottom" : "bottomRight"}
          getPopupContainer={(trigger) => {
            return trigger;
          }}
          description={<NeedHelpContent />}
        >
          <div className={styles.helpBtn}>
            <Image src="/enquiryPage/questionIcon.svg" />
            <span>NEED HELP?</span>
          </div>
        </Popconfirm> */}

        <h1>CONTACT US</h1>

        <div className={styles.form}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{ country: "Andorra" }}
            onFinish={onSubmit}
          >
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
                label="YOUR PHONE NUMBER"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please fill your phone number!" },
                ]}
              >
                <PhoneInput />
              </Form.Item>
              <Form.Item
                label="YOUR EMAIL"
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
            </div>

            <div className={styles.rowItem}>
              <Form.Item label="YOUR ADDRESS (OPTIONAL)" name="address">
                <Input
                  placeholder="Input your address"
                  className={styles.formInput}
                />
              </Form.Item>
              <Form.Item
                label="YOUR COUNTRY"
                name="country"
                rules={[
                  { required: true, message: "Please fill your country!" },
                ]}
              >
                <Select
                  defaultValue={"Andorra"}
                  getPopupContainer={(trigger) => trigger}
                  popupMatchSelectWidth={false}
                  className={`${styles.countrySelect}`}
                >
                  {Object.keys(countryList).map(function (key) {
                    const country = countryList[key];
                    return (
                      <Option
                        key={country.name}
                        value={country.name}
                        className="flex items-center"
                      >
                        <span className="opacity-75">{country.name}</span>
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>

            <Form.Item label="MESSAGE" name="message">
              <TextArea
                rows={4}
                placeholder="Tell us what you are looking for, such as dates, number of guests, and location."
              />
            </Form.Item>

            <Button className={styles.sendBtn} type="primary" htmlType="submit">
              Send as message
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
