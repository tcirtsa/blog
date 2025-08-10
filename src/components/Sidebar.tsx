"use client";

import { memo } from 'react';
import TagSystem from './TagSystem';
import { Post } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

interface SidebarProps {
    posts?: Post[];
}

const Sidebar = ({ posts = [] }: SidebarProps) => {
    // 获取最新文章
    const recentPosts = posts.slice(0, 5);
    
    // 获取热门标签
    const getPopularTags = () => {
        const tagCount: { [key: string]: number } = {};
        posts.forEach(post => {
            post.tags?.forEach((tag: string) => {
                tagCount[tag] = (tagCount[tag] || 0) + 1;
            });
        });
        
        return Object.entries(tagCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([tag, count]) => ({ tag, count }));
    };
    
    const popularTags = getPopularTags();
    
    return (
        <aside className="w-full md:w-80 space-y-6">
            {/* 个人信息卡片 */}
            <div className="card animate-fade-in">
                <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                        <Image
                            src="https://cdn-fusion.imgcdn.store/i/2025/gfV0huCctGevi5Bq.webp"
                            alt="tcirtsa"
                            width={80}
                            height={80}
                            className="rounded-full border-2 border-var(--accent-primary) object-cover shadow-lg"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-var(--accent-success) rounded-full border-2 border-white flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-gradient">tcirtsa</h3>
                    <p className="text-var(--text-secondary) text-sm mb-4 leading-relaxed">
                        热爱技术的前端开发者，专注于现代Web开发技术，分享编程经验与生活感悟。
                    </p>
                    
                    {/* 统计信息 */}
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                        <div className="space-y-1">
                            <div className="text-lg font-bold text-var(--accent-primary)">{posts.length}</div>
                            <div className="text-xs text-var(--text-muted)">文章</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-lg font-bold text-var(--accent-secondary)">{popularTags.length}</div>
                            <div className="text-xs text-var(--text-muted)">标签</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-lg font-bold text-var(--accent-success)">
                                {posts.reduce((total, post) => total + (post.readingTime || 5), 0)}
                            </div>
                            <div className="text-xs text-var(--text-muted)">分钟</div>
                        </div>
                    </div>
                    
                    {/* 社交链接 */}
                    <div className="flex justify-center space-x-4">
                        <a 
                            href="https://github.com/tcirtsa" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-ghost p-2 tooltip hover:text-var(--accent-primary) transition-colors"
                            data-tooltip="GitHub"
                            aria-label="GitHub"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                        <a 
                            href="https://twitter.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-ghost p-2 tooltip hover:text-var(--accent-primary) transition-colors"
                            data-tooltip="Twitter"
                            aria-label="Twitter"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </a>
                        <a 
                            href="mailto:example@example.com" 
                            className="btn btn-ghost p-2 tooltip hover:text-var(--accent-primary) transition-colors"
                            data-tooltip="Email"
                            aria-label="Email"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            
            {/* 标签云 */}
            {popularTags.length > 0 && (
                <div className="card animate-fade-in">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-var(--accent-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        热门标签
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {popularTags.map(({ tag, count }) => (
                            <Link
                                key={tag}
                                href={`/posts?tag=${encodeURIComponent(tag)}`}
                                className="tag hover:tag-active transition-all duration-200 flex items-center space-x-1"
                            >
                                <span>#{tag}</span>
                                <span className="text-xs bg-var(--accent-primary) text-white px-1.5 py-0.5 rounded-full">
                                    {count}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            
            {/* 最新文章 */}
            {recentPosts.length > 0 && (
                <div className="card animate-fade-in">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-var(--accent-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        最新文章
                    </h3>
                    <div className="space-y-3">
                        {recentPosts.map((post, index) => (
                            <Link
                                key={post.slug}
                                href={`/posts/${post.slug}`}
                                className="block group hover:bg-var(--bg-surface) p-3 rounded-lg transition-all duration-200"
                            >
                                <div className="flex items-start space-x-3">
                                    {/* 序号 */}
                                    <div className="flex-shrink-0 w-6 h-6 bg-var(--accent-primary) text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {index + 1}
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-var(--text-primary) group-hover:text-var(--accent-primary) transition-colors line-clamp-2 mb-1">
                                            {post.title}
                                        </h4>
                                        <div className="flex items-center text-xs text-var(--text-muted) space-x-2">
                                            {post.date && <span>{post.date}</span>}
                                            {post.readingTime && (
                                                <>
                                                    <span>•</span>
                                                    <span>{post.readingTime} 分钟</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-var(--border-light)">
                        <Link
                            href="/posts"
                            className="btn btn-secondary w-full text-center"
                        >
                            查看所有文章
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            )}
            
            {/* 标签系统组件 */}
            {posts.length > 0 && (
                <div className="card animate-fade-in">
                    <TagSystem posts={posts} />
                </div>
            )}
            
            {/* 友情链接 */}
            <div className="card animate-fade-in">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-var(--accent-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    友情链接
                </h3>
                <div className="space-y-2">
                    <a
                        href="https://nextjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-var(--bg-surface) transition-colors group"
                    >
                        <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center text-xs font-bold">
                            N
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium group-hover:text-var(--accent-primary) transition-colors">
                                Next.js
                            </div>
                            <div className="text-xs text-var(--text-muted)">React 框架</div>
                        </div>
                        <svg className="w-4 h-4 text-var(--text-muted) group-hover:text-var(--accent-primary) transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                    
                    <a
                        href="https://tailwindcss.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-var(--bg-surface) transition-colors group"
                    >
                        <div className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center text-xs font-bold">
                            T
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium group-hover:text-var(--accent-primary) transition-colors">
                                Tailwind CSS
                            </div>
                            <div className="text-xs text-var(--text-muted)">CSS 框架</div>
                        </div>
                        <svg className="w-4 h-4 text-var(--text-muted) group-hover:text-var(--accent-primary) transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>
        </aside>
    );
};

// 使用memo优化，只有当props变化时才重新渲染
export default memo(Sidebar);