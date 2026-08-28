import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserPage = repoName?.endsWith(".github.io");
const basePath =
  process.env.NODE_ENV === "production" && repoName && !isUserPage
    ? `/${repoName}`
    : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
