import axios from "axios";
import FormData from "form-data";
import moment from "moment";
import Error from "next/error";

const MOTOPRESS_API_URL = process.env.MOTOPRESS_API_URL;
const MOTOPRESS_USERNAME = process.env.NEXT_PUBLIC_MOTOPRESS_USERNAME;
const MOTOPRESS_PASSWORD = process.env.NEXT_PUBLIC_MOTOPRESS_PASSWORD;

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;
const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME;
const WORDPRESS_PASSWORD = process.env.WORDPRESS_PASSWORD;

const CONTACT_FORM_API_URL = process.env.CONTACT_FORM_API_URL;
const CONTACT_FORM_ID = process.env.CONTACT_FORM_ID;

async function fetchApi(url, method, params, data, typeOfApi = "motopress") {
  let encodedCredentials;
  if (typeOfApi == "motopress") {
    encodedCredentials = Buffer.from(
      `${MOTOPRESS_USERNAME}:${MOTOPRESS_PASSWORD}`
    ).toString("base64");
  }
  if (typeOfApi == "wordpress") {
    encodedCredentials = Buffer.from(
      `${WORDPRESS_USERNAME}:${WORDPRESS_PASSWORD}`
    ).toString("base64");
  }
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
    params,
    {},
    "wordpress"
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

async function fetchRateById(rateId) {
  if (!rateId) {
    throw new Error("Rate Id is required");
  }
  const rate = await fetchApi(`${MOTOPRESS_API_URL}/rates/${rateId}`, "GET");
  return rate ?? {};
}

async function fetchRateByAccommodationTypeId(accommodationTypeId) {
  if (!accommodationTypeId) {
    throw new Error("Accommodation Type Id is required");
  }
  const params = {
    filter: {
      meta_query: [
        {
          key: "mphb_room_type_id",
          value: accommodationTypeId,
          compare: "=",
        },
      ],
    },
  };
  const rates = await fetchApi(`${MOTOPRESS_API_URL}/rates`, "GET", params);
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
    const accommodationType = await fetchAccommodationTypeByWPApi(
      accommodationTypeId
    );
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
  let accommodationTypesByTag = [];
  const {
    tags = [],
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
    params,
    {},
    "wordpress"
  );
  if (tags.length > 0) {
    const motopressParams = {
      filter: {
        mphb_room_type_tag: tags,
      },
    };
    const motopressResponse = await fetchApi(
      `${MOTOPRESS_API_URL}/accommodation_types`,
      "GET",
      motopressParams
    );
    accommodationTypesByTag = [...motopressResponse];
  }

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

  let results = [];
  if (tags.length > 0) {
    results = accommodationTypes.filter((a) =>
      accommodationTypesByTag.some((b) => a.id === b.id)
    );
  } else {
    results = accommodationTypes;
  }

  return results;
}

async function fetchAllTags() {
  const response = await fetchApi(
    `${MOTOPRESS_API_URL}/accommodation_types/tags`,
    "GET"
  );
  return response;
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
    params,
    {},
    "wordpress"
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
    _fields: ["id", "title", "acf", "status"],
    search: email,
  };
  const response = await fetchApi(
    `${WORDPRESS_API_URL}/review`,
    "GET",
    params,
    {},
    "wordpress"
  );
  if (accommodationTypeId) {
    return response.filter(
      (item) =>
        (item.acf.mphb_room_type[0] == accommodationTypeId ||
          item.acf.mphb_room_type == accommodationTypeId) &&
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
    title: email + " wrote a review on " + new Date().toISOString(),
    acf: {
      email: email,
      name: name,
      review: review,
      rate: rating,
      mphb_room_type: [Number(accommodationTypeId)],
      reviewStatus: "approved",
    },
    status: "publish",
  };
  const response = await fetchApi(
    `${WORDPRESS_API_URL}/review`,
    "POST",
    {},
    body,
    "wordpress"
  );
  return response;
}

async function fetchInstagramPosts(limit = 4) {
  const params = {
    _fields: ["id", "title", "acf", "status"],
    limit,
  };
  const response = await fetchApi(
    `${WORDPRESS_API_URL}/instagram-post`,
    "GET",
    params,
    {},
    "wordpress"
  );
  return response;
}

async function fetchMedia(id) {
  const response = await fetchApi(
    `${WORDPRESS_API_URL}/media/${id}`,
    "GET",
    {},
    {},
    "wordpress"
  );
  return response;
}

async function fetchMediaList(ids) {
  const response = await fetchApi(
    `${WORDPRESS_API_URL}/media`,
    "GET",
    {
      include: ids,
    },
    {},
    "wordpress"
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

async function fetchAllSeasons() {
  const seasons = await fetchApi(`${MOTOPRESS_API_URL}/seasons`, "GET");
  return seasons ?? [];
}

async function fetchSeasonById(seasonId) {
  if (!seasonId) {
    throw new Error("Season Id is required");
  }
  const season = await fetchApi(
    `${MOTOPRESS_API_URL}/seasons/${seasonId}`,
    "GET"
  );
  return season ?? {};
}

async function createRateForAccommodationType(
  accommodationTypeId,
  title,
  seasonPrices
) {
  if (!accommodationTypeId) {
    throw new Error("Accommodation Type Id is required");
  }
  if (!seasonPrices) {
    throw new Error("Season Prices is required");
  }
  const createdData = {
    accommodation_type_id: accommodationTypeId,
    title: title,
    status: "active",
    season_prices: seasonPrices,
  };
  const response = await fetchApi(
    `${MOTOPRESS_API_URL}/rates`,
    "POST",
    {},
    createdData,
    "motopress"
  );
  return response;
}

async function createAccommodationType(input) {
  const {
    title,
    description,
    excerpt,
    adults,
    children,
    totalCapacity,
    bedType,
    size,
    view,
    services = [],
    categories = [],
    tags = [],
    amenities = [],
    attributes = [],
    villaType,
    startingPrice = 3500,
    beds = 1,
    noOfBedrooms = 4,
    noOfBathrooms = 5,
    guests = 6,
    minOfNights = 7,
    features = [],
    tagLine = "",
    details = "",
    country = "Australia",
    location1 = "",
    location2 = "",
    lat = 10.7330408,
    long = 106.7366513,
    videos,
    bedroomList,
  } = input;

  if (!title) {
    throw new Error("Title is required");
  }

  const data = {
    title: title,
    description: description,
    adults: adults,
    children: children,
    excerpt: excerpt,
    total_capacity: totalCapacity,
    bed_type: bedType,
    size: size,
    view: view,
    services: services,
    categories: categories,
    tags: tags,
    amenities: amenities,
    attributes: attributes,
  };
  // Create accommodation type by WP API
  const createdAccommodationType = await fetchApi(
    `${MOTOPRESS_API_URL}/accommodation_types`,
    "POST",
    {},
    data,
    "motopress"
  );
  let updatedAccommodationType;
  if (createdAccommodationType) {
    //Create accommodation by Motopress API related to accommodation type
    await fetchApi(
      `${MOTOPRESS_API_URL}/accommodations`,
      "POST",
      {},
      {
        title: title,
        excerpt: excerpt,
        accommodation_type_id: createdAccommodationType.id,
      },
      "motopress"
    );
    //Update acf fields of accommodation type by WP API
    updatedAccommodationType = await fetchApi(
      `${WORDPRESS_API_URL}/mphb_room_type/${createdAccommodationType.id}`,
      "POST",
      {},
      {
        acf: {
          starting_price: startingPrice,
          beds: beds,
          no_of_bedrooms: noOfBedrooms,
          no_of_bathrooms: noOfBathrooms,
          guests: guests,
          min_of_nights: minOfNights,
          features: features,
          tag_line: tagLine,
          description: description,
          details: details,
          videos: videos,
          bedroom_list: bedroomList,
          country: country,
          location1: location1,
          location2: location2,
          lat: lat,
          long: long,
          villa_type: villaType,
        },
      },
      "wordpress"
    );
  }

  //Create rate for accommodation type for each season
  const seasons = await fetchAllSeasons();
  let createdRate;
  if (seasons.length > 0) {
    let seasonCounter = 0;
    let currentDate = new Date();
    const seasonPrices = [];
    for (const season of seasons) {
      seasonCounter++;
      if (
        moment(currentDate).isSameOrAfter(season.start_date) &&
        moment(currentDate).isSameOrBefore(season.end_date)
      ) {
        seasonPrices.push({
          priority: 0,
          base_price: startingPrice ?? 0,
          season_id: season.id,
          variations: [
            {
              adults: adults ?? 0,
              children: children ?? 0,
              price: startingPrice ?? 0,
            },
          ],
        });
      } else {
        seasonPrices.push({
          priority: seasonCounter,
          base_price: startingPrice ?? 0,
          season_id: season.id,
          variations: [
            {
              adults: adults ?? 0,
              children: children ?? 0,
              price: startingPrice ?? 0,
            },
          ],
        });
      }
    }
    createdRate = await createRateForAccommodationType(
      updatedAccommodationType.id,
      title,
      seasonPrices
    );
  }
  return {
    ...updatedAccommodationType,
    rates: {
      ...createdRate,
    },
  };
}

async function submitContactForm(data) {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    country,
    address,
    destination,
    location,
    message,
  } = data;
  if (!firstName) {
    throw new Error("First name is required");
  }
  if (!lastName) {
    throw new Error("Last name is required");
  }
  if (!phoneNumber) {
    throw new Error("Phone is required");
  }
  if (!email) {
    throw new Error("Email is required");
  }
  if (!country) {
    throw new Error("Country is required");
  }

  try {
    const formData = new FormData();
    formData.append("first-name", firstName);
    formData.append("last-name", lastName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("address", address || "");
    formData.append("destination", destination || "");
    formData.append("location", location || "");
    formData.append("message", message || "");
    const response = await axios.post(
      `${CONTACT_FORM_API_URL}/contact-forms/${CONTACT_FORM_ID}/feedback`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

module.exports = {
  fetchApi,
  fetchAccommodations,
  fetchRates,
  fetchRateById,
  fetchRateByAccommodationTypeId,
  fetchBookingsByDate,
  fetchLocations,
  fetchReviews,
  fetchAllTags,
  fetchAllSeasons,
  fetchSeasonById,
  fetchInstagramPosts,
  fetchMedia,
  fetchMediaList,
  calculatePriceByDateRange,
  searchAccommodationType,
  checkAvailableAccommodationForBooking,
  createBooking,
  createReviews,
  createAccommodationType,
  submitContactForm,
};
