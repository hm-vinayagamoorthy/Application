/** @type {import('next').NextConfig} */
export default {
  experimental: {
   reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SECRET_SANTA_API: process.env.NEXT_PUBLIC_SECRET_SANTA_API,
  },
  }
};