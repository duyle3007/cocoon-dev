import countries from "./country.json";

export function isMobile() {
  let isMobile = false;

  if (typeof window !== "undefined" && window.outerWidth < 768) {
    isMobile = true;
  }

  return isMobile;
}

export const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
};

export const getCountryList = () => {
  return countries;
};
