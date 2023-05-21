import { useState } from "react";
import styles from "./Service.module.scss";
import ServiceSelection from "./ServiceSelection";
import { isMobile } from "@/utils/utils";

export const SERVICE_LIST = {
  CLEANING: { image: "/homepage/cleaningService.png", name: "cleaning" },
  COOKING: { image: "/homepage/cookingService.png", name: "cooking" },
  PICKUP: { image: "/homepage/pickupService.png", name: "pickup" },
};
const Service = () => {
  const [selectedService, setSelectedService] = useState(SERVICE_LIST.CLEANING);

  const onSelectService = (service) => {
    setSelectedService(service);
  };

  return (
    <div className={styles.serviceContainer}>
      {isMobile() && (
        <div className="w-full">
          <h4>CONCIERGE SERVICES</h4>
          <div className={styles.subTitle}>
            Let us help you have a great stay. Whatever your needs we can help,
            from babysitters to personal chefs to transportation and luxury
            cruises we can help you.
          </div>
        </div>
      )}
      <img src={selectedService?.image} />

      <div className={styles.serviceSelection}>
        {!isMobile() && (
          <>
            <h4>CONCIERGE SERVICES</h4>
            <div className={styles.subTitle}>
              Let us help you have a great stay. Whatever your needs we can
              help, from babysitters to personal chefs to transportation and
              luxury cruises we can help you.
            </div>
          </>
        )}
        <ServiceSelection
          selectedService={selectedService}
          onChange={onSelectService}
        />
      </div>
    </div>
  );
};

export default Service;
