import { getAllPosts } from "../lib/markdown";
import Layout from "../components/Layout";
import PostList from "../components/PostList";

export default function Home() {
  const allPosts = getAllPosts();

  return (
    <Layout home>
      <section className="intro">
        <p>
          嗨，我是Xander。這是我的部落格，我在這裡分享我對前端開發和JavaScript的思考。
        </p>
      </section>

      <section>
        <PostList posts={allPosts} />
      </section>
    </Layout>
  );
}
