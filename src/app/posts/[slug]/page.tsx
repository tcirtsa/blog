 // src/app/posts/[slug]/page.tsx
import { getAllPosts } from "@/lib/posts";
import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItToc from "markdown-it-toc-done-right";
import markdownItHighlight from "markdown-it-highlightjs";
// @ts-expect-error: markdown-it-katex 没有类型声明
import markdownItKatex from "markdown-it-katex";
import sanitizeHtml from "sanitize-html";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import "@/styles/post-image.css";
import { processMarkdownImages } from "@/lib/imageProcessor";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(markdownItAnchor, { permalink: markdownItAnchor.permalink.headerLink() })
  .use(markdownItToc, { level: [1, 2, 3] })
  .use(markdownItHighlight)
  .use(markdownItKatex);

async function getPost(slug: string) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found - tcirtsa's Blog",
      description: "The post you are looking for does not exist.",
    };
  }

  return {
    title: `${post.title} - tcirtsa's Blog`,
    description: post.description,
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  // 处理Markdown内容中的图片
  const processedContent = processMarkdownImages(post.content);
  
  // 生成 TOC 和正文 HTML
  const tocHtml = md.render("[[toc]]\n" + processedContent).match(/<nav[\s\S]*?<\/nav>/)?.[0] || "";
  const rawHtml = md.render(processedContent);

  // sanitize-html 配置：允许 img 与常见属性，允许 data: base64 src 以及 http/https
  const safeHtml = sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "h3", "h4", "h5", "h6", "span", "figure", "figcaption", "div"]),
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading", "class"],
      div: ["class", "id", "style"],
      figure: ["class", "id", "style"],
      figcaption: ["class", "id", "style"],
      '*': ['class', 'id', 'style'],
    },
    allowedSchemes: ["http", "https", "data", "mailto"],
    // 保留空白 href/target 的默认处理，避免去除重要链接
    transformTags: {
      'a': (tagName:any, attribs:any) => {
        // 强制外链加 rel="noopener noreferrer" target="_blank"
        const href = attribs.href || "";
        if (/^https?:\/\//i.test(href) && !attribs.target) {
          attribs.target = "_blank";
        }
        attribs.rel = attribs.rel ? attribs.rel : "noopener noreferrer";
        return { tagName, attribs };
      },
      'img': (tagName:any, attribs:any) => {
        // 为图片添加懒加载和样式类
        attribs.loading = "lazy";
        attribs.class = attribs.class ? attribs.class + " image-center" : "image-center";
        
        // 检查图片是否包含特定关键词，应用不同的样式
        const alt = (attribs.alt || "").toLowerCase();
        if (alt.includes("wide") || alt.includes("全宽")) {
          attribs.class = attribs.class.replace("image-center", "image-wide");
        } else if (alt.includes("left") || alt.includes("左浮动")) {
          attribs.class = attribs.class.replace("image-center", "image-float-left");
        } else if (alt.includes("right") || alt.includes("右浮动")) {
          attribs.class = attribs.class.replace("image-center", "image-float-right");
        }
        
        return { 
          tagName: "img", 
          attribs 
        };
      }
    }
  });

  // 计算阅读时间（兜底）
  const getReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const readingTime = post.readingTime || getReadingTime(post.content);
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      {/* 封面图片区域 */}
      {post.coverImage && typeof post.coverImage === "string" && (
        <div className="full-bleed-hero">
          <Image
            src={post.coverImage}
            alt={typeof post.title === "string" ? post.title : ""}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="hero-overlay" />
          <div className="absolute inset-0 flex items-end">
            <div className="page-content">
              <div className="p-6">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-md">{post.title}</h1>
                <div className="mt-3 text-sm text-white/80">
                  {post.date && <span className="mr-4">{post.date}</span>}
                  {post.author && <span className="mr-4">作者: {post.author}</span>}
                  <span>{readingTime} 分钟阅读</span>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag text-sm bg-white/20 border-white/20 px-3 py-1 rounded-full text-white">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 文章内容区域 */}
      <div className="page-content py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
          <div>
            <div className="card">
              {/* 目录（TOC） */}
              {tocHtml && (
                <div className="mb-6">
                  <div className="card-sm" dangerouslySetInnerHTML={{ __html: tocHtml }} />
                </div>
              )}
              {/* 正文（已消毒） */}
              <div className="prose prose-lg max-w-none post-content" dangerouslySetInnerHTML={{ __html: safeHtml }} />
            </div>
          </div>

          {/* 侧边栏 */}
          <aside className="space-y-6">
            <div className="sidebar-panel">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-var(--border-light) bg-gradient-to-br from-var(--accent-primary) to-var(--accent-secondary) flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <div>
                  <div className="font-semibold text-var(--text-primary)">tcirtsa</div>
                  <div className="text-sm text-var(--text-secondary)">全栈开发者，热爱技术分享</div>
                </div>
              </div>

              <div>
                <h3 className="text-var(--text-primary) font-semibold mb-2">文章标签</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags && post.tags.map((t) => (
                    <Link 
                      key={t} 
                      href={`/posts?tag=${encodeURIComponent(t)}`}
                      className="tag hover:bg-var(--accent-primary) hover:text-white transition-colors"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="sidebar-panel">
              <h3 className="text-var(--text-primary) font-semibold mb-2">相关文章</h3>
              <ul className="space-y-3">
                {posts
                  .filter(p => p.slug !== post.slug && p.tags?.some(tag => post.tags?.includes(tag)))
                  .slice(0, 5)
                  .map(p => (
                    <li key={p.slug}>
                      <Link 
                        href={`/posts/${p.slug}`}
                        className="block text-sm text-var(--text-secondary) hover:text-var(--accent-primary) transition-colors line-clamp-2"
                      >
                        • {p.title}
                      </Link>
                      <div className="text-xs text-var(--text-muted) mt-1">
                        {p.date}
                      </div>
                    </li>
                  ))}
                {posts.filter(p => p.slug !== post.slug && p.tags?.some(tag => post.tags?.includes(tag))).length === 0 && (
                  <li className="text-sm text-var(--text-muted)">暂无相关文章</li>
                )}
              </ul>
            </div>
          </aside>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}