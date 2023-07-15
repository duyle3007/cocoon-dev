const { createReviews } = require("../../lib/api");

export default async function handler(req, res) {
  const data = req.body;
  try {
    const response = await createReviews(data);
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
