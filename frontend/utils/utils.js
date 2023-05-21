import { useEffect, useMemo, useState } from "react";

export function isMobile() {
  let isMobile = false;

  if (typeof window !== "undefined" && window.outerWidth < 768) {
    isMobile = true;
  }

  return isMobile;
}
