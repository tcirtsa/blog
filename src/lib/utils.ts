// src/lib/utils.ts
/**
 * 性能优化工具函数集合
 */

/**
 * 防抖函数 - 延迟执行，在指定时间内多次调用只执行最后一次
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 节流函数 - 限制执行频率，在指定时间内最多执行一次
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * 图片预加载工具
 */
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * 批量预加载图片
 */
export async function preloadImages(srcs: string[]): Promise<HTMLImageElement[]> {
  const promises = srcs.map(src => preloadImage(src));
  return Promise.all(promises);
}

/**
 * 阅读时间计算（缓存版本）
 */
const readingTimeCache = new Map<string, number>();

export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  // 使用内容的哈希作为缓存键
  const cacheKey = content.length.toString() + content.slice(0, 100);
  
  if (readingTimeCache.has(cacheKey)) {
    return readingTimeCache.get(cacheKey)!;
  }
  
  // 计算字数（支持中英文混合）
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = content.replace(/[\u4e00-\u9fa5]/g, '').trim().split(/\s+/).filter(word => word.length > 0).length;
  
  // 中文按字符计算，英文按单词计算
  const totalWords = chineseChars + englishWords;
  const readingTime = Math.ceil(totalWords / wordsPerMinute);
  
  // 缓存结果
  readingTimeCache.set(cacheKey, readingTime);
  
  return readingTime;
}

/**
 * 清理阅读时间缓存
 */
export function clearReadingTimeCache(): void {
  readingTimeCache.clear();
}

/**
 * 格式化日期
 */
export function formatDate(dateString: string, locale: string = 'zh-CN'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * 生成唯一ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * 安全的JSON解析
 */
export function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

/**
 * 检查是否为客户端环境
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * 获取滚动位置
 */
export function getScrollPosition(): { x: number; y: number } {
  if (!isClient()) return { x: 0, y: 0 };
  
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  };
}

/**
 * 平滑滚动到指定位置
 */
export function smoothScrollTo(x: number, y: number): void {
  if (!isClient()) return;
  
  window.scrollTo({
    top: y,
    left: x,
    behavior: 'smooth'
  });
}

/**
 * 检查元素是否在视口中
 */
export function isInViewport(element: HTMLElement): boolean {
  if (!isClient()) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * 创建 Intersection Observer（如果支持）
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (!isClient() || !('IntersectionObserver' in window)) {
    return null;
  }
  
  return new IntersectionObserver(callback, options);
}

/**
 * 延迟执行函数
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 重试函数
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxAttempts) {
        throw lastError;
      }
      
      await delay(delayMs * attempt); // 指数退避
    }
  }
  
  throw lastError!;
}