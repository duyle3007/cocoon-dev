const axios = require("axios");
const qs = require("qs");
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
  const { token } = req.body;

  // Verify the captcha token with Google reCAPTCHA API
  const url = "https://www.google.com/recaptcha/api/siteverify";
  const data = qs.stringify({
    secret: serverRuntimeConfig.recaptchaSecretKey,
    response: token,
  });
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  try {
    const response = await axios.post(url, data, config);
    const { success } = response.data;
    if (success) {
      res.status(200).json({ message: "Captcha verification successful" });
    } else {
      res.status(400).json({ message: "Captcha verification failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
