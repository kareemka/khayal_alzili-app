import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/app/lib/api';
import CategoryClient from './CategoryClient';

interface Show {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  thumbnailImage: string;
  badge?: string;
  subtitle?: string;
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
  shows: Show[];
}

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await searchParams;
  if (!id) return { title: 'التصنيف غير موجود' };

  try {
    const category: Category = await fetchApi(`/categories/${id}`);
    if (!category) return { title: 'التصنيف غير موجود' };

    return {
      title: `${category.name} - خيال الظل`,
      description: `تصفح أحدث الأعمال في قسم ${category.name} من إنتاج خيال الظل.`,
      openGraph: {
        title: category.name,
        description: `أحدث إنتاجات قسم ${category.name}`,
        type: 'website',
      },
    };
  } catch (err) {
    return { title: 'خيال الظل' };
  }
}

async function CategoryContent({ id }: { id?: string }) {
  if (!id) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 italic uppercase tracking-tighter">لم يتم تحديد تصنيف</h2>
        <Link href="/" className="text-[#d4af37] hover:underline font-bold">العودة للرئيسية</Link>
      </div>
    );
  }

  try {
    const category: Category = await fetchApi(`/categories/${id}`);
    if (!category) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 italic uppercase tracking-tighter">التصنيف غير موجود</h2>
          <Link href="/" className="text-[#d4af37] hover:underline font-bold">العودة للرئيسية</Link>
        </div>
      );
    }

    return <CategoryClient category={category} />;
  } catch (err) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 italic uppercase tracking-tighter">حدث خطأ أثناء التحميل</h2>
        <Link href="/" className="text-[#d4af37] hover:underline font-bold">العودة للرئيسية</Link>
      </div>
    );
  }
}

export default async function CategoryPage({ searchParams }: Props) {
  const { id } = await searchParams;

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <CategoryContent id={id} />
    </Suspense>
  );
}
