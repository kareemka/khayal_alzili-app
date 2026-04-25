'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchApi, API_URL } from '../../lib/api';
import { Camera, ChevronRight, ChevronLeft, X, Maximize, Download, ArrowRight } from 'lucide-react';

interface BackstageItem {
  id: number;
  image: string;
  title?: string;
}

export default function BackstagePage() {
  const [items, setItems] = useState<BackstageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [colCount, setColCount] = useState(4);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 768) setColCount(2);
      else if (window.innerWidth < 1024) setColCount(3);
      else setColCount(4);
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const fetchItems = async (pageNumber: number) => {
    try {
      const response = await fetchApi(`/backstage?page=${pageNumber}&limit=24`);
      const newItems = response.data || [];
      if (pageNumber === 1) {
        setItems(newItems);
      } else {
        setItems(prev => [...prev, ...newItems]);
      }
      setHasMore(pageNumber < (response.totalPages || 1));
    } catch (error) {
      console.error('Failed to load backstage items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchItems(page);
  }, [page]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (observerTarget.current) observer.observe(observerTarget.current);
    
    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [handleObserver]);

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

  return (
    <main className="min-h-screen bg-[#111111] pt-6 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all">
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-10 bg-primary rounded-full shadow-[0_0_15px_#d4af37]"></div>
              <div>
                <h1 className="text-xl font-black text-white uppercase tracking-tighter">كواليس</h1>
                <p className="text-white/40 text-sm font-bold uppercase tracking-widest mt-1">خلف عدسات خيال الظل</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <div className="h-px w-32 bg-gradient-to-l from-white/10 to-transparent"></div>
            <Camera className="text-white/20 w-6 h-6" />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="flex gap-4 w-full">
          {Array.from({ length: colCount }).map((_, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4 flex-1">
              {items
                .map((item, index) => ({ item, index }))
                .filter((_, index) => index % colCount === colIdx)
                .map(({ item, index }) => (
                  <div
                    key={item.id}
                    className="relative w-full overflow-hidden group/item cursor-pointer rounded-xl"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.title || "Backstage Image"}
                      width={800}
                      height={800}
                      className="w-full h-auto block transition-transform duration-700 group-hover/item:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>

                    {item.title && (
                      <div className="absolute bottom-4 left-4 right-12 text-right opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
                        <p className="text-white font-bold text-sm md:text-base line-clamp-2">{item.title}</p>
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white/60 opacity-0 group-hover/item:opacity-100 transition-all duration-500 translate-y-4 group-hover/item:translate-y-0 md:bottom-4 md:right-4 md:p-2.5">
                      <Camera className="w-4 h-4" />
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* Loading Indicator & Observer Target */}
        <div ref={observerTarget} className="flex justify-center py-8">
          {loading && (
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          )}
          {!hasMore && items.length > 0 && (
            <p className="text-white/40 font-bold uppercase tracking-widest text-sm">نهاية المعرض</p>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111111]/95 backdrop-blur-md animate-in fade-in duration-300">
          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-20 bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex items-center gap-6 text-white/70" dir="ltr">
              <button className="hover:text-white transition-colors" title="تكبير">
                <Maximize className="w-6 h-6" />
              </button>
              <a
                href={`${API_URL}/uploads/${items[selectedImageIndex].image}`}
                download
                target="_blank"
                className="hover:text-white transition-colors"
                title="تحميل"
              >
                <Download className="w-6 h-6" />
              </a>
            </div>
            
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="text-white/70 hover:text-white transition-colors p-2"
              title="إغلاق"
            >
              <X className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-20 hover:scale-110 active:scale-95"
            dir="ltr"
          >
            <ChevronLeft className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-20 hover:scale-110 active:scale-95"
            dir="ltr"
          >
            <ChevronRight className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1} />
          </button>

          {/* Image Display */}
          <div
            className="relative w-full h-full max-w-7xl max-h-[90vh] p-4 md:p-16 flex items-center justify-center z-10 mt-16"
            onClick={() => setSelectedImageIndex(null)}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`${API_URL}/uploads/${items[selectedImageIndex].image}`}
                alt={items[selectedImageIndex].title || "Backstage Fullscreen"}
                fill
                className="object-contain drop-shadow-2xl"
                unoptimized
                priority
              />
              {items[selectedImageIndex].title && (
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent flex justify-center text-center">
                  <p className="text-white text-xl md:text-3xl font-black max-w-4xl">{items[selectedImageIndex].title}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
