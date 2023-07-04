const { calculatePriceByDateRange } = require("../../lib/api");

export default async function handler(req, res) {
  const { startDate, endDate, accommodationTypeId } = req.query;
  try {
    const response = await calculatePriceByDateRange(
      accommodationTypeId,
      startDate,
      endDate
    );
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
