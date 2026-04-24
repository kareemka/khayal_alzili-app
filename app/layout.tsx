import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'خيال الظل - Khayal Al-Zili | منصة الإنتاج الفني الأولى',
    template: '%s | خيال الظل'
  },
  description: 'موقع خيال الظل للأفلام والمسلسلات الحصرية. نكرس جهودنا لصناعة محتوى درامي وسينمائي متميز يحاكي تطلعات المشاهد العربي. اكتشف أحدث إنتاجاتنا الفنية.',
  keywords: ['خيال الظل', 'مسلسلات عربية', 'أفلام حصرية', 'دراما', 'إنتاج فني', 'توزيع فني', 'سينما عربية'],
  authors: [{ name: 'خيال الظل' }],
  metadataBase: new URL('https://khayal-alzili.com'),
  openGraph: {
    title: 'خيال الظل - Khayal Al-Zili',
    description: 'منصتكم المفضلة لمشاهدة أحدث المسلسلات والأفلام الحصرية من إنتاج خيال الظل.',
    url: '/',
    siteName: 'خيال الظل',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'خيال الظل للإنتاج الفني',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'خيال الظل - Khayal Al-Zili',
    description: 'استكشف عالم الدراما والسينما مع إنتاجات خيال الظل الحصرية.',
    images: ['/logo.png'],
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
    <html lang="ar" dir="rtl" className={`${cairo.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground font-cairo overflow-x-hidden selection:bg-primary selection:text-black">
        {children}
      </body>
    </html>
  );
}
