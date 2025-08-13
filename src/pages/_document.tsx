import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="fc:miniapp" content="<stringified MiniAppEmbed JSON>" />
        <meta name="fc:frame" content="<stringified MiniAppEmbed JSON>" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
