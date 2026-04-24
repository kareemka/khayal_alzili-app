import Image from 'next/image';
import { fetchApi, API_URL } from '../lib/api';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { AboutSection } from '../components/AboutSection';



export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, clients] = await Promise.all([
    fetchApi('/settings'),
    fetchApi('/clients').catch(() => [])
  ]);

  return (
    <div className="flex w-full min-h-screen">
      {/* Main Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 lg:mr-[240px] w-full lg:max-w-[calc(100vw-240px)] relative flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden flex justify-start items-center p-5 bg-[#141414]/80 backdrop-blur-md sticky top-0 z-[100] border-b border-white/5">
          <Image src="/logo.png" alt="Khayal Al-Zili" width={100} height={40} className="object-contain h-auto" priority />
        </div>

        {/* Page Content */}
        <div className="flex-1">
          {children}
        </div>

        {/* Structured Sections */}
        <AboutSection />

        {/* Clients Logo Grid */}
        {clients && clients.length > 0 && (
          <section className="w-full mb-24 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-3 text-center">
                   <h3 className="text-primary/60 text-[10px] font-black tracking-[0.4em] uppercase">Success Partners</h3>
                   <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">شركاء النجاح</h2>
                   <div className="h-1.5 w-16 bg-primary rounded-full shadow-[0_0_10px_#d4af37]"></div>
                </div>

                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center justify-items-center transition-opacity duration-700">
                  {clients.map((client: any) => (
                    <div key={client.id} className="relative w-32 h-16 transition-all duration-500 cursor-pointer transform hover:scale-110">
                      <Image
                        src={`${API_URL}/uploads/${client.image}`}
                        alt="Client Logo"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Global Footer */}
        <Footer settings={settings} />
      </main>
    </div>
  );
}
