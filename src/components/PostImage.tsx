"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PostImageProps {
  src: string;
  alt: string;
  caption?: string;
  layout?: 'center' | 'wide' | 'left' | 'right';
}

export default function PostImage({ src, alt, caption, layout = 'center' }: PostImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // 根据布局类型确定样式类名
  const getLayoutClass = () => {
    switch (layout) {
      case 'wide': return 'image-wide';
      case 'left': return 'image-float-left';
      case 'right': return 'image-float-right';
      default: return 'image-center';
    }
  };

  return (
    <figure className={`image-container ${getLayoutClass()}`}>
      {isLoading && <div className="image-loading" />}
      
      <Image
        src={src}
        alt={alt}
        width={800}
        height={500}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
        style={{
          objectFit: 'contain',
          width: '100%',
          height: 'auto'
        }}
      />
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded text-center">
          图片加载失败
        </div>
      )}
      
      {caption && (
        <figcaption className="image-caption">{caption}</figcaption>
      )}
    </figure>
  );
}