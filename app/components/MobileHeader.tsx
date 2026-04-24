'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'الرئيسية', path: '/', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
    { name: 'من نحن', path: '/#about-us', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> },
    { name: 'اتصل بنا', path: '/#contact-us', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
  ];

  return (
    <>
      <div className="lg:hidden flex justify-between items-center p-5 bg-[#141414]/90 backdrop-blur-md sticky top-0 z-[100] border-b border-white/5">
        <Link href="/" onClick={() => setIsOpen(false)}>
            <Image src="/logo.png" alt="Khayal Al-Zili" width={100} height={40} className="object-contain h-auto" priority />
        </Link>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-white/70 hover:text-white transition-colors focus:outline-none"
        >
          <Menu className="w-7 h-7" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Drawer */}
            <div className="absolute top-0 bottom-0 right-0 w-[260px] bg-[#141414] border-l border-white/5 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-5 flex justify-between items-center border-b border-white/5">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        <Image src="/logo.png" alt="Khayal Al-Zili" width={90} height={35} className="object-contain h-auto" />
                    </Link>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-white/50 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex flex-col gap-2 p-4 flex-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link 
                                key={item.path} 
                                href={item.path} 
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-4 px-4 py-4 text-[16px] font-bold rounded-xl relative transition-all duration-300 ${
                                    isActive 
                                    ? 'text-primary bg-[#1f1f1f]' 
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-md shadow-[0_0_10px_#d4af37]"></div>}
                                {item.icon}
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
      )}
    </>
  );
}
