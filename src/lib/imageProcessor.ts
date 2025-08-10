/**
 * 图片处理工具函数
 * 用于增强Markdown中的图片显示效果
 */

/**
 * 处理Markdown内容中的图片
 * 将普通图片标记转换为增强的图片HTML
 */
export function processMarkdownImages(content: string): string {
  // 匹配Markdown图片语法: ![alt](src "title")
  const imageRegex = /!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/g;
  
  return content.replace(imageRegex, (match, alt, src, title) => {
    // 解析布局信息
    let layout = 'center';
    let caption = title || '';
    
    // 从alt文本中提取布局信息
    if (alt.includes('wide') || alt.includes('全宽')) {
      layout = 'wide';
      alt = alt.replace(/(wide|全宽)/gi, '').trim();
    } else if (alt.includes('left') || alt.includes('左浮动')) {
      layout = 'left';
      alt = alt.replace(/(left|左浮动)/gi, '').trim();
    } else if (alt.includes('right') || alt.includes('右浮动')) {
      layout = 'right';
      alt = alt.replace(/(right|右浮动)/gi, '').trim();
    }
    
    // 构建增强的图片HTML
    return `
      <figure class="image-container ${layout === 'center' ? 'image-center' : layout === 'wide' ? 'image-wide' : layout === 'left' ? 'image-float-left' : 'image-float-right'}">
        <img src="${src}" alt="${alt}" class="enhanced-image" loading="lazy" />
        ${caption ? `<figcaption class="image-caption">${caption}</figcaption>` : ''}
      </figure>
    `;
  });
}

/**
 * 从图片文件名中提取有意义的标题
 */
export function extractTitleFromImagePath(path: string): string {
  // 移除路径和扩展名
  const filename = path.split('/').pop()?.split('.')[0] || '';
  
  // 将下划线和连字符替换为空格
  return filename
    .replace(/[_-]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2') // 处理驼峰命名
    .replace(/\b\w/g, c => c.toUpperCase()); // 首字母大写
}

/**
 * 增强图片HTML，添加额外功能
 */
export function enhanceImageHTML(html: string): string {
  // 为所有图片添加点击放大功能的类
  return html.replace(/<img(.*?)>/g, '<img$1 class="zoomable-image">');
}