// src/app/page.tsx
import { getAllPosts } from "@/lib/posts";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "tcirtsa's Blog - 个人博客 | 前端开发 | 技术分享",
  description: "tcirtsa 的个人博客，专注于前端开发、Next.js、React、技术分享与项目展示。",
  keywords: ["博客", "前端", "Next.js", "React", "技术", "个人网站", "技术分享", "tcirtsa"],
  openGraph: {
    title: "tcirtsa's Blog - 个人博客 | 前端开发 | 技术分享",
    description: "tcirtsa 的个人博客，专注于前端开发、Next.js、React、技术分享与项目展示。",
    url: "https://your-domain.com/",
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

export default function Home() {
  const posts = getAllPosts();
  const featured = posts.slice(0, 6);

  return (
    <div className="min-h-screen">
      <main className="page-content py-8">
        {/* Hero 区域 */}
        <section className="text-center mb-16 animate-fade-in">
          <div className="relative inline-block mb-6">
            <Image
              src="https://cdn-fusion.imgcdn.store/i/2025/gfV0huCctGevi5Bq.webp"
              alt="tcirtsa"
              width={120}
              height={120}
              className="rounded-full border-4 border-var(--accent-primary) shadow-glow mx-auto"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
              priority
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-var(--accent-success) rounded-full border-4 border-white flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
            tcirtsa's Blog
          </h1>
          
          <p className="text-xl text-var(--text-secondary) mb-8 max-w-2xl mx-auto leading-relaxed">
            专注于前端开发、Next.js、React、技术分享与项目展示
          </p>
          
          {/* 统计信息 */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-var(--accent-primary)">{posts.length}</div>
              <div className="text-sm text-var(--text-muted)">篇文章</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-var(--accent-secondary)">
                {posts.reduce((total, post) => total + (post.tags?.length || 0), 0)}
              </div>
              <div className="text-sm text-var(--text-muted)">个标签</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-var(--accent-success)">
                {posts.reduce((total, post) => total + (post.readingTime || 5), 0)}
              </div>
              <div className="text-sm text-var(--text-muted)">分钟阅读</div>
            </div>
          </div>
          
          {/* CTA 按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="btn btn-primary px-8 py-3 text-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              关于我
            </Link>
            <Link href="/posts" className="btn btn-secondary px-8 py-3 text-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              所有文章
            </Link>
          </div>
        </section>

        {/* 精选文章区域 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-var(--text-primary)">
              精选文章
            </h2>
            <p className="text-var(--text-secondary) max-w-2xl mx-auto">
              这里是我最新和最受欢迎的技术文章，涵盖前端开发、框架使用和最佳实践
            </p>
          </div>
          
          {featured.length > 0 ? (
            <div className="grid-responsive animate-fade-in">
              {featured.map((post, index) => (
                <article key={post.slug} className="card group hover:scale-[1.02] transition-all duration-300">
                  {/* 文章封面 */}
                  {post.coverImage && (
                    <div className="relative mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={600}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{ objectFit: 'cover' }}
                        {...(index < 3 ? { priority: true } : { loading: "lazy" })}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* 特色标签 */}
                      {index < 3 && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-var(--accent-primary) text-white px-2 py-1 rounded-full text-xs font-medium">
                            {index === 0 ? '🔥 热门' : index === 1 ? '⭐ 推荐' : '📌 精选'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* 文章内容 */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 leading-tight">
                      <Link 
                        href={`/posts/${post.slug}`} 
                        className="text-var(--text-primary) hover:text-gradient transition-all duration-300"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    
                    {/* 文章元信息 */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-var(--text-secondary) mb-3">
                      {post.date && (
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{post.date}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{post.readingTime || 5} 分钟阅读</span>
                      </div>
                    </div>
                    
                    {/* 文章描述 */}
                    {post.description && (
                      <p className="text-var(--text-secondary) leading-relaxed mb-4 text-truncate-3 flex-1">
                        {post.description}
                      </p>
                    )}
                    
                    {/* 标签 */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <Link
                            key={tag}
                            href={`/posts?tag=${encodeURIComponent(tag)}`}
                            className="tag hover:tag-active transition-all duration-200"
                          >
                            #{tag}
                          </Link>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-var(--text-muted) self-center">
                            +{post.tags.length - 3} 更多
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* 阅读按钮 */}
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-var(--border-light)">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="btn btn-primary btn-sm group-hover:shadow-glow transition-all duration-300"
                      >
                        <span>阅读全文</span>
                        <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      
                      {/* 分享链接 */}
                      <Link
                        href={`/posts/${post.slug}?share=true`}
                        className="btn btn-ghost btn-sm tooltip"
                        data-tooltip="查看文章"
                        aria-label="查看文章"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-var(--text-muted) opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.291-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">暂无文章</h3>
              <p className="text-var(--text-secondary)">还没有发布任何文章</p>
            </div>
          )}
          
          {/* 查看更多按钮 */}
          {posts.length > featured.length && (
            <div className="text-center mt-12">
              <Link
                href="/posts"
                className="btn btn-secondary px-8 py-3 text-lg group"
              >
                <span>查看所有文章</span>
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </section>

        {/* 技能展示区域 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-var(--text-primary)">
              技术栈
            </h2>
            <p className="text-var(--text-secondary) max-w-2xl mx-auto">
              我专注的技术领域和工具
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
            {[
              { name: 'React', icon: '⚛️', color: 'text-blue-500' },
              { name: 'Next.js', icon: '▲', color: 'text-black dark:text-white' },
              { name: 'TypeScript', icon: '📘', color: 'text-blue-600' },
              { name: 'Tailwind CSS', icon: '🎨', color: 'text-cyan-500' },
              { name: 'Node.js', icon: '🟢', color: 'text-green-600' },
              { name: 'Git', icon: '📚', color: 'text-orange-600' },
              { name: 'Docker', icon: '🐳', color: 'text-blue-400' },
              { name: 'VS Code', icon: '💻', color: 'text-blue-700' },
            ].map((tech, index) => (
              <div
                key={tech.name}
                className="card-sm text-center group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`text-3xl mb-2 ${tech.color} group-hover:scale-110 transition-transform`}>
                  {tech.icon}
                </div>
                <div className="text-sm font-medium text-var(--text-primary)">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 联系区域 */}
        <section className="text-center">
          <div className="card-lg max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 text-var(--text-primary)">
              让我们保持联系
            </h2>
            <p className="text-var(--text-secondary) mb-8 leading-relaxed">
              如果你对我的文章感兴趣，或者想要讨论技术问题，欢迎通过以下方式联系我
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn btn-primary px-6 py-3">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                联系我
              </Link>
              
              <a
                href="https://github.com/tcirtsa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary px-6 py-3"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
