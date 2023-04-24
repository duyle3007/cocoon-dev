import { Divider } from "antd";

import { SERVICE_LIST } from "./Service";

import styles from "./Service.module.scss";

const ServiceSelection = ({ selectedService, onChange }) => {
  return (
    <div className={styles.serviceList}>
      <div
        className={`${styles.service} ${
          selectedService === SERVICE_LIST.CLEANING && styles.active
        }`}
        onClick={() => onChange(SERVICE_LIST.CLEANING)}
      >
        <div className={styles.serviceName}>Cleaning</div>
        Extra Cleaning when you need it.
      </div>

      <Divider />
      <div
        className={`${styles.service} ${
          selectedService === SERVICE_LIST.COOKING && styles.active
        }`}
        onClick={() => onChange(SERVICE_LIST.COOKING)}
      >
        <div className={styles.serviceName}>Cooking</div>
        Catering & Personal Chefs.
      </div>

      <Divider />
      <div
        className={`${styles.service} ${
          selectedService === SERVICE_LIST.PICKUP && styles.active
        }`}
        onClick={() => onChange(SERVICE_LIST.PICKUP)}
      >
        <div className={styles.serviceName}>Airport pickups</div>
        Airport pickups, car, boat and plane hire.
      </div>
    </div>
  );
};

export default ServiceSelection;
