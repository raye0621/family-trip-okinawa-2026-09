import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '快樂的家沖繩之旅 2026',
    short_name: '快樂的家沖繩之旅',
    description: '家人的五天沖繩隨身行程與重要資訊',
    start_url: '.',
    display: 'standalone',
    background_color: '#f8f5ec',
    theme_color: '#0f8399',
    lang: 'zh-Hant',
    orientation: 'portrait',
    icons: [
      { src: 'app-icon-v2-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: 'app-icon-v2-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
