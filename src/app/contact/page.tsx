// src/app/contact/page.tsx

import { getAllPosts } from "@/lib/posts";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "联系我 - tcirtsa's Blog",
  description: "通过邮箱或社交媒体与 tcirtsa 联系，欢迎技术交流与合作。",
  keywords: "联系, 邮箱, 技术交流, 合作, tcirtsa",
  openGraph: {
    title: "联系我 - tcirtsa's Blog",
    description: "通过邮箱或社交媒体与 tcirtsa 联系，欢迎技术交流与合作。",
    url: "https://your-domain.com/contact",
    siteName: "tcirtsa's Blog",
    images: [
      {
        url: "https://cdn-fusion.imgcdn.store/i/2025/gfV0huCctGevi5Bq.webp",
        width: 800,
        height: 600,
        alt: "tcirtsa's Blog 联系封面",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
};

export default function Contact() {
  const posts = getAllPosts();
  
  return (
    <div className="min-h-screen">
      <div className="w-full flex flex-col md:flex-row flex-1 py-8 px-2 md:px-8">
        <div className="flex-1 md:pr-8">
          <div className="floating-card flex flex-col gap-6 font-sans leading-relaxed">
            <h1 className="text-3xl font-bold mb-6 text-text-dark">联系我们</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-text-dark">联系方式</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-transparent border border-white/20 shadow-xl rounded-full p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-text-light">邮箱</p>
                      <p className="text-text-dark">tcirtsa_mail@163.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-transparent border border-white/20 shadow-xl rounded-full p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-text-light">电话</p>
                      <p className="text-text-dark">+86 123 4567 8910</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-transparent border border-white/20 shadow-xl rounded-full p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-text-light">地址</p>
                      <p className="text-text-dark">中国</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-text-dark">社交媒体</h3>
                  <div className="flex space-x-4">
                    <a href="https://github.com/tcirtsa" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110 duration-200 bg-transparent border border-white/20 shadow-xl rounded-full p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-dark">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110 duration-200 bg-transparent border border-white/20 shadow-xl rounded-full p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-dark">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110 duration-200 bg-transparent border border-white/20 shadow-xl rounded-full p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-dark">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-text-dark">发送消息</h2>
                <div className="card">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Sidebar posts={posts} />
      </div>
      <Footer />
    </div>
  );
}
