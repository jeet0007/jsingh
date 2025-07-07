import { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL to Screenshot | Capture Web Pages",
  description:
    "Free online tool to capture screenshots of any webpage. Convert URLs to high-quality images with customizable options.",
  keywords: [
    "URL to image",
    "website screenshot",
    "webpage capture",
    "URL screenshot tool",
    "web capture",
  ],
  authors: [{ name: "Jeet Singh" }],
  creator: "Jeet Singh",
  metadataBase: new URL('https://jsingh.dev'),
  alternates: {
    canonical: 'https://jsingh.dev/tools/url-to-screenshot',
  },
  openGraph: {
    title: "URL to Screenshot - Web Page Capture Tool | Jeet Singh",
    description: "Convert any webpage URL to a high-quality screenshot image",
    url: 'https://jsingh.dev/tools/url-to-screenshot',
    siteName: 'Jeet Singh',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'URL to Screenshot Tool',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL to Screenshot - Web Page Capture Tool | Jeet Singh',
    description: 'Convert any webpage URL to a high-quality screenshot image',
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
