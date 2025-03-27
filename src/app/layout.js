import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Xander's Blog",
  description: "個人部落格",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning 避免 hydration 錯誤
    <html lang="zh" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
