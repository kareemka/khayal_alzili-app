'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'الرئيسية', path: '/', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
  ];

  return (
    <nav className="hidden lg:flex fixed right-0 top-0 bottom-0 w-[240px] bg-[#141414] border-l border-white/5 flex-col z-50 shadow-2xl">
      {/* Logo Area */}
      <div className="py-8 flex justify-center mb-4">
        <Link href="/" className="relative h-14 w-32 flex items-center">
          <Image
            src="/logo.png"
            alt="Khayal Al-Zili Logo"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100px, 240px"
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
