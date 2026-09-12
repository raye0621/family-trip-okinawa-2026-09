import type { Metadata, Viewport } from 'next';
import './globals.css';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const githubBasePath = process.env.GITHUB_ACTIONS === 'true' && repositoryName && !repositoryName.endsWith('.github.io')
  ? `/${repositoryName}`
  : '';

export const metadata: Metadata = {
  title: '快樂的家沖繩之旅 2026',
  description: '2026 年快樂的家沖繩之旅隨身行程與重要資訊',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: `${githubBasePath}/favicon-v2.png`, sizes: '64x64', type: 'image/png' },
      { url: `${githubBasePath}/app-icon-v2-192.png`, sizes: '192x192', type: 'image/png' },
      { url: `${githubBasePath}/app-icon-v2-512.png`, sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: `${githubBasePath}/apple-touch-icon-v2.png`, sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: '快樂的家沖繩之旅' },
};

export const viewport: Viewport = { themeColor: '#0f8399', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
