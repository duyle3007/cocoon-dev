import { useState } from "react";
import styles from "./SayAboutUs.module.scss";

const CUSTOMERS = [
  {
    name: "BARRY WHITE - DECODED, LONDON",
    picture: "/homepage/aboutus_1.png",
    description:
      "Genuinely surprised at the speed and ease I had with Marbellapads when buying my new home in Marbella. [...] we really did buy the home of our dreams and its only because of the incredible work put in by the Marbellapads team.",
  },
];
const SayAboutUs = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(CUSTOMERS[0]);

  return (
    <div className={styles.sayAboutUs}>
      <div className={styles.title}>WHAT THEY SAY ABOUT US?</div>
      <div className={styles.carousel}>
        <img src="/leftArrow.png" className={styles.leftArrow} />
        <div className={styles.content}>
          <img src={selectedCustomer.picture} className={styles.picture} />
          <div className={styles.description}>
            {selectedCustomer.description}
          </div>
          <div className={styles.name}>{selectedCustomer.name}</div>
        </div>
        <img src="/rightArrow.png" className={styles.rightArrow} />
      </div>
    </div>
  );
};

export default SayAboutUs;
