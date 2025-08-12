'use client';

// No framer-motion imports
import { useRef, useState } from 'react';
import { codeExamples } from '@/lib/data';

export default function DeveloperSection() {
  const ref = useRef(null);
  const [activeTab, setActiveTab] = useState<'curl' | 'javascript'>('curl');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={ref} className="min-h-screen bg-black py-12 md:py-20 flex items-center overflow-hidden relative">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Small tag above title */}
            <div className="inline-block">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-md px-6 py-2">
                <span className="text-white/80 text-sm font-medium">Prezentare Demo</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Experimentează
              <br />
              <span className="bg-white bg-clip-text text-transparent">
                Puterea AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Descoperă cum agentul nostru AI poate transforma complet experiența clienților tăi în doar câteva minute.
            </p>

            {/* CTA Button */}
            <div>
              <button className="bg-black border border-white text-white font-bold py-2 px-5 rounded-full text-base transition-all duration-300 hover:bg-white hover:text-black">
                <span className="flex items-center">
                  <span>Testează Demo-ul</span>
                </span>
              </button>
            </div>
          </div>

          {/* Right Container for Image (empty, image is absolutely positioned below) */}
        </div>
      </div>
      {/* Absolutely positioned iPhone image at the bottom center */}
      <div
        className="absolute z-0"
        style={{
          right: '18%',
          left: 'auto',
          bottom: '0',
          transform: 'scale(1.45)',
          maxHeight: '600px',
          width: 'auto',
          maxWidth: '500px',
          borderRadius: '1.5rem',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
          overflow: 'hidden',
        }}
      >
        <img
          src="/DeveloperSection/IphoneImage.png"
          alt="Demo Developer Section"
          className="w-full h-auto block"
          style={{ display: 'block' }}
        />
        {/* Overlay container absolutely positioned in percent, always fixed inside image */}
        <div
          style={{
            position: 'absolute',
            left: '13%', // adjust as needed for your image
            top: '16%', // adjust as needed for your image
            width: '74%', // adjust as needed for your image
            height: '68%', // adjust as needed for your image
            background: 'rgba(0,255,255,0.04)',
            borderRadius: '1.2rem',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Place your content here */}
        </div>
      </div>

      {/* Decorative bottom image (above the phone) */}
      <div className="absolute left-0 bottom-0 w-full z-10 pointer-events-none select-none">
        <img
          src="/DeveloperSection/DeveloperSectionBottomImage.svg"
          alt="Decorative Bottom"
          className="w-full"
          style={{maxHeight: '220px', objectFit: 'cover'}}
        />
      </div>
    </section>
  );
}
