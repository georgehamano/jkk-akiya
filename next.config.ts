import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jhomes.to-kousya.or.jp",
        pathname: "/mz_copyright/**",
      },
    ],
  },
};

export default nextConfig;
