import React from 'react';

export function AboutSection() {
  return (
    <section className="w-full mt-24 mb-10 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-[#1f1f1f] to-[#141414] border border-white/5 shadow-2xl text-center">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              من نحن
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              خيال الظل للإنتاج <br className="hidden md:block" /> والتوزيع الفني
            </h2>
            
            <p className="max-w-3xl mx-auto text-white/50 text-base md:text-lg leading-relaxed font-medium">
              شركة رائدة في مجال الإنتاج والتوزيع الفني، نكرس جهودنا لصناعة محتوى درامي وسينمائي متميز يحاكي تطلعات المشاهد العربي. نؤمن بأن الإبداع هو جسرنا للوصول إلى قلوبكم، ونلتزم بأعلى معايير الجودة في كل عمل نقدمه، لنبقى دائماً "خيالكم" المفضل في عالم الدراما.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex flex-col items-center gap-1">
                <span className="text-white font-bold text-xl">10+</span>
                <span className="text-white/30 text-xs">سنوات خبرة</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block"></div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-white font-bold text-xl">50+</span>
                <span className="text-white/30 text-xs">عمل حصري</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block"></div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-white font-bold text-xl">1M+</span>
                <span className="text-white/30 text-xs">مشاهدة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
