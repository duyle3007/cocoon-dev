const { submitContactForm } = require("../../lib/api");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    address,
    destination,
    location,
    message,
  } = req.body;

  try {
    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      address,
      destination,
      location,
      message,
    };
    const response = await submitContactForm(data);
    if (response.status === 200 && response.data.status === "mail_sent") {
      res.status(200).json({
        message: "Successful",
        data: response.data,
      });
    } else {
      res.status(500).json({
        message: response.data.message,
        status: response.data.status,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
