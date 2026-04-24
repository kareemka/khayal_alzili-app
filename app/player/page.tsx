import { Suspense } from 'react';
import { Metadata } from 'next';
import PlayerClient from './PlayerClient';

export const metadata: Metadata = {
  title: 'مشغل الفيديو | خيال الظل',
  description: 'مشاهدة العروض الترويجية والبروموهات الخاصة بأعمال خيال الظل.',
  robots: { index: false, follow: true }, // Don't index player pages
};

export default function PlayerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <PlayerClient />
    </Suspense>
  );
}
