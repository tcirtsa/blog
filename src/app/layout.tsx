import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/github.css";
import "katex/dist/katex.min.css";
import BackgroundCarousel from "@/components/BackgroundCarousel";
import Navbar from "@/components/Navbar";
import GlobalMusicPlayer from "@/components/GlobalMusicPlayer";
import { generateSEOMetadata } from "@/components/SEOHead";
import { Inter } from "next/font/google";

export const metadata: Metadata = generateSEOMetadata({
  title: "tcirtsa's Blog",
  description: "欢迎来到 tcirtsa 的博客！这里分享技术、生活和思考。",
  keywords: ["Next.js", "React", "TypeScript", "Web开发", "个人博客"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="font-sans antialiased">
        {/* 全局导航（仅渲染一次） */}
        <Navbar />

        {/* 背景轮播（在部分页面会被组件内部逻辑隐藏） */}
        <BackgroundCarousel />

        {/* 全局悬浮播放器，独立于主内容层级 */}
        <div id="global-music-player-root" aria-hidden>
          <GlobalMusicPlayer />
        </div>

        {/* 主区域为 full-bleed 背景层；内部内容使用 page-content 居中 */}
        <main className="min-h-screen pt-16">
          <div className="page-content">{children}</div>
        </main>
      </body>
    </html>
  );
}