'use client';

import { useState } from 'react';
import { footerLinks } from '@/lib/data';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-black text-white py-12 md:py-16 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 glow-text">
              Otonom AI
            </div>
            <p className="text-gray-400 mb-4 md:mb-6 max-w-md text-sm md:text-base leading-relaxed">
              Your 24/7 AI receptionist that never sleeps, never takes a break, 
              and always provides perfect customer service.
            </p>
            
            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 text-sm md:text-base"
              />
              <button
                type="submit"
                className="px-4 md:px-6 py-2 md:py-3 bg-white text-black rounded-lg font-semibold hover:scale-105 transition-transform duration-200 text-sm md:text-base"
              >
                {subscribed ? 'Thanks!' : 'Subscribe'}
              </button>
            </form>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-lg md:text-xl">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-lg md:text-xl">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-lg md:text-xl">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm md:text-base text-center md:text-left">
            © 2024 Otonom AI. All rights reserved.
          </p>
          <div className="flex space-x-4 md:space-x-6">
            <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">
              Terms
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">
              Privacy
            </a>
            <a href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
