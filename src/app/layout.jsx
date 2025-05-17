// src/app/layout.js (Server Component)
import "./font.css";
import "./globals.scss";
import "./app.css";
import "./notification.css";
import ClientWrapper from "@/components/ClientWrapper";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-H2CJ5VKG2Z"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H2CJ5VKG2Z');
          `}
        </Script>

        {/* JSON-LD Structured Data */}
        <Script id="ld-json" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "KissanGrowth",
            "url": "https://kissangrowth.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://kissangrowth.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </Script>

        {/* Razorpay Script */}
        <Script
          defer
          src="https://checkout.razorpay.com/v1/checkout.js"
        />

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9556130869557106"
          crossOrigin="anonymous"
        />
      </head>

      <body suppressHydrationWarning={true}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
