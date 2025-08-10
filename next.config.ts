import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-fusion.imgcdn.store',
        port: '',
        pathname: '/**',
      },
    ],
    // 添加更多配置来处理图片加载问题
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    // 增加超时时间
    minimumCacheTTL: 60,
  },
  // 添加头部配置来处理CORS问题
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
