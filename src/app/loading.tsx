"use client";

import Image from "next/image";

export default function Loading() {
    return (
        <div 
            className="fixed inset-0 z-50 flex flex-col justify-center items-center"
            // 使用半透明背景创建一个遮罩效果
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
        >
            <Image 
                src="/loading.gif" 
                alt="Loading..." 
                width={80}
                height={80}
                unoptimized
            />
            <p className="mt-4 text-lg font-semibold text-white">
                Loading...
            </p>
        </div>
    );
}
