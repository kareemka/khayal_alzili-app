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
  const [play, setPlay] = useState(false);

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

  // Reset play state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPlay(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function getYouTubeId(url: string) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  const youtubeId = getYouTubeId(videoUrl);

  return (
    <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-8 md:p-12">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[310] bg-black/40 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      <div className="w-full max-w-[1000px] flex flex-col items-center">

        {/* Title */}
        <h3 className="text-lg md:text-2xl font-bold text-white mb-6 text-center">
          {title}
        </h3>

        {/* Video Container */}
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-black relative">

          {youtubeId ? (
            !play ? (
              // ▶️ شاشة البداية (زر تشغيل)
              <div
                onClick={() => setPlay(true)}
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer bg-black"
              >
                <div className="text-white text-lg mb-3">▶ تشغيل الفيديو</div>
                <div className="text-white/50 text-sm">
                  اضغط لتشغيل الفيديو
                </div>
              </div>
            ) : (
              // 🎬 iframe بعد الضغط
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )
          ) : (
            // ❌ رابط غير صالح
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <p className="text-white text-xl mb-3">رابط الفيديو غير صالح</p>
            </div>
          )}
        </div>

        {/* 🔗 fallback فتح في يوتيوب */}
        {youtubeId && (
          <a
            href={`https://www.youtube.com/watch?v=${youtubeId}`}
            target="_blank"
            className="mt-4 text-sm text-white/70 hover:text-white underline"
          >
            فتح الفيديو في يوتيوب
          </a>
        )}

      </div>
    </div>
  );
}