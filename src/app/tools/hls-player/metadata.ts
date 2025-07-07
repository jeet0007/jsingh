import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HLS Player | Stream Videos with Episode Tracking',
  description: 'Advanced HLS video player with episode detection, auto-next functionality, playback history, and keyboard shortcuts. Perfect for streaming series and managing your viewing progress.',
  keywords: ['HLS player', 'video streaming', 'episode tracking', 'auto-next', 'playback history', 'M3U8', 'video player', 'streaming tool'],
  authors: [{ name: 'Jeet Singh' }],
  creator: 'Jeet Singh',
  metadataBase: new URL('https://jsingh.dev'),
  alternates: {
    canonical: 'https://jsingh.dev/tools/hls-player',
  },
  openGraph: {
    title: 'HLS Player - Advanced Video Streaming Tool | Jeet Singh',
    description: 'Stream HLS videos with episode detection, auto-next, and progress tracking. Full-featured player with keyboard shortcuts and history management.',
    url: 'https://jsingh.dev/tools/hls-player',
    siteName: 'Jeet Singh',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'HLS Video Player Tool',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HLS Player - Advanced Video Streaming Tool | Jeet Singh',
    description: 'Stream HLS videos with episode detection and progress tracking',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};