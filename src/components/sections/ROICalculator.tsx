'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ==========================================
//  otonom-style ROI calculator (visual replica)
//  Drop-in replacement: keeps the same export
//  name (ROICalculator) and no external deps.
// ==========================================

// Helpers
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const fmtMoney = (n: number, currency: 'USD'|'EUR'|'MDL'='USD') => new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(Math.round(n || 0));
const fmtInt = (n: number) => n.toLocaleString('en-US');

export default function ROICalculator() {
  const ref = useRef<HTMLElement | null>(null);
  const svgLineRef = useRef<SVGPathElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Ref pentru SVG path
  const [svgLineDisplay, setSvgLineDisplay] = useState<'block' | 'none'>('block');

  useEffect(() => {
    const originalConsoleLog = window.console.log;
    function customConsoleLog(...args: any[]) {
      if (typeof args[0] === 'string' && args[0].includes('howitworks-svg-line-hidden')) {
        setSvgLineDisplay('none');
      } else if (typeof args[0] === 'string' && args[0].includes('howitworks-svg-line-visible')) {
        setSvgLineDisplay('block');
      }
      // @ts-ignore
      originalConsoleLog.apply(window.console, args);
    }
    window.console.log = customConsoleLog as any;
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
      start: 'top 75%',
      end: 'bottom 55%',
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

  // === Inputs (left pane) ===
  const [conversations, setConversations] = useState(20000); // per month
  const [employees, setEmployees] = useState(75);
  const [annualCostPerEmp, setAnnualCostPerEmp] = useState(48000);
  const [resolutionRate, setResolutionRate] = useState(0.75); // 0..1
  const [currency, setCurrency] = useState<'USD'|'EUR'|'MDL'>('USD');

  // Invisible assumptions to reproduce table:
  // average handle time (minutes), work hours per FTE per year
  const AHT_MIN = 6; // minutes per conversation
  const HOURS_PER_FTE = 1600; // working hours / year
  const PRICE_PER_RESOLVED = 0.30; // platform cost per resolved conversation (heuristic)

  const calc = useMemo(() => {
    const beforeEmpCost = employees * annualCostPerEmp; // /year

    // scale of resolved convos per year
    const resolvedPerYear = conversations * 12 * resolutionRate;

    // agents freed (hours saved / hours per FTE)
    const hoursSaved = (resolvedPerYear * AHT_MIN) / 60; // /year
    const agentsFreed = hoursSaved / HOURS_PER_FTE; // FTEs

    // Ramp adoption over years (like screenshot table shows growing use)
    const ramp = [0.6, 0.8, 1.0];

    // Employee cost after otonom (we model as proportional reduction by adoption)
    const afterCosts = ramp.map(r => beforeEmpCost * (1 - resolutionRate * r * 0.35));

    // otonom platform cost grows with adoption + volume
    const otonomCosts = ramp.map(r => resolvedPerYear * PRICE_PER_RESOLVED * r);

    // Agents freed per year (rounded, scaled by ramp)
    const freed = ramp.map(r => Math.round(agentsFreed * r));

    const savings = afterCosts.map(c => beforeEmpCost - c - 0); // gross savings vs before (excl. otonom cost)
    const netSavings = savings.map((s, i) => s - otonomCosts[i]);

    const totals = {
      beforeEmpCost,
      afterEmpCost: afterCosts.reduce((a, b) => a + b, 0),
      otonomCost: otonomCosts.reduce((a, b) => a + b, 0),
      freed: freed.reduce((a, b) => a + b, 0),
      netSavings: netSavings.reduce((a, b) => a + b, 0),
    };

    // ROI over 3 years = total net savings / total otonom cost
    const roiPct = totals.otonomCost > 0 ? Math.round((totals.netSavings / totals.otonomCost) * 100) : 0;

    return {
      beforeEmpCost,
      year: [
        { year: 1, afterEmpCost: afterCosts[0], otonomCost: otonomCosts[0], freed: freed[0], net: netSavings[0] },
        { year: 2, afterEmpCost: afterCosts[1], otonomCost: otonomCosts[1], freed: freed[1], net: netSavings[1] },
        { year: 3, afterEmpCost: afterCosts[2], otonomCost: otonomCosts[2], freed: freed[2], net: netSavings[2] },
      ],
      totals,
      roiPct,
    };
  }, [conversations, employees, annualCostPerEmp, resolutionRate]);

  // ===== UI
  return (
    <section ref={ref as any} className="relative bg-black text-white py-14 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* SVG linie animată verticală pe dreapta */}
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

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">Otonom  calculator</h1>
          <p className="mt-3 max-w-3xl text-[17px] leading-7 text-[#ffffff]">
            Otonom AI Agent works round the clock to instantly resolve your customers issues, so your agents can focus their humanity on
            specialized, strategic, creative, and interesting work.
          </p>
        </motion.div>

        {/* Card grid */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.05, duration: 0.5 }}
          className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
          {/* LEFT PANEL */}
          <div className="rounded-2xl bg-white/90 backdrop-blur-sm shadow-sm border border-black/10 p-4 sm:p-5 lg:p-6">
            <Field label="Conversations per month">
              <InputWithSuffix value={conversations} onChange={(v)=>setConversations(clamp(v, 100, 200000))} suffix="/mo" thousand />
            </Field>

            <Field label="No. of customer support employees">
              <Input value={employees} onChange={(v)=>setEmployees(clamp(v, 1, 5000))} />
            </Field>

            <Field label="Annual cost per employee">
              <InputWithPrefix value={annualCostPerEmp} onChange={(v)=>setAnnualCostPerEmp(clamp(v, 10000, 300000))} prefix={currency==='USD'?'$':currency==='EUR'?'€':'L'} suffix="/yr" thousand />
            </Field>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-medium">Resolution rate</label>
                <span className="text-xs text-[#6b7280]">Avg.</span>
              </div>
              <div className="mt-2">
                <input type="range" min={0.01} max={1} step={0.01} value={resolutionRate}
                       onChange={(e)=>setResolutionRate(parseFloat(e.target.value))}
                       className="w-full h-2 rounded-full bg-[#e5e7eb] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black"/>
                <div className="mt-2 text-sm text-[#374151]">{Math.round(resolutionRate*100)}%</div>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-[13px] font-medium">Currency</label>
              <select value={currency} onChange={(e)=>setCurrency(e.target.value as any)}
                      className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-black/10">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="MDL">MDL</option>
              </select>
            </div>
          </div>

          {/* TOP-CENTER: Savings over 3 years */}
          <div className="lg:col-span-2 rounded-2xl bg-white/90 backdrop-blur-sm shadow-sm border border-black/10 p-4 sm:p-5 lg:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-black/10 p-5">
                <div className="text-sm font-medium text-[#3f3f46]">Otonom AI Agent will save</div>
                <div className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight text-black">{fmtMoney(calc.totals.netSavings, currency)}</div>
                <div className="text-sm text-[#6b7280] mt-1">over 3 years</div>
              </div>
              <div className="rounded-xl border border-black/10 p-5">
                <div className="text-sm font-medium text-[#3f3f46]">Return on investment</div>
                <div className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight text-black">{fmtInt(calc.roiPct)}%</div>
              </div>
            </div>

            {/* Table */}
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-[15px] text-[#1f2937]">
                <thead>
                  <tr className="text-left">
                    <th className="py-3 px-3 font-medium text-[#6b7280]"></th>
                    <th className="py-3 px-3 font-medium text-[#6b7280]">Before otonom</th>
                    <th className="py-3 px-3 font-medium text-[#6b7280]">Year 1</th>
                    <th className="py-3 px-3 font-medium text-[#6b7280]">Year 2</th>
                    <th className="py-3 px-3 font-medium text-[#6b7280]">Year 3</th>
                    <th className="py-3 px-3 font-semibold text-[#111827]">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {/* Employee cost */}
                  <tr>
                    <td className="py-3 px-3 text-[#374151]">Employee cost</td>
                    <td className="py-3 px-3">{fmtMoney(calc.beforeEmpCost, currency)}</td>
                    <td className="py-3 px-3">{fmtMoney(calc.year[0].afterEmpCost, currency)}</td>
                    <td className="py-3 px-3">{fmtMoney(calc.year[1].afterEmpCost, currency)}</td>
                    <td className="py-3 px-3">{fmtMoney(calc.year[2].afterEmpCost, currency)}</td>
                    <td className="py-3 px-3 font-semibold">{fmtMoney(calc.beforeEmpCost + calc.year[0].afterEmpCost + calc.year[1].afterEmpCost + calc.year[2].afterEmpCost, currency)}</td>
                  </tr>

                  {/* otonom cost */}
                  <tr>
                    <td className="py-3 px-3 text-[#374151]">otonom cost</td>
                    <td className="py-3 px-3">-</td>
                    <td className="py-3 px-3">{fmtMoney(calc.year[0].otonomCost, currency)}</td>
                    <td className="py-3 px-3">{fmtMoney(calc.year[1].otonomCost, currency)}</td>
                    <td className="py-3 px-3">{fmtMoney(calc.year[2].otonomCost, currency)}</td>
                    <td className="py-3 px-3 font-semibold">{fmtMoney(calc.totals.otonomCost, currency)}</td>
                  </tr>

                  {/* Agents freed */}
                  <tr>
                    <td className="py-3 px-3 text-[#374151]">Agents freed</td>
                    <td className="py-3 px-3">-</td>
                    <td className="py-3 px-3">{fmtInt(calc.year[0].freed)}</td>
                    <td className="py-3 px-3">{fmtInt(calc.year[1].freed)}</td>
                    <td className="py-3 px-3">{fmtInt(calc.year[2].freed)}</td>
                    <td className="py-3 px-3 font-semibold">{fmtInt(calc.totals.freed)}</td>
                  </tr>

                  {/* Your savings */}
                  <tr>
                    <td className="py-3 px-3 text-[#374151]">Your savings</td>
                    <td className="py-3 px-3">-</td>
                    <td className="py-3 px-3 text-[#15803d] font-semibold">{fmtMoney(calc.year[0].net, currency)}</td>
                    <td className="py-3 px-3 text-[#15803d] font-semibold">{fmtMoney(calc.year[1].net, currency)}</td>
                    <td className="py-3 px-3 text-[#15803d] font-semibold">{fmtMoney(calc.year[2].net, currency)}</td>
                    <td className="py-3 px-3 font-semibold text-[#15803d]">{fmtMoney(calc.totals.netSavings, currency)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ====== Small form controls (clean, otonom-like) ======
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-[13px] font-medium text-[#3f3f46] mb-2">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange }: { value: number; onChange: (n:number)=>void }) {
  return (
    <input value={value} onChange={(e)=>onChange(clamp(parseInt(e.target.value||'0',10) || 0, 0, 1_000_000))}
      type="number" className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-black/10"/>
  );
}

function InputWithPrefix({ value, onChange, prefix, suffix, thousand }: { value: number; onChange: (n:number)=>void; prefix?: string; suffix?: string; thousand?: boolean; }) {
  const [raw, setRaw] = useState(thousand ? value.toLocaleString('en-US') : String(value));
  useEffect(()=>{ setRaw(thousand ? value.toLocaleString('en-US') : String(value)); }, [value, thousand]);
  return (
    <div className="flex items-stretch">
      {prefix && <span className="inline-flex items-center px-3 rounded-l-xl border border-black/10 bg-[#f5f5f4] text-[15px]">{prefix}</span>}
      <input value={raw} onChange={(e)=>setRaw(e.target.value)} onBlur={()=>{
        let n = Number(String(raw).replace(/[^0-9.]/g,''));
        if (Number.isNaN(n)) n = 0;
        onChange(n);
      }}
        className={`flex-1 px-3 py-2 border border-black/10 bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-black/10 ${prefix? 'rounded-r-xl' : 'rounded-xl'}`}/>
      {suffix && <span className="inline-flex items-center px-3 rounded-r-xl border border-black/10 bg-[#f5f5f4] text-[15px]">{suffix}</span>}
    </div>
  );
}

function InputWithSuffix({ value, onChange, suffix, thousand }: { value: number; onChange: (n:number)=>void; suffix?: string; thousand?: boolean; }) {
  const [raw, setRaw] = useState(thousand ? value.toLocaleString('en-US') : String(value));
  useEffect(()=>{ setRaw(thousand ? value.toLocaleString('en-US') : String(value)); }, [value, thousand]);
  return (
    <div className="flex items-stretch">
      <input value={raw} onChange={(e)=>setRaw(e.target.value)} onBlur={()=>{
        let n = Number(String(raw).replace(/[^0-9.]/g,''));
        if (Number.isNaN(n)) n = 0;
        onChange(n);
      }}
        className="flex-1 px-3 py-2 rounded-l-xl border border-black/10 bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-black/10"/>
      {suffix && <span className="inline-flex items-center px-3 rounded-r-xl border border-black/10 bg-[#f5f5f4] text-[15px]">{suffix}</span>}
    </div>
  );
}
