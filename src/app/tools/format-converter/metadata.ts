import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON/YAML Format Converter",
  description:
    "Free online tool to convert between JSON and YAML formats. Easily transform your data structure from JSON to YAML or YAML to JSON with instant preview.",
  keywords: [
    "JSON to YAML",
    "YAML to JSON",
    "format converter",
    "JSON converter",
    "YAML converter",
    "data format tool",
  ],
  authors: [{ name: "Jeet Singh" }],
  creator: "Jeet Singh",
  metadataBase: new URL('https://jsingh.dev'),
  alternates: {
    canonical: 'https://jsingh.dev/tools/format-converter',
  },
  openGraph: {
    title: "JSON/YAML Format Converter | Jeet Singh",
    description: "Convert between JSON and YAML formats instantly with this free online tool",
    url: 'https://jsingh.dev/tools/format-converter',
    siteName: 'Jeet Singh',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'JSON/YAML Format Converter Tool',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON/YAML Format Converter | Jeet Singh',
    description: 'Convert between JSON and YAML formats instantly',
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
