const { fetchAllTags } = require("../../lib/api");

export default async function handler(req, res) {
  try {
    const response = await fetchAllTags();
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
