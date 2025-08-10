"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { Post } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchBoxProps {
  posts: Post[];
  placeholder?: string;
  maxResults?: number;
}

export default function SearchBox({ 
  posts, 
  placeholder = "搜索文章...", 
  maxResults = 5 
}: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 搜索结果
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase().trim();
    
    return posts
      .filter(post => {
        const titleMatch = post.title.toLowerCase().includes(searchTerm);
        const descriptionMatch = post.description?.toLowerCase().includes(searchTerm);
        const contentMatch = post.content?.toLowerCase().includes(searchTerm);
        const tagMatch = post.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
        
        return titleMatch || descriptionMatch || contentMatch || tagMatch;
      })
      .slice(0, maxResults)
      .map(post => ({
        ...post,
        // 高亮匹配的文本
        highlightedTitle: highlightText(post.title, searchTerm),
        highlightedDescription: post.description ? highlightText(post.description, searchTerm) : '',
      }));
  }, [query, posts, maxResults]);

  // 高亮文本函数
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-600 px-1 rounded">$1</mark>');
  };

  // 处理键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          router.push(`/posts/${searchResults[selectedIndex].slug}`);
          handleClose();
        } else if (query.trim()) {
          // 如果没有选中项但有搜索词，跳转到搜索结果页面
          router.push(`/posts?search=${encodeURIComponent(query)}`);
          handleClose();
        }
        break;
      case 'Escape':
        handleClose();
        break;
    }
  };

  // 关闭搜索框
  const handleClose = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
    setQuery('');
    inputRef.current?.blur();
  };

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 快捷键支持 (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full">
      {/* 搜索输入框 */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="input pl-10 pr-4"
          aria-label="搜索文章"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
        />
        
        {/* 搜索图标 */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-var(--text-muted)">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* 快捷键提示 */}
        <div className="hidden sm:flex absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-var(--text-muted) items-center space-x-1">
          <kbd className="px-1.5 py-0.5 text-xs font-mono bg-var(--bg-surface) border border-var(--border-light) rounded">
            {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}
          </kbd>
          <kbd className="px-1.5 py-0.5 text-xs font-mono bg-var(--bg-surface) border border-var(--border-light) rounded">
            K
          </kbd>
        </div>
      </div>

      {/* 搜索结果下拉框 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-var(--bg-card) backdrop-blur-glass border border-var(--border-light) rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            <div className="p-4 text-center text-var(--text-muted)">
              <div className="mb-2">
                <svg className="w-8 h-8 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-sm">输入关键词搜索文章</p>
              <p className="text-xs mt-1">支持标题、内容、标签搜索</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-4 text-center text-var(--text-muted)">
              <div className="mb-2">
                <svg className="w-8 h-8 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.291-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <p className="text-sm">未找到相关文章</p>
              <p className="text-xs mt-1">尝试使用其他关键词</p>
            </div>
          ) : (
            <div role="listbox" aria-label="搜索结果">
              {searchResults.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  onClick={handleClose}
                  className={`block p-4 hover:bg-var(--bg-surface) transition-colors border-b border-var(--border-light) last:border-b-0 ${
                    index === selectedIndex ? 'bg-var(--bg-surface)' : ''
                  }`}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-var(--accent-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.291-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 
                        className="text-sm font-medium text-var(--text-primary) truncate"
                        dangerouslySetInnerHTML={{ __html: post.highlightedTitle }}
                      />
                      {post.highlightedDescription && (
                        <p 
                          className="text-xs text-var(--text-secondary) mt-1 text-truncate-2"
                          dangerouslySetInnerHTML={{ __html: post.highlightedDescription }}
                        />
                      )}
                      <div className="flex items-center mt-2 space-x-2 text-xs text-var(--text-muted)">
                        {post.date && <span>{post.date}</span>}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex space-x-1">
                            {post.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="tag text-xs px-2 py-0.5">
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="text-var(--text-muted)">+{post.tags.length - 2}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              
              {/* 查看更多结果 */}
              {searchResults.length === maxResults && (
                <Link
                  href={`/posts?search=${encodeURIComponent(query)}`}
                  onClick={handleClose}
                  className="block p-4 text-center text-var(--accent-primary) hover:bg-var(--bg-surface) transition-colors border-t border-var(--border-light)"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-sm font-medium">查看所有搜索结果</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}