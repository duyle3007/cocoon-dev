import { Button, Form, Input, Select, notification } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "../../../../ServerActions";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

import Image from "@/components/Image/Image";
import PhoneInput from "@/components/PhoneInput/PhoneInput";
import CountrySelect from "@/components/CountrySelect/CountrySelect";
import { useContext, useState, useRef } from "react";
import { PropertyListContext } from "@/components/Layout/Layout";

import styles from "./ContactUs.module.scss";

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
  const recaptchaRef = useRef(null);
  const [isVerified, setIsverified] = useState(false);

  const [form] = Form.useForm();
  const { allLocation } = useContext(PropertyListContext);

  const [childLocation, setChildLocation] = useState([]);

  async function handleCaptchaSubmission(token) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }

  const onSubmit = async (formData) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      destination,
      location,
    } = formData;
    setLoading(true);
    try {
      const data = {
        firstName,
        lastName,
        address: address,
        email,
        phoneNumber,
        country,
        destination,
        location,
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
                <CountrySelect />
              </Form.Item>
            </div>

            <div className={styles.rowItem}>
              <Form.Item label="DESTINATION" name="destination">
                <Select
                  placeholder="Select destination"
                  className={styles.formSelect}
                  size="large"
                  onChange={(_, option) => {
                    if (option.data) {
                      setChildLocation(option.data);
                    } else {
                      setChildLocation([]);
                    }
                    form.setFieldsValue({ location: undefined });
                  }}
                >
                  {allLocation.slice(1).map((location) => (
                    <Option
                      key={location.key}
                      value={location.value}
                      data={location.children}
                    >
                      {location.label.props.children}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {childLocation.length > 0 && (
                <Form.Item label="LOCATION" name="location">
                  <Select
                    placeholder="Select location"
                    className={styles.formSelect}
                    size="large"
                  >
                    {childLocation.map((location) => (
                      <Option key={location.key} value={location.value}>
                        {location.label.props.children}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            </div>

            <Form.Item label="MESSAGE" name="message">
              <TextArea
                rows={4}
                placeholder="Tell us what you are looking for, such as dates, number of guests, and location."
              />
            </Form.Item>

            <ReCAPTCHA
              sitekey={publicRuntimeConfig.recaptchaSiteKey}
              ref={recaptchaRef}
              onChange={handleCaptchaSubmission}
            />
            <Button
              disabled={!isVerified}
              className={styles.sendBtn}
              type="primary"
              htmlType="submit"
            >
              Send message
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
