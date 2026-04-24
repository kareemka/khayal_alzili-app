'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { API_URL } from '@/app/lib/api';
import { VideoModal } from '@/app/components/VideoModal';
import { Play, Calendar, Tag, ChevronLeft, Info, Film } from 'lucide-react';

interface Show {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  thumbnailImage: string;
  youtubeTrailerLink: string;

  seoImage?: string;
  releaseYear: string;
  category?: { id: number; name: string };
}

export default function PreviewClient({ show }: { show: Show }) {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<'trailer' | null>(null);

  return (
    <div className="min-h-screen text-white selection:bg-primary selection:text-black overflow-x-hidden" dir="rtl">

      {/* Floating Back button */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/60 hover:border-primary/50 transition-all text-white shadow-2xl group"
        >
          <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
        </button>
      </div>

      <div className="w-full pb-32">
        {/* ===== HERO BANNER ===== */}
        <div className="relative w-full h-[55vh] md:h-[600px] lg:h-[650px] bg-[#0a0a0a] overflow-hidden">
          {/* Backdrop image */}
          {show.coverImage && (
            <Image
              src={`${API_URL}/uploads/${show.coverImage}`}
              alt={show.title}
              fill
              className="object-cover object-center opacity-50 transition-transform duration-1000 scale-105"
              unoptimized
              priority
            />
          )}

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent"></div>
          <div className="hidden md:block absolute inset-0 bg-gradient-to-l from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent"></div>

          {/* Content Area */}
          <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-12">
            <div className="flex flex-col md:flex-row items-end gap-8">
              {/* Poster on Desktop */}
              <div className="hidden md:block shrink-0 w-[180px] lg:w-[220px] transform hover:scale-105 transition-transform duration-500">
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border-2 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  {show.thumbnailImage && (
                    <Image
                      src={`${API_URL}/uploads/${show.thumbnailImage}`}
                      alt={show.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </div>
              </div>

              {/* Info & Buttons */}
              <div className="flex-1 space-y-6 text-center md:text-right w-full">
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mb-2">
                    <span className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">{show.category?.name || 'Drama'}</span>
                    <span className="flex items-center gap-1 text-white/50 text-xs font-bold"><Calendar className="w-3.5 h-3.5" /> {show.releaseYear || '2026'}</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-2xl text-center md:text-right">{show.title}</h1>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                  {/* Trailer Button - Now Gold Theme */}
                  <button
                    onClick={() => setActiveModal('trailer')}
                    className="w-fit flex items-center justify-center gap-2 bg-primary hover:bg-[#e0bc0e] text-black px-8 py-3 rounded-xl font-black text-sm md:text-base transition-all shadow-[0_10px_25px_rgba(212,175,55,0.2)] hover:scale-105 active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    مشاهدة الإعلان الترويجي
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details & Promo Section */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mt-16 space-y-16">

          {/* Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">نظرة عامة </h2>
              </div>
              <p className="text-lg text-white/60 leading-relaxed font-medium text-right whitespace-pre-wrap">{show.description}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Reusable Video Modals */}
      <VideoModal
        isOpen={activeModal === 'trailer'}
        onClose={() => setActiveModal(null)}
        title={show.title}
        videoUrl={show.youtubeTrailerLink}
      />


    </div>
  );
}
