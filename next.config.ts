import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // webpackMemoryOptimizations: true,
    typedRoutes: true,
  },
  reactStrictMode: true, // Active une vérification plus stricte (optionnel)
  compiler: {
    styledComponents: true, // Peut corriger certains problèmes liés aux entités dans les styles
  },
};

export default nextConfig;
