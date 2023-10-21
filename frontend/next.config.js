const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  serverRuntimeConfig: {
    instagramCookie: process.env.INSTAGRAM_COOKIE,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
  },
  publicRuntimeConfig: {
    wordpressAPIUrl: process.env.WORDPRESS_API_URL,
    contactFormAPIUrl: process.env.CONTACT_FORM_API_URL,
    contactFormId: process.env.CONTACT_FORM_ID,
    motopressAPIUrl: process.env.MOTOPRESS_API_URL,
    motopressUsername: process.env.NEXT_PUBLIC_MOTOPRESS_USERNAME,
    motopressPassword: process.env.NEXT_PUBLIC_MOTOPRESS_PASSWORD,
    recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
  },
};

module.exports = nextConfig;
