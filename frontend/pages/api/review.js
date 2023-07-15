const { fetchReviews } = require("../../lib/api");

export default async function handler(req, res) {
  const { email, accommodationTypeId } = req.query;
  try {
    const response = await fetchReviews(email, accommodationTypeId);
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
