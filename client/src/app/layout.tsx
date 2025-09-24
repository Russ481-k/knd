import "@/styles/globals.css";
import "@/styles/fonts.css"; // pretendard 폰트 CSS 임포트
import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import ScrollToTop from "@/components/common/ScrollToTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="케이앤디에너젠" />
        <meta property="og:url" content="https://kndenergen.co.kr" />
        <meta property="og:image" content="https://kndenergen.co.kr/images/knd_og.jpg" />
        <meta property="og:site_name" content="케이앤디에너젠" />
        <meta property="og:description" content="지속가능한 성장과 혁신을 통해 더 나은 미래를 만들어갑니다." />
        <meta name="description" content="지속가능한 성장과 혁신을 통해 더 나은 미래를 만들어갑니다." />
        <meta name="keywords" content="케이엔디에너젠, 케이앤디에너젠, knd, 에너젠, kndenergen, 수소가스 제조 및 공급, 부산물 활용, 친환경 에너지 솔루션, 고순도 수소가스, 고압스팀" />
        <link rel="Shortcut Icon" href="/images/favicon.ico" />
        <title>케이앤디에너젠</title>
        <Script
          src="/assets/lang-config.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="/assets/translation.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        ></Script>
      </head>
      {/* className에서 pretendard 제거 */}
      <body>
        <ScrollToTop />
        <div id="google_translate_element" style={{ display: "none" }}></div>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
