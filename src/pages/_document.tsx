import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const miniapp = {
    version: "1",
    imageUrl: "https://farcaster-hello-world.vercel.app/images/logo-1024.png",
    button: {
      title: "🚩 Start",
      action: {
        type: "launch_miniapp"
      }
    }
  };

  return (
    <Html lang="en">
      <Head>
        <meta name="fc:miniapp" content={JSON.stringify(miniapp)} />
        <meta name="fc:frame" content={JSON.stringify(miniapp)} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
