import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    // Keep links to the previous version of the site working.
    return [
      { source: "/gallery", destination: "/artwork", permanent: true },
      { source: "/gallery/:path*", destination: "/artwork", permanent: true },
      { source: "/art", destination: "/artwork", permanent: true },
      { source: "/art/:path*", destination: "/artwork", permanent: true },
    ];
  },
};

export default nextConfig;
