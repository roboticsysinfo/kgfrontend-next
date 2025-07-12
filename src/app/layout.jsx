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
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H2CJ5VKG2Z');
          `}
        </Script>

        {/* Facebook Meta Pixel - Updated */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '9930875950294753');
            fbq('track', 'PageView');
          `}
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

        <link
          rel="canonical"
          href="https://kissangrowth.com"
        />

      </head>

      <body suppressHydrationWarning={true}>
        <ClientWrapper>{children}</ClientWrapper>

        {/* Facebook Pixel Fallback for NoScript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=9930875950294753&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
