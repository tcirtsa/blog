// src/components/TagSystem.tsx
"use client";

import { useState, useMemo } from 'react';
import { Post } from '@/lib/posts';

interface TagSystemProps {
    posts: Post[];
    onTagSelect?: (tag: string | null) => void;
    className?: string;
    showCount?: boolean;
}

export default function TagSystem({ posts, onTagSelect, className = '', showCount = true }: TagSystemProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    
    // 使用useMemo缓存标签计算结果，避免在每次渲染时重新计算
    const tags = useMemo(() => {
        const tagMap = new Map<string, number>();
        
        posts.forEach(post => {
            const postTags = post.tags as string[] || [];
            postTags.forEach(tag => {
                tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
            });
        });
        
        // 转换为数组并按数量排序
        return Array.from(tagMap.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([tag, count]) => ({ tag, count }));
    }, [posts]); // 只有当posts变化时才重新计算
    
    const handleTagClick = (tag: string) => {
        const newTag = selectedTag === tag ? null : tag;
        setSelectedTag(newTag);
        if (onTagSelect) {
            onTagSelect(newTag);
        }
    };
    
    return (
        <div className={`mb-6 ${className}`}>
            <h3 className="text-xl font-semibold mb-3 tracking-tight">标签</h3>
            <div className="flex flex-wrap gap-2">
                {tags.map(({ tag, count }) => (
                    <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm backdrop-blur bg-white/30 dark:bg-black/30 border border-white/20 dark:border-black/20 transition-transform duration-200 ease-out hover:scale-110 focus:outline-none ${selectedTag === tag ? 'bg-primary-color text-white scale-110' : 'text-text-dark dark:text-white opacity-90'}`}
                        aria-pressed={selectedTag === tag}
                    >
                        {tag}
                        {showCount && <span className="ml-1">({count})</span>}
                    </button>
                ))}
                {tags.length === 0 && (
                    <span className="text-gray-500 italic">暂无标签</span>
                )}
            </div>
        </div>
    );
}