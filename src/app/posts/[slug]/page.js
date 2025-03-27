import { getAllPostSlugs, getPostData } from "../../../lib/markdown";
import Layout from "../../../components/Layout";
import { formatDate } from "../../../lib/date";
import PostBody from "../../../components/PostBody"; // 匯入 PostBody 組件

// 這個函數告訴Next.js哪些路徑需要預渲染
// 給 Next.js 的「build 機器人」看的
//generateStaticParams 是預留函式喔 不是自己定義的 POST裡面的params也是固定的
//格式是固定的 一定要是 [{ slug: "hello-world" }, { slug: "nextjs-tips" }]
export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => path.params);
}

// params 是一個物件，包含當前網址中對應的動態參數值
// 它的值來自 generateStaticParams() 回傳的每一筆資料
// Next.js 在編譯時會根據這些資料自動建立對應的靜態頁面
// 所以這個 params.slug，不但代表使用者現在看的網址
// 也同時對應你當初在 generateStaticParams() 告訴 Next.js 要產生的 slug


export default async function Post({ params }) {
  console.log("params", params);
  const postData = await getPostData(params.slug);

  return (
    <Layout>
      <article className="post">
        <header className="post-header">
          <h1 className="post-title">{postData.title}</h1>
          <div className="post-meta">
            <time>{formatDate(postData.date)}</time>
            <span> • {postData.readTime}</span>
          </div>
        </header>
        <PostBody content={postData.contentHtml} />
      </article>
    </Layout>
  );
}



/* 
💡 你寫了 generateStaticParams()

        ↓ build 時被 Next.js 呼叫

📦 generateStaticParams() 回傳：
[
  { slug: "hello-world" },
  { slug: "nn" },
  { slug: "nextjs-tips" },
]

        ↓ Next.js 拿這些 slug 預先產生對應的頁面

🚀 使用者訪問網址：
/posts/nn

        ↓

📦 Next.js 把 "nn" 對應到 [slug] → 傳進 page.js 的 props

        ↓

🧠 你在 page.js 裡接到：
Post({ params: { slug: "nn" } })

        ↓

📄 你執行：
const postData = await getPostData("nn");

        ↓

📂 getPostData() 去找：
src/content/blog/nn.md

        ↓

🪄 用 gray-matter 解析 frontmatter
🪄 用 remark 把 markdown 轉成 HTML
🪄 用 reading-time 計算閱讀時間

        ↓

🎨 回傳 postData 給畫面使用：
<Layout>
  <h1>{postData.title}</h1>
  <PostBody content={postData.contentHtml} />
</Layout>

*/