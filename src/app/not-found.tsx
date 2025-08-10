"use client";
import Link from "next/link";

export default function NotFound() {
  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white/60 backdrop-blur-xl" style={{background: 'transparent'}}>
      <h1 className="text-6xl font-bold text-primary-color mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">页面未找到，可能已被删除或地址错误。</p>
      <Link href="/" className="btn-primary">返回首页</Link>
    </div>
  );
} 