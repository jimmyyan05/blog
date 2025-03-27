import Head from "next/head";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

export default function Layout({ children, home }) {
  const siteTitle = "Xander's Blog";

  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="個人部落格" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="header">
        <div className="header-inner">
          {home ? (
            <h3 className="heading">{siteTitle}</h3>
          ) : (
            <h3 className="heading">
              <Link href="/">{siteTitle}</Link>
            </h3>
          )}

          <div className="avatar-block">
            <ThemeToggle />
            <span className="by-text">by</span>
            <a href="/about">
              <Image
                src="/images/avatar.JPG"
                alt="Xander"
                width={36}
                height={36}
                className="avatar-img"
              />
            </a>
          </div>
        </div>
        {/* <p className="description">記錄我對程式設計的思考和發現</p> */}
      </header>
      <main>{children}</main>
      {!home && (
        <div className="back-home">
          <Link href="/">← 返回首頁</Link>
        </div>
      )}
      <footer className="footer">
        © {new Date().getFullYear()} Xander's Blog. All rights reserved.
      </footer>
    </div>
  );
}
