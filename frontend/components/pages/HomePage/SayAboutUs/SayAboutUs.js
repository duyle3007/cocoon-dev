import { useRef, useState } from "react";
import { isMobile } from "@/utils/utils";
import { Carousel } from "antd";

import Slideshow from "@/components/pages/HomePage/Slideshow/Slideshow";

import styles from "./SayAboutUs.module.scss";

const CUSTOMERS = [
  {
    id: 1,
    name: "Barry Whyte - DECODED, LONDON",
    picture: "/homepage/barry-whyte.jpg",
    description:
      "I hosted my executive team from London, New York, San Francisco and Hamburg for 1 week at Mosman Waterfront. It was an unforgettable experience for them and a wonderful way to showcase Sydney and the perfect way to create a truly galvanising environment.",
  },
  {
    id: 2,
    name: "Samual Sida - SYDNEY",
    picture: "/homepage/samual-sida.jpg",
    description:
      "I have booked a property in Palm Beach with Cocoon. The service was tailored to my need and very professional. Highly recommended company. ",
  },
  {
    id: 3,
    name: "Gabriella McGrail - SYDNEY",
    picture: "/homepage/gabriella-mcgrail.jpg",
    description: "Super helpful and accommodating. ",
  },
];
const SayAboutUs = () => {
  const carouselRef = useRef();

  const [selectedCustomer, setSelectedCustomer] = useState(CUSTOMERS[0]);

  const onNext = (e) => {
    e.preventDefault();
    carouselRef.current.next();
  };

  const onPrev = (e) => {
    e.preventDefault();
    carouselRef.current.prev();
  };

  return (
    <div className={styles.sayAboutUs}>
      <div className={styles.title}>WHAT THEY SAY ABOUT US?</div>
      <div className={styles.carousel}>
        <img
          src="/leftArrow.png"
          className={styles.leftArrow}
          onClick={onPrev}
        />
        <Carousel ref={carouselRef} className={styles.carouselContent}>
          {CUSTOMERS.map((customer) => (
            <div key={customer.id} className={styles.content}>
              <img src={customer.picture} className={styles.picture} />
              <>
                <div className={styles.description}>{customer.description}</div>
                <div className={styles.name}>{customer.name}</div>
              </>
            </div>
          ))}
        </Carousel>

        <img
          src="/rightArrow.png"
          className={styles.rightArrow}
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default SayAboutUs;
