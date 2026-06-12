import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="h-0.5 bg-slate-800/50 sticky top-20 z-40">
        <div
          className="h-full bg-[#38BDF8] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="grow bg-[#0b0f1a]">
        {children}
      </main>

      <Footer />
    </div>
  );
}
