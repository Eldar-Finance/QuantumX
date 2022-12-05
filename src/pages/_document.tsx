/* eslint-disable @next/next/inline-script-id */
/* eslint-disable @next/next/next-script-for-ga */
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import React from "react";
const MyDocument = () => {
  return (
    <Html lang="en" dir="ltr" prefix="og: https://ogp.me/ns#">
      <Head>
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          strategy="lazyOnload"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VKFT6SXBQ0"
        ></Script>
        <Script strategy="lazyOnload">
          {`
        
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-VKFT6SXBQ0');
      `}
        </Script>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
