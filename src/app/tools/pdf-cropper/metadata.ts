import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Cropper - Crop PDF Pages Online | Free PDF Tool',
  description:
    'Crop PDF pages to remove margins and unwanted content with our free online PDF cropper. Visual crop selection, preview before download, and completely private - all processing happens in your browser.',
  keywords: [
    'pdf cropper',
    'crop pdf',
    'crop pdf pages',
    'remove pdf margins',
    'pdf margin remover',
    'trim pdf',
    'pdf tool',
    'online pdf editor',
    'free pdf cropper',
    'pdf page crop',
  ],
  authors: [{ name: 'Jeet Singh' }],
  creator: 'Jeet Singh',
  publisher: 'Jeet Singh',
  metadataBase: new URL('https://jsingh.dev'),
  alternates: {
    canonical: 'https://jsingh.dev/tools/pdf-cropper',
  },
  openGraph: {
    title: 'PDF Cropper - Crop PDF Pages Online',
    description:
      'Free online PDF cropper with visual crop selection. Remove margins and unwanted content from PDF pages. Privacy-focused - all processing in your browser.',
    url: 'https://jsingh.dev/tools/pdf-cropper',
    siteName: 'jsingh.dev',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://jsingh.dev/og-pdf-cropper.png',
        width: 1200,
        height: 630,
        alt: 'PDF Cropper Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Cropper - Crop PDF Pages Online',
    description:
      'Free online PDF cropper. Visual crop selection, preview before download, completely private.',
    creator: '@jeetblahiri',
    images: ['https://jsingh.dev/og-pdf-cropper.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};
