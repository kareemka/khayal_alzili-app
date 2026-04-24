import Image from 'next/image';
import Link from 'next/link';
import { fetchApi, API_URL } from '@/app/lib/api';
import BannerSlider from '@/app/components/BannerSlider';
import { ShowCard } from '@/app/components/ShowCard';
import { BackstageSection } from '@/app/components/BackstageSection';

interface Show {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  thumbnailImage: string;
  badge?: string;
  subtitle?: string;
  category?: { name: string };
  createdAt: string;
  releaseYear: string;
}

interface Category {
  id: number;
  name: string;
  shows: Show[];
}

interface Banner {
  id: number;
  title: string;
  image: string;
  link?: string;
}

export default async function Home() {
  const [categories, banners]: [Category[], Banner[]] = await Promise.all([
    fetchApi('/categories'),
    fetchApi('/banners')
  ]).then(res => [res[0] || [], res[1] || []]);


  return (
    <div className="pb-24 pt-4 lg:pt-8 w-full px-4 lg:px-10 font-sans" dir="rtl">

      {/* Hero Banner Area - Managed via Admin */}
      <BannerSlider banners={banners} />

      {/* Dynamic Grid Rows */}
      <div className="space-y-10 lg:space-y-12">
        {categories.map((category) => (
          category.shows.length > 0 && (
            <MovieRow
              key={category.id}
              id={category.id}
              title={category.name}
              items={category.shows.map(show => ({
                id: show.id,
                title: show.title,
                image: `${API_URL}/uploads/${show.thumbnailImage}`,
                badge: show.releaseYear || new Date(show.createdAt).getFullYear().toString(),
              }))}
            />
          )
        ))}
      </div>
      {/* Backstage Section (Only on Home Page) */}
      <div className='mt-12 w-full'><BackstageSection /></div>

    </div>
  );
}

function MovieRow({ id, title, items }: { id: number, title: string, items: any[] }) {
  // Show up to 18 items to support 6 columns * 3 rows on large screens
  const displayedItems = items.slice(0, 18);

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-[4px] h-5 bg-[#d4af37] rounded-full shadow-[0_0_8px_#d4af37]"></div>
          <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter">
            {title}
          </h2>
        </div>
        <Link href={`/category?id=${id}`} className="text-[13px] font-black text-[#d4af37] hover:text-[#f8d45c] transition-all flex items-center gap-1 group bg-white/5 px-3 py-1 rounded-full border border-white/5 hover:bg-white/10">
          عرض الكل
          <svg className="transform group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-3 md:gap-5">
        {displayedItems.map((item, index) => (
          <div
            key={item.id}
            className={`
              ${index >= 9 ? 'hidden sm:block' : ''} 
              ${index >= 12 ? 'sm:hidden md:block' : ''} 
              ${index >= 15 ? 'md:hidden lg:block' : ''}
            `}
          >
            <ShowCard
              id={item.id}
              title={item.title}
              image={item.image}
              year={item.badge}
            />
          </div>
        ))}
      </div>
    </section>
  );
}