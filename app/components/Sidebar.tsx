'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'الرئيسية', path: '/', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
    { name: 'من نحن', path: '/#about-us', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> },
    { name: 'اتصل بنا', path: '/#contact-us', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
  ];

  return (
    <nav className="hidden lg:flex fixed right-0 top-0 bottom-0 w-[240px] bg-[#141414] border-l border-white/5 flex-col z-50 shadow-2xl">
      {/* Logo Area */}
      <div className="py-10 flex justify-center mb-2 px-6">
        <Link href="/" className="relative w-full flex justify-center items-center">
          <Image
            src="/logo.png"
            alt="Khayal Al-Zili Logo"
            width={180}
            height={70}
            className="object-contain h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex flex-col gap-1.5 px-4 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path} 
              className={`flex items-center gap-4 px-4 py-3.5 text-[15px] font-bold rounded-lg relative transition-all duration-300 ${
                isActive 
                ? 'text-primary bg-[#1f1f1f]' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-l-md shadow-[0_0_10px_#d4af37]"></div>}
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
