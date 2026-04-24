import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { fetchApi, API_URL } from '@/app/lib/api';
import PreviewClient from './PreviewClient';

interface Show {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  thumbnailImage: string;
  youtubeTrailerLink: string;
  promoLink: string;
  seoImage?: string;
  releaseYear: string;
  category?: { id: number; name: string };
}

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await searchParams;
  if (!id) return { title: 'العمل غير موجود' };

  try {
    const show: Show = await fetchApi(`/shows/${id}`);
    if (!show) return { title: 'العمل غير موجود' };

    const previousImages = (await parent).openGraph?.images || [];
    const shareImage = show.seoImage 
      ? `${API_URL}/uploads/${show.seoImage}` 
      : `${API_URL}/uploads/${show.coverImage}`;

    return {
      title: `${show.title} - خيال الظل`,
      description: show.description.slice(0, 160),
      openGraph: {
        title: show.title,
        description: show.description.slice(0, 160),
        images: [shareImage, ...previousImages],
        type: 'video.movie',
      },
      twitter: {
        card: 'summary_large_image',
        title: show.title,
        description: show.description.slice(0, 160),
        images: [shareImage],
      },
    };
  } catch (err) {
    return { title: 'خيال الظل' };
  }
}

async function PreviewContent({ id }: { id?: string }) {
  if (!id) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">لم يتم تحديد عمل للمعاينة</h2>
        <Link href="/" className="text-[#d4af37] hover:underline">العودة للرئيسية</Link>
      </div>
    );
  }

  try {
    const show: Show = await fetchApi(`/shows/${id}`);
    if (!show) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">لم يتم العثور على هذا العمل</h2>
          <Link href="/" className="text-[#d4af37] hover:underline">العودة للرئيسية</Link>
        </div>
      );
    }

    return <PreviewClient show={show} />;
  } catch (err) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">حدث خطأ أثناء تحميل البيانات</h2>
        <Link href="/" className="text-[#d4af37] hover:underline">العودة للرئيسية</Link>
      </div>
    );
  }
}

export default async function PreviewPage({ searchParams }: Props) {
  const { id } = await searchParams;

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <PreviewContent id={id} />
    </Suspense>
  );
}
