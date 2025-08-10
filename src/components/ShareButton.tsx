"use client";

interface ShareButtonProps {
  title: string;
  description?: string;
  url: string;
  className?: string;
}

export default function ShareButton({ title, description, url, className = "" }: ShareButtonProps) {
  const handleShare = async () => {
    const fullUrl = `${window.location.origin}${url}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: fullUrl
        });
      } catch (error) {
        // 用户取消分享或其他错误，静默处理
        console.log('分享取消或失败:', error);
      }
    } else {
      // 降级到复制链接
      try {
        await navigator.clipboard.writeText(fullUrl);
        // 可以添加一个toast提示
        alert('链接已复制到剪贴板！');
      } catch (error) {
        console.error('复制失败:', error);
        // 最后的降级方案
        const textArea = document.createElement('textarea');
        textArea.value = fullUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('链接已复制到剪贴板！');
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`btn btn-ghost btn-sm tooltip ${className}`}
      data-tooltip="分享文章"
      aria-label="分享文章"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
      </svg>
    </button>
  );
}