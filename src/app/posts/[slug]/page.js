import { getAllPostSlugs, getPostData } from '../../../lib/markdown';
import Layout from '../../../components/Layout';
import { formatDate } from '../../../lib/date';

// 這個函數告訴Next.js哪些路徑需要預渲染
export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map(path => path.params);
}

export default async function Post({ params }) {
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
        <div 
          className="post-content"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>
    </Layout>
  );
}