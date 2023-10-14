"use server";

import axios from "axios";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

export async function verifyCaptcha(token) {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${serverRuntimeConfig.recaptchaSecretKey}&response=${token}`
  );
  if (res.data.success) {
    return "success!";
  } else {
    throw new Error("Failed Captcha");
  }
}
