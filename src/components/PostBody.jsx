import { useEffect } from 'react';
import Prism from '../lib/prism';

export default function PostBody({ content }) {
  // 在客户端應用語法高亮
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <div 
      className="post-content"
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
}