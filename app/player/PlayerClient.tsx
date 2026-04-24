'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronRight, Home, Info } from 'lucide-react';
import Link from 'next/link';

export default function PlayerClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const videoUrl = searchParams.get('url');
  const title = searchParams.get('title') || 'عرض فيديو';

  function getYouTubeId(url: string | null) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  const youtubeId = getYouTubeId(videoUrl);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col" dir="rtl">
      
      {/* Immersive Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <button 
            onClick={() => router.back()}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 transition-all group"
          >
            <ChevronRight className="w-7 h-7 transition-transform group-hover:translate-x-1" />
          </button>
          
          <div className="space-y-0.5">
            <h1 className="text-xl md:text-2xl font-black italic tracking-tighter uppercase drop-shadow-lg">{title}</h1>
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              جاري العرض الآن
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 pointer-events-auto">
           <Link href="/" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/5 hover:bg-white/10 transition-all text-white/60 hover:text-white">
              <Home className="w-5 h-5" />
           </Link>
        </div>
      </header>

      {/* Main Player Area */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
         {/* Background Ambient Glow */}
         <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-video bg-primary/20 blur-[150px] rounded-full"></div>
         </div>

         <div className="relative z-10 w-full max-w-[1920px] aspect-video shadow-[0_0_100px_rgba(0,0,0,1)]">
            {youtubeId ? (
               <iframe
                 className="w-full h-full"
                 src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                 title={title}
                 frameBorder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                 allowFullScreen
               ></iframe>
            ) : (
               <div className="w-full h-full flex flex-col items-center justify-center bg-[#111] p-10 text-center border border-white/5 rounded-3xl">
                  <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6 border border-red-500/20 shadow-2xl">
                    <Info className="w-12 h-12" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">عذراً، تعذر تحميل الفيديو</h2>
                  <p className="text-white/40 max-w-md mx-auto leading-relaxed">رابط الفيديو غير صالح أو تم حذفه من المصدر. يرجى العودة والمحاولة مرة أخرى.</p>
                  <button 
                    onClick={() => router.back()}
                    className="mt-8 px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-primary transition-all shadow-xl"
                  >
                    العودة للخلف
                  </button>
               </div>
            )}
         </div>
      </main>
  
    </div>
  );
}
