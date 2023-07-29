import axios from "axios";
import moment from "moment";
import Error from "next/error";

const MOTOPRESS_API_URL = process.env.MOTOPRESS_API_URL;
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

async function fetchApi(url, method, params, data) {
  const encodedCredentials = Buffer.from(
    `${process.env.NEXT_PUBLIC_MOTOPRESS_USERNAME}:${process.env.NEXT_PUBLIC_MOTOPRESS_PASSWORD}`
  ).toString("base64");
  const authHeader = `Basic ${encodedCredentials}`;

  const options = {
    method: method,
  };
  if (method == "GET" && params) {
    options.params = params;
  }
  if (method == "POST" || method == "PUT") {
    options.data = JSON.stringify(data);
  }
  try {
    const response = await axios({
      url: url,
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });
    return response?.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("An error occurred while processing the request");
    }
  }
}

async function fetchAccommodationTypeByWPApi(accommodationTypeId) {
  const params = {
    _fields: ["slug", "id", "title", "acf"],
  };
  return await fetchApi(
    `${WORDPRESS_API_URL}/mphb_room_type/${accommodationTypeId}`,
    "GET",
    params
  );
}

async function fetchAccommodations() {
  const accommodations = await fetchApi(
    `${MOTOPRESS_API_URL}/accommodations`,
    "GET"
  );
  return accommodations ?? [];
}

async function fetchRates() {
  const rates = await fetchApi(`${MOTOPRESS_API_URL}/rates`, "GET");
  return rates ?? [];
}

async function getCurrentSeason() {
  const seasons = (await fetchApi(`${MOTOPRESS_API_URL}/seasons`, "GET")) ?? [];
  const currentDate = new Date();
  let currentSeason;
  for (const item of seasons) {
    if (
      moment(currentDate).isSameOrAfter(item.start_date) &&
      moment(currentDate).isSameOrBefore(item.end_date)
    ) {
      currentSeason = item;
    }
  }
  return currentSeason;
}

async function createBooking(bookingData) {
  const {
    accommodationTypeId,
    checkInDate,
    checkOutDate,
    numberOfAdult,
    numberOfChild,
    firstName = "",
    lastName = "",
    email = "",
    phone = "",
    address = "",
    country = "",
    state = "",
    city = "",
    zip = "",
    message = "",
  } = bookingData;

  const data = {
    check_in_date: checkInDate,
    check_out_date: checkOutDate,
    customer: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      address1: address,
      country,
      state,
      city,
      postCode: zip,
    },
    reserved_accommodations: [],
    note: message,
  };
  if (numberOfAdult == 0) {
    throw new Error("At least one adult is required");
  }
  const rates = await fetchRates();
  if (rates) {
    let rate;
    for (let item of rates) {
      if (
        item.accommodation_type_id == accommodationTypeId &&
        item.status == "active"
      ) {
        rate = item;
        break;
      }
    }
    if (!rate) {
      throw new Error("Accommodation has no rate");
    }
  }
  const accommodations = await fetchAccommodations();
  if (accommodations) {
    let accommodation;
    for (let item of accommodations) {
      if (
        item.accommodation_type_id == accommodationTypeId &&
        item.status == "publish"
      ) {
        accommodation = item;
        break;
      }
    }
    if (!accommodation) {
      throw new Error("Accommodation not found");
    }
    data.reserved_accommodations.push({
      accommodation: accommodation.id,
      adults: numberOfAdult,
      children: numberOfChild,
      guest_name: `${firstName} ${lastName}`,
      services: [],
    });
  }
  const response = await fetchApi(
    `${MOTOPRESS_API_URL}/bookings`,
    "POST",
    {},
    data
  );
  return response;
}

async function calculatePriceByDateRange(
  accommodationTypeId,
  startDate,
  endDate
) {
  if (!accommodationTypeId) {
    throw new Error("Accommodation Type Id is required");
  }
  if (!startDate || !endDate) {
    throw new Error(`${!startDate ? "Start Date" : "End Date"} is required`);
  }
  if (
    moment(startDate).isAfter(endDate) ||
    moment(endDate).isBefore(startDate)
  ) {
    throw new Error("Start Date and End Date are invalid");
  }

  let currentRate;
  let basePrice = 0;
  const numberOfDates = moment(endDate).diff(startDate, "days");

  const rates = await fetchRates();
  if (rates) {
    for (let item of rates) {
      if (
        item.accommodation_type_id == accommodationTypeId &&
        item.status == "active"
      ) {
        currentRate = item;
        break;
      }
    }
  }
  if (currentRate?.season_prices.length == 1) {
    basePrice = currentRate.season_prices[0]?.base_price ?? 0;
  } else if (currentRate?.season_prices.length > 1) {
    const currentSeason = await getCurrentSeason();
    const selectedSeason = currentRate?.season_prices.find(
      (item) => item.season_id == currentSeason.id
    );
    basePrice = selectedSeason?.base_price ?? 0;
  } else {
    const accommodationType = await fetchAccommodationTypeByWPApi(accommodationTypeId);
    basePrice = accommodationType?.acf?.starting_price ?? 0;
  }
  return {
    checkInDate: moment(startDate).format("Y-MM-D"),
    checkOutDate: moment(endDate).format("Y-MM-D"),
    dates: numberOfDates,
    rateId: currentRate?.id,
    accommodationTypeId: Number(accommodationTypeId),
    price: basePrice * numberOfDates,
  };
}

async function fetchBookingsByDate(
  accommodationTypeId,
  startDate,
  endDate,
  status = ["confirmed", "pending-user", "pending-payment", "pending"]
) {
  if (!accommodationTypeId) {
    throw new Error("Accommodation Type Id is required");
  }
  if (!startDate || !endDate) {
    throw new Error(`${!startDate ? "Start Date" : "End Date"} is required`);
  }
  if (
    moment(startDate).isAfter(endDate) ||
    moment(endDate).isBefore(startDate)
  ) {
    throw new Error("Start Date and End Date are invalid");
  }

  const params = {
    filter: {
      post_status: status,
      post_type: "mphb_booking",
      mphb_room_type_id: accommodationTypeId,
      meta_query: [
        {
          key: "mphb_check_in_date",
          value: new Date(startDate),
          compare: ">=",
        },
        {
          key: "mphb_check_out_date",
          value: new Date(endDate),
          compare: "<=",
        },
      ],
    },
  };

  const response =
    (await fetchApi(`${MOTOPRESS_API_URL}/bookings`, "GET", params)) ?? [];
  const result = response
    .filter(
      (item) =>
        item.reserved_accommodations[0]?.accommodation_type ==
        accommodationTypeId
    )
    .map((item) => {
      delete item.customer;
      return item;
    });
  return result;
}

async function checkAvailableAccommodationForBooking(startDate, endDate) {
  const params = {
    check_in_date: startDate,
    check_out_date: endDate,
    accommodation_type: 0,
  };
  const response = await fetchApi(
    `${MOTOPRESS_API_URL}/bookings/availability`,
    "GET",
    params
  );
  return response;
}

async function searchAccommodationType(input) {
  const orderValues = ["asc", "desc"];
  const orderByValues = [
    "author",
    "date",
    "id",
    "include",
    "modified",
    "parent",
    "relevance",
    "slug",
    "include_slugs",
    "title",
    "menu_order",
    "price",
  ];
  let availableAccommodation = [];
  const {
    searchStr = "",
    features = [],
    villaType = "",
    country = "",
    noOfBedrooms,
    noOfBathrooms,
    startDate,
    endDate,
    slug,
    beds,
    priceStart,
    priceEnd,
    guests,
    mphb_room_type_category,
    location1,
    location2,
    order,
    orderBy,
  } = input;

  const params = {
    name: searchStr,
    _fields: ["slug", "mphb_room_type_category", "date", "acf", "title", "id"],
    villa_type: villaType,
    features: features,
    country: country,
    status: "publish",
    slug: slug,
    mphb_room_type_category: mphb_room_type_category,
    price_start: priceStart,
    price_end: priceEnd,
    location1: location1,
    location2: location2,
    order: orderValues.includes(order) ? order : orderValues[1],
    orderby: orderByValues.includes(orderBy) ? orderBy : orderByValues[1],
  };
  const response = await fetchApi(
    `${WORDPRESS_API_URL}/mphb_room_type`,
    "GET",
    params
  );
  let accommodationTypes = [...response];
  if (noOfBathrooms && noOfBathrooms != 0) {
    if (noOfBathrooms == "6++") {
      accommodationTypes = accommodationTypes.filter(
        (item) => item.acf.no_of_bathrooms >= 6
      );
    } else {
      accommodationTypes = accommodationTypes.filter(
        (item) => item.acf.no_of_bathrooms == noOfBathrooms
      );
    }
  }
  if (noOfBedrooms && noOfBedrooms != 0) {
    if (noOfBedrooms == "6++") {
      accommodationTypes = accommodationTypes.filter(
        (item) => item.acf.no_of_bedrooms >= 6
      );
    } else {
      accommodationTypes = accommodationTypes.filter(
        (item) => item.acf.no_of_bedrooms == noOfBedrooms
      );
    }
  }
  if (beds && beds != 0) {
    if (beds == "6++") {
      accommodationTypes = accommodationTypes.filter(
        (item) => item.acf.beds >= 6
      );
    } else {
      accommodationTypes = accommodationTypes.filter(
        (item) => item.acf.beds == beds
      );
    }
  }
  if (guests && guests != 0) {
    accommodationTypes = accommodationTypes.filter(
      (item) => item.acf.guests >= guests
    );
  }
  if (startDate && endDate) {
    availableAccommodation = await checkAvailableAccommodationForBooking(
      startDate,
      endDate
    );
    availableAccommodation?.availability.sort(
      (a, b) => a.accommodation_type - b.accommodation_type
    );
    const ids = new Set(
      availableAccommodation?.availability.map(
        (item) => item.accommodation_type
      )
    );
    accommodationTypes = accommodationTypes.filter((item) => ids.has(item.id));
  }
  return accommodationTypes;
}

async function fetchLocations(input) {
  const {
    slug,
    page = 1,
    per_page = 100,
    order = "asc",
    orderBy = "title",
  } = input;
  const params = {
    _fields: ["slug", "id", "title", "acf"],
    slug: slug,
    post_status: "publish",
    page: page,
    per_page: per_page,
    order: order,
    orderby: orderBy,
  };
  const response = await fetchApi(
    `${WORDPRESS_API_URL}/location`,
    "GET",
    params
  );
  const nestedRes = createNestedData(response);
  return slug
    ? response.map((item) => {
        return {
          key: item.id,
          label: item.title.rendered,
          slug: item.slug,
          url: `/search?destination=${item.slug}`,
        };
      })
    : removeEmptyChildren(nestedRes);
}

async function fetchReviews(email, accommodationTypeId) {
  const params = {
    _fields: ["id", "acf"],
    search: email,
  };
  const response = await fetchApi(`${WORDPRESS_API_URL}/review`, "GET", params);
  if (accommodationTypeId) {
    return response.filter(
      (item) =>
        item.acf.mphb_room_type[0] == accommodationTypeId &&
        item.acf.reviewStatus == "approved"
    );
  }
  return response;
}

async function createReviews(reviewData) {
  const { email, accommodationTypeId, review, rating, name } = reviewData;
  if (!email) {
    throw new Error("Email is required");
  }
  if (!accommodationTypeId) {
    throw new Error("Accommodation Type Id is required");
  }
  const body = {
    acf: {
      email: email,
      name: name,
      review: review,
      rate: rating,
      mphb_room_type: [Number(accommodationTypeId)],
    },
  };
  const response = await fetchApi(
    `${WORDPRESS_API_URL}/review`,
    "POST",
    {},
    body
  );
  return response;
}

function findRoots(data) {
  return data.filter((item) => !Array.isArray(item.acf.parent));
}

function findChildren(data, parentId) {
  const children = data.filter(
    (item) =>
      Array.isArray(item.acf.parent) && item.acf.parent.includes(parentId)
  );
  return children.map((child) => ({
    key: child.id,
    label: child.title.rendered,
    slug: child.slug,
    children: findChildren(data, child.id),
    url: `/search?destination=${child.slug}`,
  }));
}

function createNestedData(data, parentId = "") {
  if (parentId === "") {
    const roots = findRoots(data);
    return roots.map((root) => ({
      key: root.id,
      label: root.title.rendered,
      slug: root.slug,
      children: findChildren(data, root.id),
      url: `/search?destination=${root.slug}`,
    }));
  } else {
    return findChildren(data, parentId);
  }
}

function removeEmptyChildren(data) {
  return data.map((item) => {
    const newItem = { ...item };
    if (Array.isArray(item.children) && item.children.length > 0) {
      newItem.children = removeEmptyChildren(item.children);
    } else {
      delete newItem.children;
    }
    return newItem;
  });
}

module.exports = {
  fetchApi,
  fetchAccommodations,
  fetchRates,
  fetchBookingsByDate,
  fetchLocations,
  fetchReviews,
  calculatePriceByDateRange,
  searchAccommodationType,
  checkAvailableAccommodationForBooking,
  createBooking,
  createReviews,
};
