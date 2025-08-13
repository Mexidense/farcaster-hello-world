import '../styles/globals.css';
import '@farcaster/auth-kit/styles.css';

import type { AppProps } from 'next/app';
import { AuthKitProvider } from '@farcaster/auth-kit';

const config = {
  // For production use a mainnet Optimism RPC provider (Alchemy/Infura/QuickNode).
  rpcUrl: process.env.NEXT_PUBLIC_FC_RPC_URL || 'https://mainnet.optimism.io',
  // Your deployed domain (Vercel gives you xxx.vercel.app). Use env var in Vercel.
  domain: process.env.NEXT_PUBLIC_FC_DOMAIN || 'localhost',
  // SIWE return URI (should be your app login/landing page)
  siweUri: process.env.NEXT_PUBLIC_FC_SIWE_URI || 'https://your-domain.example/login',
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthKitProvider config={config}>
      <Component {...pageProps} />
    </AuthKitProvider>
  );
}
