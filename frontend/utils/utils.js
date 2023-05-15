import { useEffect, useState } from "react";

export function isMobile() {
  // Use the window.innerWidth property to check the viewport width
  // and determine if the device has a responsive design
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.outerWidth < 768);
    }
  });

  return isMobile;
}
