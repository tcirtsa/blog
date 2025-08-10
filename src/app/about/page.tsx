// src/app/about/page.tsx
import { getAllPosts } from "@/lib/posts";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Link from "next/link";

const Sidebar = dynamic(() => import("@/components/Sidebar"));
const Footer = dynamic(() => import("@/components/Footer"));

export const metadata: Metadata = {
    title: "About - tcirtsa's Blog",
    description: "Learn more about tcirtsa and this blog",
};

export default function About() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen">
            <div className="w-full flex flex-col md:flex-row flex-1 py-8 px-2 md:px-8">
                <div className="flex-1 md:pr-8">
                    <div className="floating-card flex flex-col gap-6 font-sans leading-relaxed">
                        <h1 className="text-3xl font-bold mb-6 text-text-dark">关于我</h1>
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <Image
                                    src="https://cdn-fusion.imgcdn.store/i/2025/gfV0huCctGevi5Bq.webp"
                                    alt="tcirtsa"
                                    width={96}
                                    height={96}
                                    className="w-24 h-24 rounded-full mr-6 border-2 border-primary-color p-1"
                                    placeholder="blur"
                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                                />
                                <div>
                                    <h2 className="text-2xl font-bold text-text-dark">tcirtsa</h2>
                                    <p className="text-text-light">Web开发者 & 博客作者</p>
                                </div>
                            </div>
                            <p className="text-text-dark mb-4">
                                欢迎来到我的个人博客！我是tcirtsa，一名热爱技术和写作的开发者。这个博客是我分享知识、经验和想法的地方。
                            </p>
                            <p className="text-text-dark mb-4">
                                我专注于前端开发技术，特别是React、Next.js和现代CSS框架如Tailwind CSS。同时我也对后端开发、人工智能和开源项目充满热情。
                            </p>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-text-dark">技能 & 专长</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="card transition-transform hover:scale-110 duration-200">
                                    <h3 className="text-xl font-semibold mb-2 text-primary-color">前端开发</h3>
                                    <p className="text-text-dark">React, Next.js, Vue, Tailwind CSS, JavaScript/TypeScript</p>
                                </div>
                                <div className="card transition-transform hover:scale-110 duration-200">
                                    <h3 className="text-xl font-semibold mb-2 text-primary-color">后端开发</h3>
                                    <p className="text-text-dark">Node.js, Express, MongoDB, PostgreSQL, RESTful API</p>
                                </div>
                                <div className="card transition-transform hover:scale-110 duration-200">
                                    <h3 className="text-xl font-semibold mb-2 text-primary-color">工具 & 方法</h3>
                                    <p className="text-text-dark">Git, Docker, CI/CD, Agile, TDD</p>
                                </div>
                                <div className="card transition-transform hover:scale-110 duration-200">
                                    <h3 className="text-xl font-semibold mb-2 text-primary-color">其他技能</h3>
                                    <p className="text-text-dark">技术写作, UI/UX设计, SEO优化</p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-text-dark">关于这个博客</h2>
                            <p className="text-text-dark mb-4">
                                这个博客使用Next.js和Tailwind CSS构建，专注于性能优化和用户体验。我会定期更新技术文章、教程和个人项目展示。
                            </p>
                            <p className="text-text-dark">
                                如果你有任何问题、建议或合作意向，欢迎通过联系页面与我取得联系。
                            </p>
                        </div>
                        <div className="flex justify-center mt-8 gap-4">
                            <a href="/contact" className="transition-transform hover:scale-110 duration-200 border border-white/20 shadow-xl rounded-2xl px-6 py-2 font-bold text-text-dark bg-transparent">联系我</a>
                            <Link href="/posts/" className="transition-transform hover:scale-110 duration-200 border border-white/20 shadow-xl rounded-2xl px-6 py-2 font-bold text-text-dark bg-transparent">
                                查看所有文章
                            </Link>
                        </div>
                    </div>
                </div>
                <Sidebar posts={posts} />
            </div>
            <Footer />
        </div>
    );
}
