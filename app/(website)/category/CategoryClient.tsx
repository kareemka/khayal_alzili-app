'use client';

import { useRouter } from 'next/navigation';
import { API_URL } from '@/app/lib/api';
import { ShowCard } from '@/app/components/ShowCard';

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

export default function CategoryClient({ category }: { category: Category }) {
  const router = useRouter();

  return (
    <div className="pb-24 pt-8 lg:pt-12 w-full px-6 lg:px-16" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <div>
            <span className="text-[#d4af37] text-xs font-black uppercase tracking-widest mb-1 block">تصفح الفئة</span>
            <h1 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">
              {category.name}
            </h1>
          </div>
        </div>
        <div className="hidden md:block">
          <p className="text-white/40 text-sm font-bold bg-white/5 px-4 py-2 rounded-full border border-white/5">
            عرض <span className="text-primary">{category.shows.length}</span> عمل فني
          </p>
        </div>
      </div>

      {/* Grid */}
      {category.shows.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-white/20 text-xl font-bold italic">لا توجد أعمال في هذا التصنيف حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
          {category.shows.map((show) => (
            <ShowCard
              key={show.id}
              id={show.id}
              title={show.title}
              image={`${API_URL}/uploads/${show.thumbnailImage}`}
              year={new Date(show.createdAt).getFullYear()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
