'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { API_URL } from '../lib/api';

interface Banner {
  id: number;
  title: string;
  image: string;
  link?: string;
}

interface BannerSliderProps {
  banners: Banner[];
}

export default function BannerSlider({ banners }: BannerSliderProps) {
  const isLoopable = banners.length > 1;

  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prepare banners with clones for infinite effect: [Last, ...Original, First]
  const extendedBanners = useMemo(() => {
    if (!isLoopable) return banners;
    return [banners[banners.length - 1], ...banners, banners[0]];
  }, [banners, isLoopable]);

  const [current, setCurrent] = useState(isLoopable ? 1 : 0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [useTransition, setUseTransition] = useState(true);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setUseTransition(true);
    setCurrent((prev) => prev + 1);
  }, [isTransitioning]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setUseTransition(true);
    setCurrent((prev) => prev - 1);
  };

  // Handle snapping at boundaries
  useEffect(() => {
    if (!isLoopable) return;

    let timeout: NodeJS.Timeout;
    
    if (current === 0) {
      // Snapped to prepended last item, jump to real last item
      timeout = setTimeout(() => {
        setUseTransition(false);
        setCurrent(banners.length);
        setIsTransitioning(false);
      }, 700);
    } else if (current === extendedBanners.length - 1) {
      // Snapped to appended first item, jump to real first item
      timeout = setTimeout(() => {
        setUseTransition(false);
        setCurrent(1);
        setIsTransitioning(false);
      }, 700);
    } else {
      timeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }

    return () => clearTimeout(timeout);
  }, [current, banners.length, extendedBanners.length, isLoopable]);

  useEffect(() => {
    if (isPaused || !isLoopable) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, isLoopable]);

  if (!banners || banners.length === 0) {
    return (
      <section className="relative w-full overflow-hidden rounded-[16px] mb-12 h-[350px] md:h-[450px] lg:h-[550px] bg-[#1a1a1a] flex items-center justify-center text-white/20">
        No Banners Available
      </section>
    );
  }

  // Calculate the transform for centering
  // On mobile: Full width (100%), On desktop: Centered with peek (80%)
  const slideWidth = isMobile ? 100 : 80; 
  const offset = isMobile ? 0 : (100 - slideWidth) / 2;
  const transformX = -(current * slideWidth) + offset;

  // Real index for indicators
  const realIndex = isLoopable 
    ? (current === 0 ? banners.length - 1 : current === extendedBanners.length - 1 ? 0 : current - 1)
    : 0;

  return (
    <section 
      className="relative w-full overflow-hidden mb-8 md:mb-12 py-2 md:py-4 h-[180px] md:h-[450px] lg:h-[550px] group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      dir="ltr"
    >
      {/* Sliding Track */}
      <div 
        className={`flex h-full py-1 md:py-2 ${useTransition ? 'transition-transform duration-700 ease-out' : ''}`}
        style={{ transform: `translateX(${transformX}%)`, width: '100%' }}
      >
        {extendedBanners.map((banner, index) => (
          <div
            key={`${banner.id}-${index}`}
            className={`relative flex-shrink-0 transition-all duration-700 h-full ${isMobile ? 'px-0' : 'px-1 md:px-2'}`}
            style={{ width: `${slideWidth}%` }}
            onClick={() => {
              if (index !== current && !isTransitioning) {
                setUseTransition(true);
                setCurrent(index);
              }
            }}
          >
            <div className={`relative w-full h-full transition-all duration-700 shadow-2xl ${
              index === current ? 'scale-100 opacity-100' : 'scale-[0.92] opacity-40 brightness-50'
            } ${isMobile ? 'rounded-none' : 'rounded-lg md:rounded-2xl overflow-hidden'}`}>
              {/* Image */}
              <Image
                src={`${API_URL}/uploads/${banner.image}`}
                alt={banner.title}
                fill
                className="object-cover object-center"
                unoptimized
                priority={index === current}
              />
              
              {/* Gradient Scrim */}
              <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Centered slide content overlay */}
              {index === current && (
                <div className="absolute inset-0 flex flex-col justify-end px-3 pb-8 pt-3 md:p-10 lg:p-14" dir="rtl">
                  <div className="flex items-center justify-between w-full">
                    
                    {/* Right: Title */}
                    <h2 className="text-sm md:text-3xl lg:text-5xl font-bold text-white drop-shadow-md tracking-tight truncate max-w-[60%] py-1 leading-normal">
                      {banner.title}
                    </h2>

                    {/* Left: Watch Button */}
                    {banner.link && (
                      <Link 
                        href={banner.link} 
                        className="bg-black/40 backdrop-blur-sm border border-white/30 text-white px-4 md:px-8 py-1 md:py-2.5 rounded-full text-[10px] md:text-base font-medium hover:bg-white hover:text-black transition-all flex items-center gap-2 active:scale-95"
                      >
                        مشاهدة
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Only on desktop */}
      {isLoopable && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#d4af37] text-white hover:text-black p-3 rounded-full backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 items-center justify-center translate-x-[-20px] group-hover:translate-x-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#d4af37] text-white hover:text-black p-3 rounded-full backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 items-center justify-center translate-x-[20px] group-hover:translate-x-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </>
      )}

      {/* Indicators/Dots */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1 md:gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setUseTransition(true);
                setCurrent(index + 1);
              }
            }}
            className={`transition-all duration-300 rounded-full ${
              index === realIndex 
                ? 'w-6 h-1.5 bg-[#d4af37]' 
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
