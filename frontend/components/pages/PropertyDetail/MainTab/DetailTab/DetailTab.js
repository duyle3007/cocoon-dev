import Image from "@/components/Image/Image";
import styles from "./DetailTab.module.scss";

const DetailTab = ({ info }) => {
  return (
    <div className={styles.detailTab}>
      <div className={styles.title}>Bedroom Configuration</div>
      <div className={styles.bedroomConfigure}>
        <div className={styles.bed}>
          <Image src="/map/bedIcon.svg" className={styles.singleBed} />
          <div className={styles.subTitle}>Bedroom 1</div>
          <span>{info.details.bedroom.bedroom1}</span>
        </div>

        <div className={styles.bed}>
          <Image src="/doubleSingleBed.svg" className={styles.doubleBed} />
          <div className={styles.subTitle}>Bedroom 2</div>
          <span>{info.details.bedroom.bedroom2}</span>
        </div>

        <div className={styles.bed}>
          <Image src="/map/bedIcon.svg" className={styles.singleBed} />
          <div className={styles.subTitle}>Bedroom 3</div>
          <span>{info.details.bedroom.bedroom3}</span>
        </div>

        <div className={styles.bed}>
          <Image src="/map/bedIcon.svg" className={styles.singleBed} />
          <div className={styles.subTitle}>Bedroom 4</div>
          <span>{info.details.bedroom.bedroom4}</span>
        </div>
      </div>
      <div className={styles.bedroomNotice}>{info.details.bedroom.notice}</div>

      <div className={styles.title}>Cocoon Concierge</div>
      <div className={styles.concierge}> {info.details.concierge}</div>

      <div className={styles.title}>The Neighbourhood</div>
      <div className={styles.concierge}> {info.details.neighbourhood}</div>

      <div className={styles.title}>Getting Around</div>
      <div className={styles.concierge}> {info.details.getArround}</div>
    </div>
  );
};

export default DetailTab;
