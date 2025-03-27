"use client"; // 標記為 Client Component

import { useEffect, useRef } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
// 引入樣式，選擇一個您喜歡的主題
import "highlight.js/styles/atom-one-dark.css"; // 或其他主題

// 註冊需要的語言
hljs.registerLanguage("javascript", javascript);

export default function PostBody({ content }) {
  const contentRef = useRef(null); // 使用 useRef 來引用 DOM 元素

  // 在客户端應用語法高亮
  useEffect(() => {
    if (contentRef.current) {
      const blocks = contentRef.current.querySelectorAll("pre code");
      blocks.forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [content]);

  return (
    <div
      className="post-content"
      ref={contentRef} // 綁定 ref
      //下面寫法其實等同於element.innerHTML = "<h1>Hello</h1>";
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
