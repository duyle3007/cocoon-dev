import { useState } from "react";
import styles from "./SayAboutUs.module.scss";
import { isMobile } from "@/utils/utils";

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
  const [selectedCustomer, setSelectedCustomer] = useState(CUSTOMERS[0]);

  const onNext = () => {
    const findCurrentOne = CUSTOMERS.findIndex(
      (customer) => customer.id === selectedCustomer.id
    );
    setSelectedCustomer(
      findCurrentOne < CUSTOMERS.length - 1
        ? CUSTOMERS[findCurrentOne + 1]
        : CUSTOMERS[0]
    );
  };

  const onPrev = () => {
    const findCurrentOne = CUSTOMERS.findIndex(
      (customer) => customer.id === selectedCustomer.id
    );
    setSelectedCustomer(
      findCurrentOne > 0
        ? CUSTOMERS[findCurrentOne - 1]
        : CUSTOMERS[CUSTOMERS.length - 1]
    );
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
        <div className={styles.content}>
          <img src={selectedCustomer.picture} className={styles.picture} />
          {!isMobile() && (
            <>
              <div className={styles.description}>
                {selectedCustomer.description}
              </div>
              <div className={styles.name}>{selectedCustomer.name}</div>
            </>
          )}
        </div>
        <img
          src="/rightArrow.png"
          className={styles.rightArrow}
          onClick={onNext}
        />
      </div>
      {isMobile() && (
        <>
          <div className={styles.description}>
            {selectedCustomer.description}
          </div>
          <div className={styles.name}>{selectedCustomer.name}</div>
        </>
      )}
    </div>
  );
};

export default SayAboutUs;
