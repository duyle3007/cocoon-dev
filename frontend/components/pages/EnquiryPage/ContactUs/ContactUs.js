import { Button, Form, Input } from "antd";

import Image from "@/components/Image/Image";

import styles from "./ContactUs.module.scss";

const { TextArea } = Input;

const ContactUs = () => {
  return (
    <div className={styles.contactUs}>
      <div className={styles.wrapper}>
        <div className={styles.helpBtn}>
          <Image src="/enquiryPage/questionIcon.svg" />
          <span>NEED HELP?</span>
        </div>

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
