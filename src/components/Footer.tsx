"use client";

import { useEffect, useState, useCallback } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [hitokoto, setHitokoto] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 使用useCallback优化API请求函数
  const fetchHitokoto = useCallback(async () => {
    setIsLoading(true);
    try {
      // 使用国际版 API，专注二次元名言，支持 CORS
      const response = await fetch("https://international.v1.hitokoto.cn/?c=a&encode=json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setHitokoto(data.hitokoto);
    } catch (error) {
      console.error("Error fetching hitokoto:", error);
      setHitokoto("人生最大的遗憾，就是在最无能为力的时候遇到一个想要保护一生的人。");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHitokoto();
  }, [fetchHitokoto]);

  return (
    <footer className="bg-var(--bg-secondary) border-t border-var(--border-light) mt-auto">
      <div className="page-content py-12">
        {/* 一言API区域 - 美化设计 */}
        <div className="text-center mb-8">
          <div className="card-sm max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-var(--accent-primary) to-var(--accent-secondary) flex items-center justify-center mr-3 shadow-lg">
                <span className="text-white text-sm">💭</span>
              </div>
              <h4 className="text-lg font-semibold text-var(--text-primary)">今日一言</h4>
              <button
                onClick={fetchHitokoto}
                className="ml-3 p-1 rounded-full hover:bg-var(--bg-surface) transition-all duration-300 group"
                title="刷新一言"
              >
                <svg className="w-4 h-4 text-var(--text-muted) group-hover:text-var(--accent-primary) group-hover:rotate-180 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2 text-var(--text-muted)">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-var(--accent-primary) border-t-transparent"></div>
                <span className="text-sm">加载中...</span>
              </div>
            ) : (
              <blockquote className="text-var(--text-primary) font-medium text-lg leading-relaxed italic relative">
                <span className="text-var(--accent-primary) text-2xl absolute -left-2 -top-2">"</span>
                {hitokoto}
                <span className="text-var(--accent-primary) text-2xl absolute -right-2 -bottom-2">"</span>
              </blockquote>
            )}
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 博客信息 */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-var(--accent-primary) to-var(--accent-secondary) flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <h3 className="text-xl font-bold text-gradient">tcirtsa's Blog</h3>
            </div>
            <p className="text-var(--text-secondary) leading-relaxed">
              专注于前端开发、技术分享与项目展示。
              <br />
              在这里记录成长，分享见解。
            </p>
          </div>

          {/* 快速链接 */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-var(--text-primary) mb-4">快速链接</h4>
            <div className="space-y-2">
              <a href="/" className="block text-var(--text-secondary) hover:text-var(--accent-primary) transition-colors">
                首页
              </a>
              <a href="/posts" className="block text-var(--text-secondary) hover:text-var(--accent-primary) transition-colors">
                所有文章
              </a>
              <a href="/about" className="block text-var(--text-secondary) hover:text-var(--accent-primary) transition-colors">
                关于我
              </a>
              <a href="/contact" className="block text-var(--text-secondary) hover:text-var(--accent-primary) transition-colors">
                联系方式
              </a>
            </div>
          </div>

          {/* 社交链接 */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-var(--text-primary) mb-4">关注我</h4>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="https://github.com/tcirtsa"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 rounded-lg bg-var(--bg-surface) hover:bg-var(--accent-primary) transition-all duration-300"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 text-var(--text-secondary) group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
              <a
                href="mailto:contact@tcirtsa.com"
                className="group flex items-center justify-center w-10 h-10 rounded-lg bg-var(--bg-surface) hover:bg-var(--accent-secondary) transition-all duration-300"
                aria-label="Email"
              >
                <svg className="w-5 h-5 text-var(--text-secondary) group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              
              <a
                href="/rss.xml"
                className="group flex items-center justify-center w-10 h-10 rounded-lg bg-var(--bg-surface) hover:bg-var(--accent-warning) transition-all duration-300"
                aria-label="RSS订阅"
              >
                <svg className="w-5 h-5 text-var(--text-secondary) group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="h-px bg-var(--border-light) mb-6"></div>

        {/* 底部版权信息 */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-var(--text-muted)">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span>© {currentYear} tcirtsa's Blog. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span>and Next.js</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-xs">
            <a href="/privacy" className="hover:text-var(--accent-primary) transition-colors">
              隐私政策
            </a>
            <span>•</span>
            <a href="/terms" className="hover:text-var(--accent-primary) transition-colors">
              使用条款
            </a>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Powered by</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0z"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}