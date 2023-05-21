import { useState } from "react";

import ServiceSelection from "./ServiceSelection";
import { isMobile } from "@/utils/utils";

import styles from "./Service.module.scss";

export const SERVICE_LIST = {
  CATERING: { image: "/homepage/cateringService.png", name: "catering" },
  TRANSPORTATION: { image: "/homepage/pickupService.png", name: "transport" },
  CLEANING: { image: "/homepage/cleaningService.png", name: "cleaning" },
};
const Service = () => {
  const [selectedService, setSelectedService] = useState(SERVICE_LIST.CATERING);

  const onSelectService = (service) => {
    setSelectedService(service);
  };

  return (
    <div className={styles.serviceContainer}>
      <div className={styles.extra}>
        {isMobile() && (
          <div className="w-full">
            <h4>EXTRAS</h4>
            <div className={styles.subTitle}>
              We work with you on your requirements and ensure everything is
              exactly as you need it for a perfect event.
            </div>
          </div>
        )}
        <img src={selectedService?.image} />

        <div className={styles.serviceSelection}>
          {!isMobile() && (
            <>
              <h4>EXTRAS</h4>
              <div className={styles.subTitle}>
                We work with you on your requirements and ensure everything is
                exactly as you need it for a perfect event.
              </div>
            </>
          )}
          <ServiceSelection
            selectedService={selectedService}
            onChange={onSelectService}
          />
        </div>
      </div>
    </div>
  );
};

export default Service;
