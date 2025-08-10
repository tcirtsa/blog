// src/lib/posts.tsx
import { cache } from 'react';
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime, formatDate } from "./utils";
import type { Post } from './types';

const postsDir = path.join(process.cwd(), "src/posts");

export const getAllPosts = cache((): Post[] => {
    try {
        const fileNames = fs.readdirSync(postsDir);
        const posts = fileNames
            .filter(fileName => fileName.endsWith('.md'))
            .map((fileName) => {
                const slug = fileName.replace(/\.md$/, "");
                const filePath = path.join(postsDir, fileName);
                const fileContents = fs.readFileSync(filePath, "utf8");
                const { data, content } = matter(fileContents);
                
                // 计算阅读时间
                const readingTime = calculateReadingTime(content);
                
                // 生成摘要（如果没有提供）
                const excerpt = data.excerpt || content.slice(0, 200).replace(/[#*`]/g, '') + '...';
                
                // 格式化日期
                const formattedDate = data.date ? formatDate(data.date) : new Date().toISOString();
                
                return {
                    slug,
                    content,
                    title: data.title || '无标题',
                    date: formattedDate,
                    description: data.description,
                    author: data.author,
                    tags: data.tags || [],
                    coverImage: data.coverImage,
                    readingTime,
                    excerpt,
                    featured: data.featured || false,
                    lastModified: data.lastModified,
                    seo: data.seo,
                    ...data,
                } as Post;
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        return posts;
    } catch (error) {
        console.error('Error reading posts:', error);
        return [];
    }
});

/**
 * 根据 slug 获取单篇文章
 */
export const getPostBySlug = (slug: string): Post | undefined => {
    const posts = getAllPosts();
    return posts.find(post => post.slug === slug);
};

/**
 * 获取特色文章
 */
export const getFeaturedPosts = (): Post[] => {
    const posts = getAllPosts();
    return posts.filter(post => post.featured);
};

/**
 * 根据标签获取文章
 */
export const getPostsByTag = (tag: string): Post[] => {
    const posts = getAllPosts();
    return posts.filter(post => post.tags?.includes(tag));
};

/**
 * 获取所有标签及其文章数量
 */
export const getAllTags = (): Array<{ tag: string; count: number }> => {
    const posts = getAllPosts();
    const tagMap = new Map<string, number>();
    
    posts.forEach(post => {
        post.tags?.forEach(tag => {
            tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
        });
    });
    
    return Array.from(tagMap.entries())
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count);
};

/**
 * 搜索文章
 */
export const searchPosts = (query: string): Post[] => {
    if (!query.trim()) return [];
    
    const posts = getAllPosts();
    const searchTerm = query.toLowerCase();
    
    return posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.description?.toLowerCase().includes(searchTerm) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
};