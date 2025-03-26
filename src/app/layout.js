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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
