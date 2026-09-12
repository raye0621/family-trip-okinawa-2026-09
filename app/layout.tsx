import type { Metadata, Viewport } from 'next';
import './globals.css';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const githubBasePath = process.env.GITHUB_ACTIONS === 'true' && repositoryName && !repositoryName.endsWith('.github.io')
  ? `/${repositoryName}`
  : '';

export const metadata: Metadata = {
  title: '沖繩家族旅行 2026',
  description: '2026 年沖繩家族旅行的隨身行程與重要資訊',
  manifest: '/manifest.webmanifest',
  icons: { icon: `${githubBasePath}/favicon.svg`, apple: `${githubBasePath}/favicon.svg` },
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: '沖繩旅行' },
};

export const viewport: Viewport = { themeColor: '#0f8399', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
