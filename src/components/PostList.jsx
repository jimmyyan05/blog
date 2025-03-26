import Link from 'next/link';
import { formatDate } from '../lib/date';

export default function PostList({ posts }) {
  return (
    <ul className="post-list">
      {posts.map(({ slug, date, title, description, readTime }) => (
        <li className="post-item" key={slug}>
          <article>
            <header>
              <h3 className="post-title">
                <Link href={`/posts/${slug}`}>{title}</Link>
              </h3>
              <small className="post-meta">
                {formatDate(date)} • {readTime}
              </small>
            </header>
            <p className="post-excerpt">{description}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}