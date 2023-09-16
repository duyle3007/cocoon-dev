// const { fetchAllFeatures } = require("../../lib/api");

export default async function handler(req, res) {
  try {
    // const response = await fetchAllTags();
    res.status(200).json({
      message: "Successful",
      data: [{
        id: 1,
        name: "Air Conditioning",
      }, {
        id: 2,
        name: "Swimming Pool",
      }, {
        id: 3,
        name: "Gym",
      }, {
        id: 4,
        name: "Jacuzzi",
      }, {
        id: 5,
        name: "BBQ Grill",
      }, {
        id: 6,
        name: "Water Views",
      }]
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
