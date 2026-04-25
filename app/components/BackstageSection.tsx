'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchApi, API_URL } from '../lib/api';
import { Camera, ChevronRight, ChevronLeft, X, Maximize, Download } from 'lucide-react';

interface BackstageItem {
  id: number;
  image: string;
}

export function BackstageSection() {
  const [items, setItems] = useState<BackstageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchApi('/backstage');
        setItems(data || []);
      } catch (error) {
        console.error('Failed to load backstage items');
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (selectedImageIndex === null) return;
        if (e.key === 'Escape') setSelectedImageIndex(null);
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, items.length]);

  const nextImage = () => {
    if (selectedImageIndex !== null) {
        setSelectedImageIndex((selectedImageIndex + 1) % items.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
        setSelectedImageIndex((selectedImageIndex - 1 + items.length) % items.length);
    }
  };

  if (loading || items.length === 0) return null;

  return (
    <section id="backstage" className="w-full" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8 px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-start gap-8">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-primary rounded-full shadow-[0_0_15px_#d4af37]"></div>
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">كواليس</h2>
                    <p className="text-white/30 text-xs font-bold uppercase tracking-widest">ما وراء خيال الظل</p>
                </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
                 <div className="h-px w-24 bg-gradient-to-l from-white/10 to-transparent"></div>
                 <Camera className="text-white/20 w-5 h-5" />
            </div>
        </div>

        {/* Masonry Gallery Section */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-4 space-y-2 md:space-y-4">
            {items.map((item, index) => (
                <div 
                    key={item.id} 
                    className="relative w-full overflow-hidden group/item cursor-pointer break-inside-avoid rounded-lg"
                    onClick={() => setSelectedImageIndex(index)}
                >
                    <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt="Backstage"
                        className="w-full h-auto block transition-transform duration-700 group-hover/item:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute bottom-2 right-2 p-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white/60 opacity-0 group-hover/item:opacity-100 transition-all duration-500 translate-y-4 group-hover/item:translate-y-0 md:bottom-4 md:right-4 md:p-2">
                         <Camera className="w-3 h-3 md:w-4 md:h-4" />
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111111] animate-in fade-in duration-300">
            
            {/* Top Controls */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-20 bg-gradient-to-b from-black/60 to-transparent">
                {/* Left Controls (ltr order visually left in screenshot) */}
                <div className="flex items-center gap-6 text-white/70" dir="ltr">
                    <button className="hover:text-white transition-colors" title="تكبير">
                        <Maximize className="w-5 h-5" />
                    </button>
                    <a 
                        href={`${API_URL}/uploads/${items[selectedImageIndex].image}`} 
                        download 
                        target="_blank"
                        className="hover:text-white transition-colors" 
                        title="تحميل"
                    >
                        <Download className="w-5 h-5" />
                    </a>
                </div>
                
                {/* Right Controls (Close) */}
                <button 
                    onClick={() => setSelectedImageIndex(null)}
                    className="text-white/70 hover:text-white transition-colors p-2"
                    title="إغلاق"
                >
                    <X className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
                </button>
            </div>

            {/* Navigation Arrows */}
            <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-20"
                dir="ltr"
            >
                <ChevronLeft className="w-10 h-10 md:w-14 md:h-14" strokeWidth={1} />
            </button>

            <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-20"
                dir="ltr"
            >
                <ChevronRight className="w-10 h-10 md:w-14 md:h-14" strokeWidth={1} />
            </button>

            {/* Image Display */}
            <div 
                className="relative w-full h-full max-w-6xl max-h-[90vh] p-4 md:p-16 flex items-center justify-center z-10 mt-12"
                onClick={() => setSelectedImageIndex(null)}
            >
                <div 
                    className="relative w-full h-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image
                        src={`${API_URL}/uploads/${items[selectedImageIndex].image}`}
                        alt="Backstage Fullscreen"
                        fill
                        className="object-contain drop-shadow-2xl"
                        unoptimized
                        priority
                    />
                </div>
            </div>
        </div>
      )}
    </section>
  );
}
