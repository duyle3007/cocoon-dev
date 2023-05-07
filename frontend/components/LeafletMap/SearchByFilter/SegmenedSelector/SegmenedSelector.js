import styles from "./SegmenedSelector.module.scss";

const SegmenedSelector = ({ listOption, selectedOption, onClick }) => {
  return (
    <div className={styles.segmentSelector}>
      {listOption.map((option, index) => (
        <div
          key={index}
          className={`${styles.segmentOption} ${
            selectedOption === option && styles.selectedOption
          }`}
          onClick={() => onClick(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default SegmenedSelector;
