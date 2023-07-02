const { fetchBookingsByDate } = require("../../lib/api");

export default async function handler(req, res) {
  const {startDate, endDate, accommodation_type} = req.query;
  try {
    const response = await fetchBookingsByDate(accommodation_type, startDate, endDate);
    res.status(200).json({
      message: "Successful",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
