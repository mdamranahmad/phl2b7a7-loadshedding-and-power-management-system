import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    output: "export", // For static build, for faster site
    images: { unoptimized: true },
};

export default nextConfig;
