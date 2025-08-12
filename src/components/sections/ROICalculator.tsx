'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
// import { SVGAnimationWrapper } from '@/hooks/useExistingSVGAnimation';
// import { SimpleSVGAnimationWrapper } from '@/hooks/useSimpleSVGAnimation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ROICalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // Input states with defaults
  const [monthlyChats, setMonthlyChats] = useState(1600);
  const [automationRate, setAutomationRate] = useState(0.80);
  const [avgMinutesPerChat, setAvgMinutesPerChat] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(150);
  const [aiMonthlyCost, setAiMonthlyCost] = useState(2000);
  const [currency, setCurrency] = useState<'MDL' | 'EUR' | 'USD'>('MDL');
  
  // UI states
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  // Tutorial state removed

  // Calculations (memoized for performance)
  const calculations = useMemo(() => {
    const hoursSaved = (monthlyChats * avgMinutesPerChat * automationRate) / 60;
    const humanCostAvoided = hoursSaved * hourlyRate;
    const netSavings = humanCostAvoided - aiMonthlyCost;
    const roiRatio = (aiMonthlyCost > 0) ? netSavings / aiMonthlyCost : 0;
    const roiPercent = Math.max(Math.round(roiRatio * 100), -1000);
    const annualSavings = humanCostAvoided * 12;
    const annualNetSavings = netSavings * 12;
    const dailySavings = humanCostAvoided / 30;
    const paybackDays = (dailySavings > 0) ? Math.round(aiMonthlyCost / dailySavings) : Infinity;

    return {
      hoursSaved: Math.round(hoursSaved),
      humanCostAvoided,
      netSavings,
      roiPercent,
      annualSavings,
      annualNetSavings,
      paybackDays
    };
  }, [monthlyChats, automationRate, avgMinutesPerChat, hourlyRate, aiMonthlyCost]);

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ro-MD', { 
      style: 'currency', 
      currency,
      maximumFractionDigits: 0 
    }).format(amount);
  };

  // Preset handlers with descriptive names
  const presets = [
    { label: "Mic business · 500 mesaje / 70%", chats: 500, automation: 0.70 },
    { label: "Creștere · 3.000 / 85%", chats: 3000, automation: 0.85 },
    { label: "Enterprise · 8.000 / 90%", chats: 8000, automation: 0.90 }
  ];

  const applyPreset = (chats: number, automation: number) => {
    setMonthlyChats(chats);
    setAutomationRate(automation);
  };

  // Input validation helpers
  const clampNumber = (value: number, min: number, max: number = Infinity) => {
    if (isNaN(value)) return min;
    return Math.max(min, Math.min(max, value));
  };

  // Error state check
  const hasError = automationRate === 0 || hourlyRate === 0;

  // Tour management
  // Tutorial effect and completeTour removed

  // Ref pentru SVG path
  const svgLineRef = useRef<SVGPathElement | null>(null);
  const [svgLineDisplay, setSvgLineDisplay] = useState<'block' | 'none'>('block');

  // Listen for console.log messages from the section above to hide/show the SVG line
  useEffect(() => {
    const originalConsoleLog = window.console.log;
    function customConsoleLog(...args: any[]) {
      if (typeof args[0] === 'string' && args[0].includes('howitworks-svg-line-hidden')) {
        setSvgLineDisplay('none');
      } else if (typeof args[0] === 'string' && args[0].includes('howitworks-svg-line-visible')) {
        setSvgLineDisplay('block');
      }
      originalConsoleLog.apply(window.console, args);
    }
    window.console.log = customConsoleLog;
    return () => {
      window.console.log = originalConsoleLog;
    };
  }, []);

  useEffect(() => {
    if (!svgLineRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const path = svgLineRef.current;
    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });
    const triggerTarget = ref.current;
    if (!triggerTarget) return;
    const st = ScrollTrigger.create({
      trigger: triggerTarget,
      start: 'top 75%', // linia incepe cand sectiunea a intrat 20% in viewport
      end: 'bottom 55%', // linia se completeaza la 45% din viewport
      scrub: true,
      onUpdate: self => {
        const progress = self.progress; // 0..1
        gsap.set(path, {
          strokeDashoffset: pathLength * (1 - progress)
        });
      },
      invalidateOnRefresh: true,
    });
    return () => {
      st.kill();
    };
  }, []);

  return (
    <section ref={ref} className="px-6 sm:px-8 lg:px-12 py-20 sm:py-24 bg-black relative">
      {/* Vertical dashed line on the right, matching the section above, straight down as SVG */}
      <svg
        className="hidden md:block absolute z-20 pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: svgLineDisplay,
        }}
        width="100%"
        height="100%"
        viewBox="0 0 1000 1200"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          ref={svgLineRef}
          d="M120 0 V1200"
          transform="translate(820,0)"
          stroke="#b3b3b3"
          strokeWidth="3"
          opacity="0.6"
        />
      </svg>
      {/* Dotted pattern background */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px]"></div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Text Content & Inputs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="relative">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Află cât timp și bani poți economisi cu AI
              </h2>
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 text-sm flex items-center justify-center hover:bg-slate-600 transition-colors"
              >
                i
              </button>
            </div>
            <div className="w-16 h-0.5 rounded bg-gradient-to-r from-indigo-400 to-sky-400 mt-3"></div>
            
            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute top-full left-0 mt-2 p-3 bg-slate-800 border border-white/10 rounded-lg text-sm text-slate-200 max-w-md z-10">
                Ore = mesaje × minute × % / 60. Economii = ore × cost orar. ROI = (economii − cost AI) / cost AI.
              </div>
            )}
          </div>

          <p className="text-lg text-slate-300 max-w-md">
            Calculează instant beneficiile integrării agentului nostru virtual. Vezi economiile în timp real.
          </p>

          {/* Basic/Advanced Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdvanced(false)}
              className={`px-3 py-1.5 text-sm rounded-full transition ${
                !isAdvanced 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              Basic
            </button>
            <button
              onClick={() => setIsAdvanced(true)}
              className={`px-3 py-1.5 text-sm rounded-full transition ${
                isAdvanced 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              Advanced
            </button>
          </div>

          {/* Tutorial overlay removed */}

          {/* Error State */}
          {hasError && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-amber-400 text-sm">
                Economiile sunt 0. Crește % sau cost orar pentru estimare realistă.
              </p>
            </div>
          )}

          {/* Inputs Grid */}
          <div className="space-y-6">
            {/* Monthly Chats Slider */}
            <div className="space-y-2">
              <label htmlFor="monthlyChats" className="block text-sm font-medium text-slate-200">
                Mesaje/lună (100–20.000)
              </label>
              <input
                id="monthlyChats"
                type="range"
                min="100"
                max="20000"
                step="50"
                value={monthlyChats}
                onChange={(e) => setMonthlyChats(clampNumber(Number(e.target.value), 100, 20000))}
                className="w-full h-2 rounded bg-slate-800/80 appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-sky-500/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-sky-400/30 [&::-webkit-slider-thumb]:hover:scale-105 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-sky-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:outline-none [&::-moz-range-thumb]:ring-2 [&::-moz-range-thumb]:ring-sky-400/30 [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded [&::-moz-range-track]:bg-slate-800/80"
                aria-label="Numărul de mesaje pe lună"
                aria-valuetext={`${monthlyChats} mesaje pe lună`}
                title="Numărul mediu de conversații cu clienții pe lună"
              />
              <div className="text-center">
                <span className="text-slate-400 text-sm tabular-nums">
                  {monthlyChats.toLocaleString()} mesaje/lună
                </span>
              </div>
            </div>

            {/* Automation Rate Slider */}
            <div className="space-y-2">
              <label htmlFor="automationRate" className="block text-sm font-medium text-slate-200">
                Rată automatizare (%)
              </label>
              <input
                id="automationRate"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={automationRate}
                onChange={(e) => setAutomationRate(clampNumber(Number(e.target.value), 0, 1))}
                className="w-full h-2 rounded bg-slate-800/80 appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-sky-500/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-sky-400/30 [&::-webkit-slider-thumb]:hover:scale-105 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-sky-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:outline-none [&::-moz-range-thumb]:ring-2 [&::-moz-range-thumb]:ring-sky-400/30 [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded [&::-moz-range-track]:bg-slate-800/80"
                aria-label="Procentul de mesaje automatizate"
                aria-valuetext={`${Math.round(automationRate * 100)}% automatizare`}
                title="Câte procente din conversații pot fi automatizate"
              />
              <div className="text-center">
                <span className="text-slate-400 text-sm tabular-nums">
                  {Math.round(automationRate * 100)}%
                </span>
              </div>
            </div>

            {/* Hourly Rate Input */}
            <div className="space-y-2">
              <label htmlFor="hourlyRate" className="block text-sm font-medium text-slate-200">
                Cost orar ({currency}/oră)
              </label>
              <input
                id="hourlyRate"
                type="number"
                min="0"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(clampNumber(Number(e.target.value), 0))}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-white/10 text-white focus:outline-none focus:ring-4 focus:ring-sky-500/30 focus:border-sky-400"
                title="Costul pe oră pentru un angajat care răspunde la mesaje"
              />
            </div>

            {/* Microcopy */}
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <p className="text-xs text-slate-400">
                Folosim {avgMinutesPerChat} min/mesaj (poți schimba la Advanced)
              </p>
            </div>

            {/* Advanced Inputs */}
            {isAdvanced && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="avgMinutes" className="block text-sm font-medium text-slate-200 mb-2">
                      Minute/mesaj
                    </label>
                    <input
                      id="avgMinutes"
                      type="number"
                      min="1"
                      step="0.5"
                      value={avgMinutesPerChat}
                      onChange={(e) => setAvgMinutesPerChat(clampNumber(Number(e.target.value), 1, 60))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-white/10 text-white focus:outline-none focus:ring-4 focus:ring-sky-500/30 focus:border-sky-400"
                      title="Timpul mediu pentru a răspunde la un mesaj"
                    />
                  </div>
                  <div>
                    <label htmlFor="aiCost" className="block text-sm font-medium text-slate-200 mb-2">
                      Cost AI lunar
                    </label>
                    <input
                      id="aiCost"
                      type="number"
                      min="0"
                      value={aiMonthlyCost}
                      onChange={(e) => setAiMonthlyCost(clampNumber(Number(e.target.value), 0))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-white/10 text-white focus:outline-none focus:ring-4 focus:ring-sky-500/30 focus:border-sky-400"
                      title="Costul lunar pentru abonamentul AI"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-slate-200 mb-2">
                    Monedă
                  </label>
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as 'MDL' | 'EUR' | 'USD')}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-white/10 text-white focus:outline-none focus:ring-4 focus:ring-sky-500/30 focus:border-sky-400"
                  >
                    <option value="MDL">MDL</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            )}

            {/* Preset Buttons */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-200">Presetări rapide:</p>
              <div className="flex flex-col gap-2">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset.chats, preset.automation)}
                    className="px-4 py-2 text-sm text-left rounded-lg bg-slate-800/80 border border-white/10 text-slate-300 hover:bg-slate-700/80 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Main Result Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 sm:p-8 space-y-6"
        >
          {/* Main Result */}
          <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
            <motion.div
              key={calculations.humanCostAvoided}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl sm:text-5xl font-bold text-white tabular-nums mb-2">
                Economisești ≈ {formatCurrency(calculations.humanCostAvoided)}/lună
              </div>
              <div className="text-lg text-slate-300 tabular-nums">
                ≈ {calculations.hoursSaved} ore / ROI {calculations.roiPercent}% / 
                Payback ~ {calculations.paybackDays === Infinity ? 'N/A' : `${calculations.paybackDays} zile`}
              </div>
            </motion.div>
          </div>

          {/* Simplified Comparison Chart */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-slate-200 text-center">Comparație costuri lunare</h4>
            <div className="relative">
              {/* Stacked Bar */}
              <div className="w-full bg-slate-800/80 rounded-full h-8 overflow-hidden flex">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center text-white text-sm font-medium"
                  style={{ 
                    width: calculations.humanCostAvoided > aiMonthlyCost 
                      ? `${(calculations.humanCostAvoided / (calculations.humanCostAvoided + aiMonthlyCost)) * 100}%`
                      : '50%'
                  }}
                >
                  {calculations.humanCostAvoided > 1000 ? 'Cost uman evitat' : ''}
                </div>
                <div 
                  className="bg-gradient-to-r from-blue-500 to-sky-400 flex items-center justify-center text-white text-sm font-medium"
                  style={{ 
                    width: calculations.humanCostAvoided > aiMonthlyCost 
                      ? `${(aiMonthlyCost / (calculations.humanCostAvoided + aiMonthlyCost)) * 100}%`
                      : '50%'
                  }}
                >
                  {aiMonthlyCost > 1000 ? 'Cost AI' : ''}
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex justify-between items-center mt-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-green-500 to-emerald-400"></div>
                  <span className="text-slate-300">Cost uman evitat</span>
                  <span className="text-white font-medium tabular-nums">{formatCurrency(calculations.humanCostAvoided)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-sky-400"></div>
                  <span className="text-slate-300">Cost AI</span>
                  <span className="text-white font-medium tabular-nums">{formatCurrency(aiMonthlyCost)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-slate-400 text-center">
            Pe baza t = {avgMinutesPerChat} min/mesaj, automatizare {Math.round(automationRate * 100)}%, cost orar {hourlyRate} {currency}.
          </p>

          {/* CTA Buttons */}
          <div className="space-y-3 text-center">
            <button className="inline-flex items-center gap-2 rounded-full border border-black bg-white text-black px-6 py-3 font-semibold transition hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/30">
              Calculează o ofertă exactă
            </button>
            <div>
              <a href="#" className="text-slate-300 hover:text-white hover:underline transition text-sm">
                Vezi cum funcționează
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
