import { Metadata } from 'next';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
}

export function generateSEOMetadata({
    title,
    description,
    keywords = [],
    image = "https://cdn-fusion.imgcdn.store/i/2025/gfV0huCctGevi5Bq.webp",
    url = "https://your-domain.com",
    type = "website",
    publishedTime,
    modifiedTime,
    author = "tcirtsa"
}: SEOProps): Metadata {
    const fullTitle = title.includes("tcirtsa's Blog") ? title : `${title} | tcirtsa's Blog`;
    
    return {
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
        authors: [{ name: author }],
        creator: author,
        publisher: author,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: "tcirtsa's Blog",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'zh_CN',
            type,
            ...(type === 'article' && publishedTime && {
                publishedTime,
                modifiedTime,
                authors: [author],
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [image],
            creator: '@tcirtsa',
        },
        alternates: {
            canonical: url,
        },
    };
}