import styles from "./Intro.module.scss";

const Intro = () => {
  return (
    <div className={styles.intro}>
      <div className={styles.introContainer}>
        <div className={styles.leftContent}>
          <div className={styles.title}>COCOON CORPORATE</div>
          <div className={styles.description}>
            Cocoon Luxury Properties offer the ultimate venue for your corporate
            functions and events. Be it an intimate lunch on the harbour, or a
            four-day retreat for the team on a Estate in Cattai, Cocoon caters
            to your organisation&apos;s every need. We have selected the most
            exclusive properties that money can buy. As you would expect, the
            services and delivery that accompany are as good as the venues
            themselves.
          </div>
        </div>
        <img src="/homepage/intro.png" />
      </div>
    </div>
  );
};

export default Intro;
