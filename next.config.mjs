/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/uniboard",
        destination: "/uniboard/home",
        permanent: true,
      },
      // {
      //   source: "/uniboard/my-resume",
      //   destination: "/uniboard/my-resume/skills",
      //   permanent: true,
      // },
      // {
      //   source: "/uniboard/linkedin-optimisation/profile-building",
      //   destination: "/uniboard/linkedin-optimisation/profile-building/profile-picture",
      //   permanent: true,
      // },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      { protocol: "http", hostname: "localhost" },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // React PDF (https://github.com/wojtekmaj/react-pdf?tab=readme-ov-file#nextjs)
    config.resolve.alias.canvas = false;
    return config;

  },
  reactStrictMode: false,
};

export default nextConfig;
