'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function ROICalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [monthlyChats, setMonthlyChats] = useState(500);
  const [hoursSaved, setHoursSaved] = useState(0);
  const [costSavings, setCostSavings] = useState(0);

  // State and formulas
  const avgMinutesPerChat = 3;
  const automationRate = 0.8;
  const hourlyRateMDL = 150;

  // Calculate savings based on input
  useEffect(() => {
    const totalHours = (monthlyChats * avgMinutesPerChat * automationRate) / 60;
    const savings = totalHours * hourlyRateMDL;
    
    setHoursSaved(Math.round(totalHours));
    setCostSavings(Math.round(savings));
  }, [monthlyChats]);

  return (
    <section ref={ref} className="px-6 sm:px-8 lg:px-12 py-20 sm:py-24 bg-black relative">
      {/* Vertical dashed line on the left (full height, centered, semi-transparent) */}
      <div className="hidden md:block absolute z-20 w-full h-full pointer-events-none" style={{top:0, left:0, height:'100%'}}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative h-full" style={{height:'100%'}}>
          <div className="flex justify-center items-start w-full h-full" style={{position:'relative', height:'100%'}}>
            <div style={{
              position: 'absolute',
              left: '-30px',
              top: 0,
              height: '100%',
              borderLeft: '3px dashed #b3b3b3',
              opacity: 0.6,
              zIndex: 20,
              minHeight: '100%',
            }} />
          </div>
        </div>
      </div>
      {/* Dotted pattern background */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px]"></div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Află cât timp și bani poți economisi cu AI
            </h2>
            <div className="w-16 h-0.5 rounded bg-gradient-to-r from-indigo-400 to-sky-400 mt-3"></div>
          </div>

          <p className="text-lg text-slate-300 max-w-md">
            Calculează instant beneficiile integrării agentului nostru virtual. Vezi economiile în timp real.
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-slate-200">
              <span className="text-sky-400 mt-1">•</span>
              Economii imediate de costuri operaționale
            </li>
            <li className="flex items-start gap-3 text-slate-200">
              <span className="text-sky-400 mt-1">•</span>
              Răspunsuri instant, 24/7
            </li>
            <li className="flex items-start gap-3 text-slate-200">
              <span className="text-sky-400 mt-1">•</span>
              Mai mult timp pentru task-urile importante
            </li>
          </ul>

          <div className="space-y-4">
            <button className="inline-flex items-center gap-2 rounded-full border border-black bg-white text-black px-5 py-3 font-semibold transition hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/30">
              Începe să economisești acum
            </button>
            <div>
              <a href="#" className="text-slate-300 hover:text-white hover:underline transition text-sm">
                Află cum funcționează
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Calculator Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 sm:p-8 space-y-6"
        >
          {/* Range Input */}
          <div className="space-y-4">
            <label htmlFor="chatVolume" className="block text-sm font-medium text-slate-200">
              Volum mesaje lunar
            </label>
            <div className="space-y-2">
              <input
                id="chatVolume"
                type="range"
                min="100"
                max="10000"
                step="50"
                value={monthlyChats}
                onChange={(e) => setMonthlyChats(Number(e.target.value))}
                className="w-full h-2 rounded bg-slate-800/80 appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-sky-500/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-sky-400/30 [&::-webkit-slider-thumb]:hover:scale-105 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-sky-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:outline-none [&::-moz-range-thumb]:ring-2 [&::-moz-range-thumb]:ring-sky-400/30 [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded [&::-moz-range-track]:bg-slate-800/80"
                aria-valuetext={`${monthlyChats} mesaje pe lună`}
              />
              <div className="text-center">
                <span className="text-slate-400 text-sm tabular-nums">
                  {monthlyChats.toLocaleString()} mesaje/lună
                </span>
              </div>
            </div>
          </div>

          {/* KPI Tiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div
              key={hoursSaved}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-white/10 bg-white/5 p-5 text-center"
            >
              <div className="text-3xl font-semibold text-white tabular-nums mb-1">
                {hoursSaved}
              </div>
              <div className="text-xs text-slate-400">
                Ore salvate lunar
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl border border-white/10 bg-white/5 p-5 text-center"
            >
              <div className="text-3xl font-semibold text-white tabular-nums mb-1">
                {Math.round(automationRate * 100)}%
              </div>
              <div className="text-xs text-slate-400">
                Răspunsuri automatizate
              </div>
            </motion.div>

            <motion.div
              key={costSavings}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl border border-white/10 bg-white/5 p-5 text-center"
            >
              <div className="text-3xl font-semibold text-white tabular-nums mb-1">
                {new Intl.NumberFormat('ro-MD', { 
                  style: 'currency', 
                  currency: 'MDL',
                  maximumFractionDigits: 0 
                }).format(costSavings)}
              </div>
              <div className="text-xs text-slate-400">
                Economii lunare
              </div>
            </motion.div>
          </div>

          {/* Helper Caption */}
          <p className="text-xs text-slate-400 text-center">
            Pe baza t = 3 min/mesaj, automatizare 80%, cost orar 150 MDL.
          </p>

          {/* Secondary CTA */}
          <div className="text-center">
            <button className="inline-flex items-center gap-2 rounded-full border border-black bg-white text-black px-5 py-3 font-semibold transition hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/30">
              Calculează o ofertă
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
