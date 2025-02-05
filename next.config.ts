import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/libs/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // experimental: {
  //   dynamicIO: true,
  // },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default withNextIntl(nextConfig);
