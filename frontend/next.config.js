const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  serverRuntimeConfig: {
    instagramCookie: process.env.INSTAGRAM_COOKIE,
  },
  publicRuntimeConfig: {
    wordpressAPIUrl: process.env.WORDPRESS_API_URL,
    motopressAPIUrl: process.env.MOTOPRESS_API_URL,
    motopressUsername: process.env.NEXT_PUBLIC_MOTOPRESS_USERNAME,
    motopressPassword: process.env.NEXT_PUBLIC_MOTOPRESS_PASSWORD,
  }
};

module.exports = nextConfig;
