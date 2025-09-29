import type { NextConfig } from "next";

// manually set root option
// https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#root-directory
const path = require('path')
module.exports = {
  turbopack: {
    root: path.join(__dirname, '..'),
  },
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
