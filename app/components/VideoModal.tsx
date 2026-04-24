'use client';

import { useEffect, useState } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl: string;
}

export function VideoModal({ isOpen, onClose, title, videoUrl }: VideoModalProps) {
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  if (!isOpen) return null;

  function getYouTubeId(url: string) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  const youtubeId = getYouTubeId(videoUrl);

  return (
    <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md animate-in fade-in duration-500 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-6xl relative animate-in zoom-in-95 duration-500">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className="w-1 h-6 bg-primary rounded-full shadow-[0_0_10px_#d4af37]"></div>
             <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tighter uppercase">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
          </button>
        </div>

        {/* Video Player Container */}
        <div className="w-full aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-black border border-white/5 relative group">
          {youtubeId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&origin=${encodeURIComponent(origin)}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <p className="text-xl font-bold text-white mb-2">رابط الفيديو غير متوفر</p>
              <p className="text-white/40 text-sm max-w-xs">عذراً، لا يمكننا تشغيل هذا المحتوى حالياً. يرجى المحاولة مرة أخرى لاحقاً.</p>
            </div>
          )}
        </div>
        
        {/* Footer info */}
        <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale pointer-events-none">
           <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20"></div>
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Khayal Al-Zili Premium Player</span>
           <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20"></div>
        </div>
      </div>
    </div>
  );
}
