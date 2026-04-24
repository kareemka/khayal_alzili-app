'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ShowCardProps {
  id: number;
  title: string;
  image: string;
  year?: string | number;
  className?: string;
}

export function ShowCard({ id, title, image, year, className = '' }: ShowCardProps) {
  return (
    <Link
      href={`/preview?id=${id}`}
      className={`group cursor-pointer flex flex-col relative ${className}`}
    >
      <div className="relative aspect-[2/3] rounded-lg md:rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 group-hover:ring-2 ring-[#d4af37] transition-all duration-300 shadow-lg group-hover:shadow-[#d4af37]/20">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-[#d4af37] text-black rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          </div>
        </div>

        {/* Year Badge */}
        {year && (
          <div className="absolute top-3 left-3 bg-[#141414]/80 backdrop-blur-md text-white/90 px-2 py-0.5 rounded text-[10px] font-black border border-white/10 uppercase tracking-tighter">
            {year}
          </div>
        )}

        {/* Title Overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-3 pt-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-xs md:text-sm text-white group-hover:text-[#d4af37] transition-colors truncate text-center">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
