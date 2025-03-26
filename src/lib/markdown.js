//用於操作檔案系統和處理檔案路徑。
import fs from "fs";
import path from "path";
// 用來解析 Markdown 檔案中的前置資料（Front Matter），例如標題、日期等。
import matter from "gray-matter";
// 用於將 Markdown 內容轉換為 HTML。
import { remark } from "remark";
import html from "remark-html";
// 用來計算文章的閱讀時間。
import readingTime from "reading-time";

// process.cwd() 意思是「目前專案的根目錄」（Current Working Directory）
// path.join() 用來拼接路徑 會長這樣：/Users/username/my-blog/src/content/blog
const postsDirectory = path.join(process.cwd(), "src/content/blog");

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  // console.log(fileNames);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getAllPosts() {
  // 同步讀取 content/blog 資料夾下的所有檔案名稱。fs.readdirSync() 會返回一個陣列，裡面包含了所有檔案的名稱。
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // 移除".md"以獲取id
    //為何.md前面要一個 \，在正規表達式中，\ 是用來轉義特殊字元的。因為在正規表達式中，. 是一個特殊字元，表示「匹配任意單一字元」。如果你想匹配字面上的點（.），就需要在它前面加上反斜線 \ 來進行轉義。
    const slug = fileName.replace(/\.md$/, "");

    // 讀取markdown文件
    const fullPath = path.join(postsDirectory, fileName);
    // 第二參數是編碼格式
    // 如果我後面沒有放編碼格式，那麼讀取的文件內容將是一個Buffer對象，而不是字符串。buffer對象是一個代表二進制數據的數組，我們可以通過toString()方法將其轉換為字符串。
    // --method 1
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // --method 2
    // const fileContents = fs.readFileSync(fullPath);
    // const fileString = fileContents.toString();
    // console.log(fileString);

    // console.log(fileContents);

    // 使用gray-matter解析文章的元數據
    // matter是用來拆解檔案內容的工具，不能直接處理檔案路徑，所以要先讀取檔案內容
    const matterResult = matter(fileContents);

    // 計算閲讀時間
    const readTime = readingTime(matterResult.content);

    // 合併數據
    return {
      slug,
      readTime: readTime.text,
      ...matterResult.data,
    };
  });

  // 按日期排序
  //sort 是 陣列方法
  //根據日期新到舊排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}



//讀取單篇文章的markdown檔案
export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // 使用gray-matter解析文章的元數據
  const matterResult = matter(fileContents);

  // 計算閲讀時間
  const readTime = readingTime(matterResult.content);

  // 使用remark將markdown轉換為HTML
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 合併數據
  return {
    slug,
    contentHtml,
    readTime: readTime.text,
    ...matterResult.data,
  };
}
