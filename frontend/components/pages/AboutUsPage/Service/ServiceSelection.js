import { Divider } from "antd";

import { SERVICE_LIST } from "./Service";

import styles from "./Service.module.scss";

const ServiceSelection = ({ selectedService, onChange }) => {
  return (
    <div className={styles.serviceList}>
      <div
        className={`${styles.service} ${
          selectedService === SERVICE_LIST.CATERING && styles.active
        }`}
        onClick={() => onChange(SERVICE_LIST.CATERING)}
      >
        <div className={styles.serviceName}>CATERING</div>
        We offer a variety of caterers who can work to a budget and food
        preference.
      </div>

      <Divider />
      <div
        className={`${styles.service} ${
          selectedService === SERVICE_LIST.TRANSPORTATION && styles.active
        }`}
        onClick={() => onChange(SERVICE_LIST.TRANSPORTATION)}
      >
        <div className={styles.serviceName}>TRANSPORTATION</div>
        Select a mode of transport to and from the airport or office.
      </div>
      <Divider />

      <div
        className={`${styles.service} ${
          selectedService === SERVICE_LIST.CLEANING && styles.active
        }`}
        onClick={() => onChange(SERVICE_LIST.CLEANING)}
      >
        <div className={styles.serviceName}>Cleaning</div>
        Consistent maintenance for the duration of your stay.
      </div>
    </div>
  );
};

export default ServiceSelection;
