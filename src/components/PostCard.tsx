import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  return (
    <article className="card h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-hover group">
      {/* 封面图片 */}
      {post.coverImage && (
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <Link href={`/posts/${post.slug}`}>
            <Image
              src={post.coverImage}
              alt={post.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ objectFit: 'cover' }}
              {...(index < 3 ? { priority: true } : { loading: "lazy" })}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* 特色标签 */}
          {index < 3 && (
            <div className="absolute top-3 left-3">
              <span className="bg-var(--accent-primary) text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
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
            className="text-var(--text-primary) group-hover:text-gradient transition-colors duration-300"
          >
            {post.title}
          </Link>
        </h3>

        {/* 元信息 */}
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

          {post.author && (
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{post.author}</span>
            </div>
          )}
        </div>

        {/* 描述 */}
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
                className="tag text-xs hover:tag-active transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
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

        {/* 底部操作栏 */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-var(--border-light)">
          <Link
            href={`/posts/${post.slug}`}
            className="btn btn-primary btn-sm group-hover:shadow-glow transition-all duration-300 flex items-center"
          >
            <span>阅读全文</span>
            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          {/* 分享按钮 */}
          <button
            className="btn btn-ghost btn-sm tooltip flex items-center"
            data-tooltip="分享文章"
            onClick={(e) => {
              e.preventDefault();
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
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}