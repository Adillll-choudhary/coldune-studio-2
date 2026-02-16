import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Cursor from "@/components/ui/Cursor";
import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";
import BackToTop from "@/components/layout/BackToTop";
import GlobalAudioPlayer from "@/components/ui/GlobalAudioPlayer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coldune.com"),
  title: {
    default: "Coldune Studio | Creative Engineering & Visual Impact",
    template: "%s | Coldune Studio"
  },
  description: "Coldune Studio is a premium creative agency specialized in cinematic branding, immersive web design, and digital impact. We don't just create content, we create legacies.",
  keywords: [
    "Coldune", "Coldune Studio", "Creative Engineering", "Cinematic Branding",
    "Immersive Web Design", "Visual Production", "Greater Noida Agency",
    "Phase 01", "Digital Impact", "Creative R&D"
  ],
  authors: [{ name: "Adil" }, { name: "Arslan" }],
  creator: "Coldune Studio",
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" }
    ],
    apple: "/logo.png",
  },
  openGraph: {
    title: "Coldune Studio | Creative Engineering & Visual Impact",
    description: "We don't create content. We create impact. Enter the nexus of high-performance design and strategy.",
    url: "https://coldune.com",
    siteName: "Coldune Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Coldune Studio Nexus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coldune Studio | Creative Engineering & Visual Impact",
    description: "Enter the nexus of high-performance design and strategy.",
    images: ["/logo.png"],
    creator: "@coldunestudio",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background scroll-smooth">
      <body
        className="antialiased bg-background text-text-primary overflow-x-hidden selection:bg-accent selection:text-black"
      >
        <Preloader />
        <Cursor />
        <div className="noise-overlay" />
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen relative">{children}</main>
          <Footer />
          <BackToTop />
          <GlobalAudioPlayer />
        </SmoothScroll>
      </body>
    </html>
  );
}
