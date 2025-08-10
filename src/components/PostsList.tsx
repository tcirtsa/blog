"use client";

import { Post } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import ShareButton from "./ShareButton";
import { useState, useEffect, useMemo, memo, useCallback } from "react";

interface PostsListProps {
    posts: Post[];
    selectedTag?: string | null;
    pageSize?: number;
    onTagChange?: (tag: string | null) => void;
    searchQuery?: string;
}

const PostsList = memo(function PostsList({ 
    posts, 
    selectedTag = null, 
    pageSize = 6, 
    onTagChange,
    searchQuery = ""
}: PostsListProps) {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // 过滤文章
    const filteredPosts = useMemo(() => {
        let filtered = posts;

        // 标签过滤
        if (selectedTag) {
            filtered = filtered.filter(post => 
                post.tags && post.tags.includes(selectedTag)
            );
        }

        // 搜索过滤
        if (searchQuery.trim()) {
            const searchTerm = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(post => {
                const titleMatch = post.title.toLowerCase().includes(searchTerm);
                const descriptionMatch = post.description?.toLowerCase().includes(searchTerm);
                const contentMatch = post.content?.toLowerCase().includes(searchTerm);
                const tagMatch = post.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm));
                
                return titleMatch || descriptionMatch || contentMatch || tagMatch;
            });
        }

        return filtered;
    }, [posts, selectedTag, searchQuery]);

    // 分页数据
    const paginationData = useMemo(() => {
        const totalPages = Math.ceil(filteredPosts.length / pageSize);
        const pagedPosts = filteredPosts.slice((page - 1) * pageSize, page * pageSize);
        
        return { totalPages, pagedPosts };
    }, [filteredPosts, page, pageSize]);

    // 当过滤条件变化时重置页码
    useEffect(() => {
        setPage(1);
    }, [selectedTag, searchQuery]);

    // 页码变化处理
    const handlePageChange = useCallback((newPage: number) => {
        setIsLoading(true);
        setPage(newPage);
        
        // 滚动到列表顶部
        const listElement = document.getElementById('posts-list');
        if (listElement) {
            listElement.scrollIntoView({ behavior: 'smooth' });
        }
        
        // 模拟加载延迟
        setTimeout(() => setIsLoading(false), 300);
    }, []);

    // 清除过滤器
    const handleClearFilters = useCallback(() => {
        if (onTagChange) onTagChange(null);
        setPage(1);
    }, [onTagChange]);

    // 计算阅读时间
    const getReadingTime = useCallback((content: string) => {
        if (!content) return 1;
        const words = content.split(/\s+/).length;
        return Math.max(1, Math.round(words / 300)); // 300字/分钟
    }, []);

    // 高亮搜索词
    const highlightText = useCallback((text: string, searchTerm: string) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-600 px-1 rounded">$1</mark>');
    }, []);

    return (
        <div id="posts-list" className="space-y-6">
            {/* 过滤器状态 */}
            {(selectedTag || searchQuery) && (
                <div className="card-sm animate-fade-in">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm text-var(--text-secondary)">当前筛选:</span>
                        
                        {selectedTag && (
                            <div className="flex items-center space-x-2">
                                <span className="tag tag-active">{selectedTag}</span>
                                <button 
                                    onClick={() => onTagChange && onTagChange(null)}
                                    className="text-var(--text-muted) hover:text-var(--accent-error) transition-colors"
                                    aria-label="移除标签筛选"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        
                        {searchQuery && (
                            <div className="flex items-center space-x-2">
                                <span className="text-sm bg-var(--accent-primary) text-white px-2 py-1 rounded">
                                    搜索: "{searchQuery}"
                                </span>
                            </div>
                        )}
                        
                        <button 
                            onClick={handleClearFilters}
                            className="btn btn-ghost btn-sm"
                        >
                            清除所有筛选
                        </button>
                    </div>
                    
                    <div className="mt-2 text-xs text-var(--text-muted)">
                        找到 {filteredPosts.length} 篇文章
                    </div>
                </div>
            )}
            
            {/* 文章列表 */}
            {filteredPosts.length === 0 ? (
                <div className="card text-center py-12 animate-fade-in">
                    <div className="mb-4">
                        <svg className="w-16 h-16 mx-auto text-var(--text-muted) opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.291-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">暂无文章</h3>
                    <p className="text-var(--text-secondary) mb-4">
                        {selectedTag || searchQuery ? '没有找到符合条件的文章' : '还没有发布任何文章'}
                    </p>
                    {(selectedTag || searchQuery) && (
                        <button 
                            onClick={handleClearFilters}
                            className="btn btn-primary"
                        >
                            查看所有文章
                        </button>
                    )}
                </div>
            ) : (
                <>
                    {/* 加载状态 */}
                    {isLoading && (
                        <div className="flex justify-center py-8">
                            <div className="loading w-8 h-8"></div>
                        </div>
                    )}
                    
                    {/* 文章网格 */}
                    <div className={`grid-responsive ${isLoading ? 'opacity-50' : 'animate-fade-in'}`}>
                        {paginationData.pagedPosts.map((post: Post, index) => {
                            const readingTime = post.readingTime || getReadingTime(post.content);
                            
                            return (
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
                                        </div>
                                    )}
                                    
                                    {/* 文章标题 */}
                                    <h2 className="text-xl font-bold mb-3 leading-tight">
                                        <Link 
                                            href={`/posts/${post.slug}`} 
                                            className="text-var(--text-primary) hover:text-gradient transition-all duration-300"
                                            dangerouslySetInnerHTML={{ 
                                                __html: searchQuery ? highlightText(post.title, searchQuery) : post.title 
                                            }}
                                        />
                                    </h2>
                                    
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
                                        
                                        {post.author && (
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span>{post.author}</span>
                                            </div>
                                        )}
                                        
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{readingTime} 分钟阅读</span>
                                        </div>
                                    </div>
                                    
                                    {/* 文章描述 */}
                                    {post.description && (
                                        <p 
                                            className="text-var(--text-secondary) leading-relaxed mb-4 text-truncate-3"
                                            dangerouslySetInnerHTML={{ 
                                                __html: searchQuery ? highlightText(post.description, searchQuery) : post.description 
                                            }}
                                        />
                                    )}
                                    
                                    {/* 标签 */}
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags.slice(0, 3).map((tag: string) => (
                                                <button
                                                    key={tag}
                                                    onClick={() => onTagChange && onTagChange(tag)}
                                                    className={`tag ${selectedTag === tag ? 'tag-active' : ''} hover:scale-105 transition-transform`}
                                                >
                                                    #{tag}
                                                </button>
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
                                        
                                        {/* 分享按钮 */}
                                        <button
                                            onClick={() => {
                                                if (navigator.share) {
                                                    navigator.share({
                                                        title: post.title,
                                                        text: post.description,
                                                        url: `/posts/${post.slug}`
                                                    });
                                                } else {
                                                    navigator.clipboard.writeText(`${window.location.origin}/posts/${post.slug}`);
                                                }
                                            }}
                                            className="btn btn-ghost btn-sm tooltip"
                                            data-tooltip="分享文章"
                                            aria-label="分享文章"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                            </svg>
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                    
                    {/* 分页组件 */}
                    {paginationData.totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-8 animate-fade-in">
                            <button
                                className="btn btn-secondary"
                                disabled={page === 1 || isLoading}
                                onClick={() => handlePageChange(page - 1)}
                                aria-label="上一页"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                上一页
                            </button>
                            
                            {/* 页码按钮 */}
                            <div className="flex space-x-1">
                                {Array.from({ length: Math.min(5, paginationData.totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (paginationData.totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (page <= 3) {
                                        pageNum = i + 1;
                                    } else if (page >= paginationData.totalPages - 2) {
                                        pageNum = paginationData.totalPages - 4 + i;
                                    } else {
                                        pageNum = page - 2 + i;
                                    }
                                    
                                    return (
                                        <button
                                            key={pageNum}
                                            className={`btn ${page === pageNum ? 'btn-primary' : 'btn-secondary'} px-3 py-1 min-w-[2.5rem]`}
                                            disabled={isLoading}
                                            onClick={() => handlePageChange(pageNum)}
                                            aria-label={`第 ${pageNum} 页`}
                                            aria-current={page === pageNum ? 'page' : undefined}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                            
                            <button
                                className="btn btn-secondary"
                                disabled={page === paginationData.totalPages || isLoading}
                                onClick={() => handlePageChange(page + 1)}
                                aria-label="下一页"
                            >
                                下一页
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}
                    
                    {/* 分页信息 */}
                    <div className="text-center text-sm text-var(--text-muted) mt-4">
                        显示第 {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, filteredPosts.length)} 条，
                        共 {filteredPosts.length} 篇文章
                    </div>
                </>
            )}
        </div>
    );
});

export default PostsList;