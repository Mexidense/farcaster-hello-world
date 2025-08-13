import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk'
import { SignInButton, useProfile } from '@farcaster/auth-kit';

type Profile = {
  fid?: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
  bio?: string;
};

export default function Home() {
  const { isAuthenticated, profile } = useProfile();
  const [primaryAddress, setPrimaryAddress] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrimary() {
      if (!profile?.fid) {
        return;
      }

      try {
        const res = await fetch(
          `https://api.farcaster.xyz/fc/primary-address?fid=${profile.fid}&protocol=ethereum`
        );
        const json = await res.json();
        const address = json?.result?.address?.address ?? null;
        setPrimaryAddress(address);
      } catch (e) {
        console.error('primary address fetch failed', e);
        setPrimaryAddress(null);
      }
    }

    sdk.actions.ready()

    fetchPrimary();
  }, [profile?.fid]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-100">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl font-semibold mb-4 text-center">Farcaster - Hello World</h1>

        {!isAuthenticated ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 text-center">
              Sign in with Farcaster (scan the QR or approve via Warpcast).
            </p>
            {/* Simple Sign In button from AuthKit */}
            <div className="flex justify-center">
              <SignInButton />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={profile?.pfpUrl ?? '/default-avatar.png'}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover border border-slate-200"
              />
              <div>
                <div className="font-medium text-lg">{profile?.displayName ?? '—'}</div>
                <div className="text-sm text-slate-500">@{profile?.username ?? '—'}</div>
              </div>
            </div>

            <hr className="my-2 border-slate-200" />

            <dl className="grid grid-cols-1 gap-2 text-sm">
              <div>
                <dt className="text-xs text-slate-500">FID</dt>
                <dd className="font-mono">{profile?.fid ?? '—'}</dd>
              </div>

              <div>
                <dt className="text-xs text-slate-500">Bio</dt>
                <dd>{profile?.bio ?? '—'}</dd>
              </div>

              <div>
                <dt className="text-xs text-slate-500">Primary wallet (ethereum)</dt>
                <dd className="font-mono break-all">{primaryAddress ?? '—'}</dd>
              </div>
            </dl>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-md border bg-slate-50 hover:bg-indigo-100 transition-colors duration-150"
              >
                Sign out (reload)
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
