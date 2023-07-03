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

async function createBooking(bookingData) {
  const {
    accommodationTypeId,
    checkInDate,
    checkOutDate,
    numberOfAdult,
    numberOfChild,
    firstName = "",
    lastName = "",
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

async function fetchBookingsByDate(accommodationTypeId, startDate, endDate) {
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
      post_status: ["confirmed", "pending-user", "pending-payment", "pending"],
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

module.exports = {
  fetchApi,
  fetchAccommodations,
  fetchRates,
  fetchBookingsByDate,
  createBooking,
};
