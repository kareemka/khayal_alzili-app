'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl: string;
}

export function VideoModal({ isOpen, onClose, title, videoUrl }: VideoModalProps) {

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function getYouTubeId(url: string) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  const youtubeId = getYouTubeId(videoUrl);

  return (
    <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl animate-in fade-in duration-700 flex flex-col justify-center items-center p-4 sm:p-8 md:p-12">

      {/* Cinematic Glow Behind Video */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#d4af37]/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Floating Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 lg:top-10 lg:right-10 z-[310] group flex items-center gap-3 bg-black/40 hover:bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 md:p-4 rounded-full transition-all duration-300 hover:scale-105"
      >
        <span className="hidden md:block text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white">إغلاق</span>
        <X className="w-5 h-5 text-white/70 group-hover:text-white" strokeWidth={2.5} />
      </button>

      <div className="w-full max-w-[1200px] relative animate-in zoom-in-95 slide-in-from-bottom-10 duration-700 delay-100 fill-mode-both flex flex-col items-center">

        {/* Header */}
        <div className="w-full flex items-center justify-center mb-6 md:mb-8">
          <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/5 px-6 py-3 rounded-2xl shadow-xl">
            <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse shadow-[0_0_10px_#d4af37]"></div>
            <h3 className="text-lg md:text-2xl font-black text-white tracking-tighter uppercase truncate max-w-[200px] sm:max-w-md md:max-w-2xl">{title}</h3>
            <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse shadow-[0_0_10px_#d4af37]"></div>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="w-full aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] bg-[#0a0a0a] border border-white/10 relative group ring-1 ring-white/5">
          {youtubeId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            // <iframe
            //   className="w-full h-full"
            //   src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            //   title={title}
            //   frameBorder="0"
            //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            //   allowFullScreen
            // ></iframe>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-[#141414] to-black">
              <div className="w-24 h-24 rounded-full bg-red-500/5 border border-red-500/20 flex items-center justify-center text-red-500 mb-6 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                <X className="w-10 h-10" />
              </div>
              <p className="text-2xl font-black text-white mb-3">رابط الفيديو غير صالح</p>
              <p className="text-white/40 text-sm max-w-sm leading-relaxed">تأكد من إدخال رابط يوتيوب صحيح من لوحة التحكم لتتمكن من مشاهدة الفيديو الترويجي هنا.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
