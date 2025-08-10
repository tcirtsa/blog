"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import { Post } from "@/lib/types";

interface NavbarProps {
  posts: Post[];
}

export default function Navbar({ posts }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "首页", icon: "🏠" },
    { href: "/about", label: "关于", icon: "👋" },
    { href: "/posts", label: "文章", icon: "📝" },
    { href: "/contact", label: "联系", icon: "📧" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-var(--bg-card)/95 backdrop-blur-md border-b border-var(--border-light) shadow-sm" 
        : "bg-var(--bg-card)/80 backdrop-blur-sm"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo区域 */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-lg font-bold text-var(--text-primary) group-hover:text-blue-500 transition-colors duration-300">
              tcirtsa's Blog
            </span>
          </Link>

          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center space-x-2 text-var(--text-secondary) hover:text-blue-500 transition-colors duration-300 font-medium"
              >
                <span className="text-sm">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* 右侧功能区 */}
          <div className="flex items-center space-x-4">
            {/* 搜索框 */}
            <div className="hidden sm:block w-64">
              <SearchBox posts={posts} />
            </div>

            {/* 主题切换按钮 */}
            <button
              className="p-2 rounded-lg hover:bg-var(--bg-surface) transition-colors duration-300"
              title="切换主题"
            >
              <svg className="w-5 h-5 text-var(--text-secondary) hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>

            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-var(--bg-surface) transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="切换菜单"
            >
              <svg className="w-6 h-6 text-var(--text-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="bg-var(--bg-card) border-t border-var(--border-light) shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {/* 移动端搜索框 */}
              <div className="sm:hidden mb-4">
                <SearchBox posts={posts} />
              </div>
              
              {/* 导航链接 */}
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-var(--bg-surface) transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium text-var(--text-primary)">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}