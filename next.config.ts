import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Ingredients section was removed; send old links to Fragrances.
  async redirects() {
    return [{ source: "/ingredients", destination: "/fragrances", permanent: true }];
  },
  images: {
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
