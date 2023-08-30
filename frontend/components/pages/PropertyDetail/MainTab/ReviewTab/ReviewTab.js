import {
  Button,
  Form,
  Rate,
  Input,
  Checkbox,
  Modal,
  notification,
  Spin,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

import Image from "@/components/Image/Image";

import styles from "./ReviewTab.module.scss";

const { TextArea } = Input;

const ReviewCard = ({ review }) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewTitle}>
        <div className="flex gap-5 items-center">
          <Image
            src={review.avatar}
            fallback={"/avatarPlaceholder.png"}
            className={styles.avatarReview}
          />
          <div className="flex flex-col gap-2">
            <div className="uppercase">{review.title}</div>
            <Rate value={review.rate} disabled />
          </div>
        </div>

        <div className={styles.date}>{review.date}</div>
      </div>

      <div className={styles.description}>{review.review}</div>
      <div className="uppercase">{review.name}</div>
    </div>
  );
};
const ReviewTab = ({ info }) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (info) {
      getReviewList();
    }
  }, [info]);

  const getReviewList = async () => {
    setLoading(true);
    try {
      const {
        data: { data: reviewList },
      } = await axios.get("/api/review", {
        params: {
          accommodationTypeId: info.id,
        },
      });
      setReviewList(reviewList);
    } catch (e) {
      console.log("Fetch review error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const onWriteReview = async ({ name, email, review, rating }) => {
    setLoading(true);
    try {
      await axios.post("/api/createReview", {
        name,
        email,
        review,
        rating,
        accommodationTypeId: info.id,
      });
      await getReviewList();
      setIsWriteModalOpen(false);
      notification.success({ message: "Create review successfully" });
    } catch (e) {
      console.log("review error", e);
      notification.error({
        message: e?.message || "Something went wrong when writing review",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className={styles.reviewTab}>
        <Modal
          title={null}
          open={isWriteModalOpen}
          onCancel={() => setIsWriteModalOpen(false)}
          wrapClassName={styles.writeModal}
          footer={null}
          closable={false}
        >
          <Spin spinning={loading}>
            <h4>PROPERTY REVIEW</h4>
            <Form
              layout="vertical"
              initialValues={{ rating: 3 }}
              onFinish={onWriteReview}
            >
              <div className="flex justify-between items-center">
                Property quality
                <Form.Item name="rating">
                  <Rate />
                </Form.Item>
              </div>
              <Form.Item name="review">
                <TextArea
                  rows={4}
                  placeholder="Input your review"
                  prefix={
                    <Image
                      src="/map/peopleIcon.svg"
                      className={styles.inputPrefix}
                    />
                  }
                  className="resize-none mt-4 mb-6"
                />
              </Form.Item>
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
                      type: "email",
                      message: "Please input a valid email!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <Image
                        src="/emailIcon.svg"
                        className={styles.inputPrefix}
                      />
                    }
                    placeholder="Input your email"
                    className={styles.formInput}
                  />
                </Form.Item>
              </div>
              <Form.Item
                name="remember"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please confirm!",
                //   },
                // ]}
              >
                <Checkbox className="my-6">
                  This review is based on my own experience and is my genuine
                  opinion.
                </Checkbox>
              </Form.Item>

              <div className="grid grid-cols-2 gap-6">
                <Button onClick={() => setIsWriteModalOpen(false)}>
                  Cancel
                </Button>
                <Button className={styles.submitBtn} htmlType="submit">
                  Submit your review
                </Button>
              </div>
            </Form>
          </Spin>
        </Modal>
        <Button
          className={styles.writeBtn}
          onClick={() => setIsWriteModalOpen(true)}
        >
          WRITE A REVIEW
        </Button>
        <div className={styles.reviewList}>
          {reviewList.length > 0 &&
            reviewList.map((review, index) => (
              <ReviewCard key={index} review={review?.acf} />
            ))}
        </div>
      </div>
    </Spin>
  );
};

export default ReviewTab;
