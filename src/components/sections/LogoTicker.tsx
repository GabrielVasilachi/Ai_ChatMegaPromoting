'use client';

// ...restored minimal ticker...
import { useEffect, useRef } from 'react';

const logos = ['Meta','Google','Stripe','Vercel','OpenAI','AWS'];

export default function LogoTicker() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    (async () => {
      try {
        const { gsap } = await import('gsap');
        if (wrapRef.current) {
          const row = wrapRef.current.querySelector('.ticker-row');
          if (row) {
            const totalWidth = row.scrollWidth;
            gsap.to(row, {
              x: -totalWidth / 2,
              duration: 20,
              repeat: -1,
              ease: 'none'
            });
          }
        }
      } catch {}
    })();
  }, []);

  return (
    <section className="bg-gray-50 py-12 md:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-center text-black text-xl md:text-2xl font-semibold mb-8">
          Deja încredințat de branduri moderne
        </h3>
        <div ref={wrapRef} className="relative">
          <div className="ticker-row flex gap-12 will-change-transform">
            {logos.concat(logos, logos).map((l,i)=>(
              <div key={i} className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-md bg-black text-white flex items-center justify-center text-xs font-bold">{l[0]}</div>
                <span className="text-sm font-medium text-gray-800">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
