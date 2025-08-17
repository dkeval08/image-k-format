import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ImageKFormat - Free Online Image Format Converter",
  description:
    "Convert images between formats instantly. Support for JPEG, PNG, WebP, AVIF, and more. Fast, secure, and completely free image conversion tool.",
  keywords: [
    "image converter",
    "format converter",
    "JPEG to PNG",
    "PNG to WebP",
    "AVIF converter",
    "image optimization",
    "free image tools",
    "online converter",
    "batch conversion",
    "image compression",
  ],
  icons: {
    icon: "/favicon.ico", // place favicon.ico in /public
    shortcut: "/favicon.ico",
    apple: "/favicon.ico", // optional, for iOS
  },
  openGraph: {
    title: "ImageKFormat - Free Online Image Format Converter",
    description:
      "Convert images between formats instantly. Support for JPEG, PNG, WebP, AVIF, and more. Fast, secure, and completely free image conversion tool.",
    url: "https://ai-k-format.vercel.app",
    siteName: "AI KGenesis",
    images: [
      {
        url: "https://ai-k-format.vercel.app/logo.png", // ⚡ add an OG image in /public
        width: 1200,
        height: 630,
        alt: "AI KGenesis - Generate Stunning AI Images",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI KGenesis - AI Image Generator",
    description:
      "Generate, save, and share AI-powered images with ease. No login required.",
    images: ["https://ai-k-format.vercel.app/logo.png"], // ⚡ same OG image
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
        </head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
