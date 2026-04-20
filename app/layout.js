import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/providers/toast-provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Student Errand Services - Connect. Complete. Earn.",
    template: "%s | Student Errand Services"
  },
  description: "The premier platform connecting students who need errands done with reliable student runners. Post tasks, earn money, and build community on campus.",
  keywords: [
    "student errands",
    "campus services", 
    "student jobs",
    "task marketplace",
    "university services",
    "student community",
    "earn money",
    "campus delivery",
    "student platform"
  ],
  authors: [{ name: "Student Errand Services Team" }],
  creator: "Student Errand Services",
  publisher: "Student Errand Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:3000',
    title: 'Student Errand Services - Connect. Complete. Earn.',
    description: 'The premier platform connecting students who need errands done with reliable student runners. Join thousands of students already using our trusted community.',
    siteName: 'Student Errand Services',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Student Errand Services - Campus Task Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Errand Services - Connect. Complete. Earn.',
    description: 'The premier platform connecting students who need errands done with reliable student runners.',
    images: ['/og-image.png'],
    creator: '@studenterrands',
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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ]
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#667eea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Student Errands" />
      </head>
      <body className={`${inter.className} min-h-full bg-slate-50 overflow-x-hidden`}>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
