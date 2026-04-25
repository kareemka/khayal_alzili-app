'use client';

import { useEffect, useState } from 'react';
import { X, Play, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl: string;
}

export function VideoModal({ isOpen, onClose, title, videoUrl }: VideoModalProps) {
  const [iframeError, setIframeError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIframeError(false);
      setShowFallback(false);
    }
  }, [isOpen]);

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

  // Detect mobile devices
  const isMobile = typeof window !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (!isOpen) return null;

  function getYouTubeId(url: string) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  const youtubeId = getYouTubeId(videoUrl);
  const youtubeWatchUrl = youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : videoUrl;
  const embedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : null;

  // On mobile or if iframe errored, show the direct YouTube button
  const shouldShowFallback = !youtubeId || iframeError || showFallback;

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

          {youtubeId && !shouldShowFallback ? (
            /* Embed iframe - using official YouTube embed format */
            <iframe
              key={youtubeId}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onError={() => setIframeError(true)}
            />
          ) : youtubeId ? (
            /* Fallback: styled YouTube button for mobile / blocked embeds */
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-[#0a0a0a] to-black gap-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.2)] animate-pulse">
                  <Play className="w-12 h-12 text-[#d4af37] fill-[#d4af37] ml-1" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xl font-black text-white">{title}</p>
                <p className="text-white/40 text-sm max-w-xs">
                  افتح الفيديو مباشرة على يوتيوب لمشاهدته
                </p>
              </div>

              <a
                href={youtubeWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#d4af37] hover:bg-[#f8d45c] text-black font-black px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)] text-base uppercase tracking-wide"
              >
                <Play className="w-5 h-5 fill-black" />
                مشاهدة على يوتيوب
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Option to try embed again */}
              {iframeError && (
                <button
                  onClick={() => { setIframeError(false); setShowFallback(false); }}
                  className="text-white/30 hover:text-white/60 text-xs underline transition-colors mt-2"
                >
                  إعادة المحاولة
                </button>
              )}
            </div>
          ) : (
            /* Invalid URL */
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-[#141414] to-black">
              <div className="w-24 h-24 rounded-full bg-red-500/5 border border-red-500/20 flex items-center justify-center text-red-500 mb-6 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                <X className="w-10 h-10" />
              </div>
              <p className="text-2xl font-black text-white mb-3">رابط الفيديو غير صالح</p>
              <p className="text-white/40 text-sm max-w-sm leading-relaxed">تأكد من إدخال رابط يوتيوب صحيح من لوحة التحكم لتتمكن من مشاهدة الفيديو الترويجي هنا.</p>
            </div>
          )}

          {/* Manual fallback toggle for desktop users with issues */}
          {youtubeId && !shouldShowFallback && (
            <button
              onClick={() => setShowFallback(true)}
              className="absolute bottom-4 left-4 text-white/20 hover:text-white/50 text-xs transition-colors z-10 bg-black/30 px-2 py-1 rounded"
            >
              مشكلة في التشغيل؟
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

