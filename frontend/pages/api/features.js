// const { fetchAllFeatures } = require("../../lib/api");

export default async function handler(req, res) {
  try {
    // TODO: Fetch data from server
    // const response = await fetchAllTags();
    res.status(200).json({
      message: "Successful",
      data: [{
        id: 1,
        label: "Air Conditioning",
        value: "Air Conditioning",
      }, {
        id: 2,
        label: "Swimming Pool",
        value: "Swimming Pool",
      }, {
        id: 3,
        label: "Gym",
        value: "Gym",
      }, {
        id: 4,
        label: "Jacuzzi",
        value: "Jacuzzi",
      }, {
        id: 5,
        label: "BBQ Grill",
        value: "BBQ Grill",
      }, {
        id: 6,
        label: "Water Views",
        value: "Water Views",
      }]
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
