import { Button, Form, Input, Popconfirm } from "antd";

import Image from "@/components/Image/Image";

import styles from "./ContactUs.module.scss";
import { isMobile } from "@/utils/utils";

const { TextArea } = Input;

const NeedHelpContent = () => {
  return (
    <div className={styles.needHelpContent}>
      <div>
        If you have any question please don&apos;t hesitate to contact us
      </div>
      <div className={styles.info}>
        <Image src="./phoneIcon.svg" className={styles.icon} /> 0407 008 176
      </div>
      <div className={styles.info}>
        <Image src="./emailIcon.svg" className={styles.icon} />{" "}
        julian@cocoonluxuryproperties.com
      </div>
      <div className={styles.info}>
        <Image src="./emailIcon.svg" className={styles.icon} />{" "}
        manish@cocoonluxuryproperties.com
      </div>
    </div>
  );
};

const ContactUs = () => {
  return (
    <div className={styles.contactUs}>
      <div className={styles.wrapper}>
        <Popconfirm
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
        </Popconfirm>

        <h1>CONTACT US</h1>

        <div className={styles.form}>
          <Form layout="vertical">
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

            <div className={styles.rowItem}>
              <Form.Item label="YOUR PHONE NUMBER" name="phoneNumber">
                <Input
                  placeholder="Input your phone number"
                  className={styles.formInput}
                />
              </Form.Item>
              <Form.Item label="YOUR EMAIL" name="email">
                <Input
                  placeholder="Input your email"
                  className={styles.formInput}
                />
              </Form.Item>
            </div>

            <Form.Item label="SUBJECT (OPTIONAL)" name="subject">
              <Input
                placeholder="Inquiry for..."
                className={styles.formInput}
              />
            </Form.Item>

            <Form.Item label="MESSAGE" name="message">
              <TextArea rows={4} placeholder="Input your message" />
            </Form.Item>

            <Button className={styles.sendBtn} type="primary">
              Send as message
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
