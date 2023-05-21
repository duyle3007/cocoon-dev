import { Button, Form, Rate, Input, Checkbox, Modal } from "antd";

import styles from "./ReviewTab.module.scss";
import Image from "@/components/Image/Image";
import { useState } from "react";

const { TextArea } = Input;

const ReviewCard = ({ review }) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewTitle}>
        <div className="flex gap-5 items-center">
          <Image src={review.avatar} className={styles.avatarReview} />
          <div className="flex flex-col gap-2">
            <div className="uppercase">{review.title}</div>
            <Rate value={review.rate} disabled />
          </div>
        </div>

        <div className={styles.date}>{review.date}</div>
      </div>

      <div className={styles.description}>{review.description}</div>
      <div className="uppercase">{review.name}</div>
    </div>
  );
};
const ReviewTab = ({ info }) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const onSubmitForm = (fieldValues) => {
    setIsWriteModalOpen(false);
  };

  return (
    <div className={styles.reviewTab}>
      <Modal
        title={null}
        open={isWriteModalOpen}
        onCancel={() => setIsWriteModalOpen(false)}
        wrapClassName={styles.writeModal}
        footer={null}
        closable={false}
      >
        <h4>PROPERTY REVIEW</h4>
        <Form
          layout="vertical"
          initialValues={{ rate: 3 }}
          onFinish={onSubmitForm}
        >
          <div className="flex justify-between items-center">
            Property quality
            <Form.Item name="rate">
              <Rate />
            </Form.Item>
          </div>
          <TextArea
            rows={4}
            placeholder="Input your review"
            prefix={
              <Image src="/map/peopleIcon.svg" className={styles.inputPrefix} />
            }
            className="resize-none mt-4 mb-6"
          />
          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              label="YOUR NAME"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                prefix={
                  <Image
                    src="/map/peopleIcon.svg"
                    className={styles.inputPrefix}
                  />
                }
                placeholder="Input your name"
                className={styles.formInput}
              />
            </Form.Item>
            <Form.Item
              label="YOUR EMAIL"
              name="email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                prefix={
                  <Image src="/emailIcon.svg" className={styles.inputPrefix} />
                }
                placeholder="Input your email"
                className={styles.formInput}
              />
            </Form.Item>
          </div>
          <Form.Item name="remember">
            <Checkbox className="my-6">
              This review is based on my own experience and is my genuine
              opinion.
            </Checkbox>
          </Form.Item>

          <div className="grid grid-cols-2 gap-6">
            <Button onClick={() => setIsWriteModalOpen(false)}>Cancel</Button>
            <Button className={styles.submitBtn} htmlType="submit">
              Submit your review
            </Button>
          </div>
        </Form>
      </Modal>
      <Button
        className={styles.writeBtn}
        onClick={() => setIsWriteModalOpen(true)}
      >
        WRITE A REVIEW
      </Button>
      <div className={styles.reviewList}>
        {info.reviews?.length &&
          info.reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
      </div>
    </div>
  );
};

export default ReviewTab;
