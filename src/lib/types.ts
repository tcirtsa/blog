// src/lib/types.ts

// 定义 Post 类型
export interface Post {
    slug: string;
    content: string;
    title: string;
    date: string;
    description?: string;
    author?: string;
    tags?: string[];
    coverImage?: string;
    readingTime: number;
    excerpt?: string;
    featured?: boolean;
    lastModified?: string;
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
    };
}
