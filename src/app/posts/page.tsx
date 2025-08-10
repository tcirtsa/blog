// src/app/posts/page.tsx
import { getAllPosts } from "@/lib/posts";
import PostsList from "@/components/PostsList";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "所有文章 - tcirtsa's Blog",
  description: "浏览 tcirtsa 的所有技术文章，涵盖前端开发、Next.js、React 等内容。",
  keywords: "博客, 文章, 前端, Next.js, React, 技术, tcirtsa",
  openGraph: {
    title: "所有文章 - tcirtsa's Blog",
    description: "浏览 tcirtsa 的所有技术文章，涵盖前端开发、Next.js、React 等内容。",
    url: "https://your-domain.com/posts",
    siteName: "tcirtsa's Blog",
    images: [
      {
        url: "https://cdn-fusion.imgcdn.store/i/2025/gfV0huCctGevi5Bq.webp",
        width: 800,
        height: 600,
        alt: "tcirtsa's Blog 封面",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
};

export default function Posts() {
    const posts = getAllPosts();

    return (
  <div className="min-h-screen">
            <div className="w-full flex flex-col md:flex-row flex-1 py-8 px-2 md:px-8">
        <div className="flex-1 md:pr-8">
                      <div className="floating-card">
            <h2 className="text-3xl font-extrabold mb-6 text-blue-200 tracking-wide drop-shadow-lg">博客文章</h2>
                        <PostsList posts={posts} />
          </div>
        </div>
                <Sidebar posts={posts} />
      </div>
            <Footer />
    </div>
    );
}