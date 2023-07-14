const { fetchLocations } = require("../../lib/api");

export default async function handler(req, res) {
  const { slug } = req.query;
  try {
    const response = await fetchLocations({ slug });
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
