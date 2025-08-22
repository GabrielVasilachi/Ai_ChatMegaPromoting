'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import enLocales from '../../locales/en.json';
import roLocales from '../../locales/ro.json';
import ruLocales from '../../locales/ru.json';

// ======================================================
//  Bravin — ROI Calculator (simplu, doar 3 input-uri)
//  CONDIȚIE RESPECTATĂ: linia SVG și animațiile ei sunt
//  păstrate identic (nu modifica path-ul și logicile GSAP).
//  Toate sumele sunt în USD pentru simplitate.
// ======================================================

// ---- Helpers
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const fmtMoney = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(n || 0));
const fmtInt = (n: number) => n.toLocaleString('en-US');

// ---- 
// Prețuri hardcodate (poți modifica ușor aici)
// - presupunere simplă: 1 mesaj ≈ 2 tokeni (50% input, 50% output)
// - tarife LLM (USD / 1000 tokeni)
const PRICING = {
  INPUT_PER_K: 0.40,
  OUTPUT_PER_K: 1.20,
  TOKENS_PER_MESSAGE: 2,
  // planul Bravin ales după volum mesaje/lună
  PLANS: [
    { name: 'Starter',    limit: 2000,  monthly: 49 },
    { name: 'Profesional',limit: 10000, monthly: 105 },
    { name: 'Business',   limit: 30000, monthly: 299 },
    { name: 'Enterprise', limit: Infinity, monthly: 499 },
  ]
} as const;

function pickPlan(msgPerMonth: number) {
  return PRICING.PLANS.find(p => msgPerMonth <= p.limit) || PRICING.PLANS[PRICING.PLANS.length-1];
}

function perMessageLLMCostUSD() {
  const avgPerK = (PRICING.INPUT_PER_K + PRICING.OUTPUT_PER_K) / 2; // împărțim 50/50 input/output
  return (avgPerK * PRICING.TOKENS_PER_MESSAGE) / 1000; // $ / mesaj
}

export default function ROICalculator() {
  const ref = useRef<HTMLElement | null>(null);
  const svgLineRef = useRef<SVGPathElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // --- linia SVG: vizibilitate după lățime (NU MODIFICA)
  const [svgLineDisplay, setSvgLineDisplay] = useState<'block' | 'none'>('block');
  useEffect(() => {
    const checkScreenWidth = () => {
      const shouldHide = window.innerWidth <= 1690;
      setSvgLineDisplay(shouldHide ? 'none' : 'block');
    };
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  // --- linia SVG: animație GSAP la scroll (NU MODIFICA)
  useEffect(() => {
    if (!svgLineRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const path = svgLineRef.current;
    const pathLength = path.getTotalLength();
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
    const triggerTarget = ref.current;
    if (!triggerTarget) return;
    const st = ScrollTrigger.create({
      trigger: triggerTarget,
      start: 'top 75%',
      end: 'bottom 65%',
      scrub: true,
      onUpdate: self => {
        const progress = self.progress; // 0..1
        gsap.set(path, { strokeDashoffset: pathLength * (1 - progress) });
      },
      invalidateOnRefresh: true,
    });
    return () => { st.kill(); };
  }, []);

  // ---- INPUTURI (doar 3)
  // 1) Câți oameni răspund acum la mesaje (1..200)
  const [agents, setAgents] = useState(3);
  // string-backed input so user can clear field while editing; numeric `agents` is used for calculations
  const [agentsInput, setAgentsInput] = useState(String(agents));
  // 2) Cât plătești UN agent pe lună (USD)
  const [salaryPerAgentMonth, setSalaryPerAgentMonth] = useState(600);
  // string-backed input so user can clear field while editing; numeric `salaryPerAgentMonth` is used for calculations
  const [salaryInput, setSalaryInput] = useState(String(salaryPerAgentMonth));
  // 3) Câte mesaje primești pe lună (100..100.000)
  const [messagesPerMonth, setMessagesPerMonth] = useState(5000);
  // string-backed input so user can clear field while editing; numeric `messagesPerMonth` is used for calculations
  const [messagesInput, setMessagesInput] = useState(String(messagesPerMonth));

  // --- simple locale detection + helper
  const LOCALES: Record<string, any> = { en: enLocales, ro: roLocales, ru: ruLocales };
  const [lang, setLang] = useState<'en'|'ro'|'ru'>('en');
  const [translations, setTranslations] = useState<any>(LOCALES.en);

  useEffect(() => {
    try {
      const parts = window.location.pathname.split('/').filter(Boolean);
      let l = (parts[0] || '').toLowerCase();
      if (!['en','ro','ru'].includes(l)) {
        const nav = (navigator.language || 'en').split('-')[0];
        l = ['en','ro','ru'].includes(nav) ? nav : 'en';
      }
      setLang(l as any);
      setTranslations(LOCALES[l] || LOCALES.en);
    } catch (e) {
      setLang('en');
      setTranslations(LOCALES.en);
    }
  }, []);

  const t = (path: string, fallback = '') => {
    const parts = path.split('.');
    let cur: any = translations;
    for (const p of parts) {
      if (cur == null) return fallback;
      cur = cur[p];
    }
    return (cur == null) ? fallback : cur;
  };

  // translate plan name using locale keys (falls back to original plan name)
  const translatePlanName = (planName: string) => {
    const map: Record<string,string> = {
      starter: 'starter',
      profesional: 'professional',
      professional: 'professional',
      business: 'business',
      enterprise: 'enterprise',
    };
    const key = map[planName.toLowerCase()] || planName.toLowerCase();
    return t(`ROICalculator.plans.${key}`, planName);
  };

  const calc = useMemo(() => {
    // --- baseline doar oameni
    const humanMonthly = agents * salaryPerAgentMonth;
    const humanYear1 = humanMonthly * 12;
    const human2Years = humanMonthly * 24;

    // --- costuri AI
    const plan = pickPlan(messagesPerMonth);
    const llmCostPerMsg = perMessageLLMCostUSD();
    const llmMonthly = messagesPerMonth * llmCostPerMsg; // $ / lună
    const aiMonthly = plan.monthly + llmMonthly;
    const aiYear1 = aiMonthly * 12;
    const ai2Years = aiMonthly * 24;

    // --- economii
    const saveYear1 = Math.max(0, humanYear1 - aiYear1);
    const save2Years = Math.max(0, human2Years - ai2Years);

  // --- 3 ani
  const humanYear3 = humanMonthly * 36;
  const ai3Years = aiMonthly * 36;
  const save3Years = Math.max(0, humanYear3 - ai3Years);

  // ROI simplu pe 2 ani și 3 ani
  const invest2y = ai2Years;
  const roiPct = invest2y > 0 ? Math.round((save2Years / invest2y) * 100) : 0;
  const invest3y = ai3Years;
  const roiPct3 = invest3y > 0 ? Math.round((save3Years / invest3y) * 100) : 0;

    return {
      humanMonthly, humanYear1, human2Years, humanYear3,
      plan, llmCostPerMsg, llmMonthly, aiMonthly, aiYear1, ai2Years, ai3Years,
      saveYear1, save2Years, save3Years, roiPct, roiPct3,
    };
  }, [agents, salaryPerAgentMonth, messagesPerMonth]);

  return (
    <section ref={ref as any} className="relative bg-black text-white py-14 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* —— LINIA SVG (păstrată identic) —— */}
      <svg
        className="hidden md:block absolute z-20 pointer-events-none"
        style={{ top: 0, left: 0, width: '100%', height: '100%', display: svgLineDisplay }}
        width="100%" height="100%" viewBox="0 0 1000 1200" fill="none" preserveAspectRatio="none"
      >
        <path ref={svgLineRef} d="M120 0 V1200" transform="translate(820,0)" stroke="#b3b3b3" strokeWidth="3" opacity="0.6" />
      </svg>

      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{t('ROICalculator.title')}</h1>
          <p className="mt-2 text-gray-300 text-[15px]">{t('ROICalculator.subtitle')}</p>
        </motion.div>

        {/* 3 input cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white/95 text-black p-4 border border-white/20">
            <label className="text-xs font-medium text-gray-600">{t('ROICalculator.inputs.agents.label')}</label>
            <input
              type="number" min={1} max={200} step={1}
              value={agentsInput}
              onChange={(e)=>{
                const v = e.target.value;
                setAgentsInput(v);
                // if user typed a valid number, update numeric state immediately so calculations refresh
                const parsed = parseInt(v, 10);
                if (v.trim() !== '' && !isNaN(parsed)) {
                  setAgents(clamp(parsed, 1, 200));
                }
              }}
              onBlur={() => {
                // when leaving the field, if empty set to 1; otherwise parse & clamp
                const v = agentsInput.trim();
                if (v === '') {
                  setAgents(1);
                  setAgentsInput('1');
                } else {
                  const n = clamp(parseInt(v || '0', 10) || 0, 1, 200);
                  setAgents(n);
                  setAgentsInput(String(n));
                }
              }}
              className="mt-2 w-full align rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-black/10"
            />
            <p className="mt-2 text-[13px] text-gray-600">{t('ROICalculator.inputs.agents.helper')}</p>
          </div>

          <div className="rounded-2xl bg-white/95 text-black p-4 border border-white/20">
            <label className="text-xs font-medium text-gray-600">{t('ROICalculator.inputs.salary.label')}</label>
            <input
              type="number" min={0} value={salaryInput}
              onChange={(e)=>{
                const v = e.target.value;
                setSalaryInput(v);
                const parsed = parseInt(v, 10);
                if (v.trim() !== '' && !isNaN(parsed)) {
                  setSalaryPerAgentMonth(clamp(parsed, 0, 100000));
                }
              }}
              onBlur={() => {
                const v = salaryInput.trim();
                if (v === '') {
                  setSalaryPerAgentMonth(600);
                  setSalaryInput('600');
                } else {
                  const n = clamp(parseInt(v || '0', 10) || 0, 0, 100000);
                  setSalaryPerAgentMonth(n);
                  setSalaryInput(String(n));
                }
              }}
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-black/10"
            />
            <p className="mt-2 text-[13px] text-gray-600">{(() => {
              const raw = t('ROICalculator.inputs.salary.helper');
              return raw.includes('{agents}') ? raw.replace('{agents}', String(agents)) : `${raw} (${agents})`;
            })()}</p>
          </div>

          <div className="rounded-2xl bg-white/95 text-black p-4 border border-white/20">
            <label className="text-xs font-medium text-gray-600">{t('ROICalculator.inputs.messages.label')}</label>
            <input
              type="number" min={100} max={100000}
              value={messagesInput}
              onChange={(e)=>{
                const v = e.target.value;
                setMessagesInput(v);
                const parsed = parseInt(v, 10);
                if (v.trim() !== '' && !isNaN(parsed)) {
                  setMessagesPerMonth(clamp(parsed, 100, 100000));
                }
              }}
              onBlur={() => {
                const v = messagesInput.trim();
                if (v === '') {
                  setMessagesPerMonth(20000);
                  setMessagesInput('20000');
                } else {
                  const n = clamp(parseInt(v || '0', 10) || 0, 100, 100000);
                  setMessagesPerMonth(n);
                  setMessagesInput(String(n));
                }
              }}
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-black/10"
            />
            <p className="mt-2 text-[13px] text-gray-600">{(() => {
              const raw = t('ROICalculator.inputs.messages.helper', 'Plan estimat: {plan} — {price}/lună');
              const price = fmtMoney(calc.plan.monthly).replace('$','').trim();
              const planLabel = translatePlanName(calc.plan.name);
              if (raw.includes('{plan}') || raw.includes('{price}')) {
                return raw.replace('{plan}', planLabel).replace('{price}', price);
              }
              return `${raw} ${planLabel} — ${price}/lună`;
            })()}</p>
          </div>
        </div>

        {/* KPI cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
            <div className="text-xs text-gray-300">{t('ROICalculator.cards.employeesOnlyTitle')}</div>
            <div className="mt-1 text-2xl font-bold">{fmtMoney(calc.humanYear1)} <span className="text-sm text-gray-400">{t('ROICalculator.cards.oneYear')}</span></div>
            <div className="text-sm text-gray-400">{fmtMoney(calc.human2Years)}{t('ROICalculator.cards.twoYears')}</div>
            <div className="text-sm text-gray-400">{fmtMoney(calc.humanYear3)}{t('ROICalculator.cards.threeYears')}</div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
            <div className="text-xs text-gray-300">{t('ROICalculator.cards.withBravinTitle')}</div>
            <div className="mt-1 text-2xl font-bold">{fmtMoney(calc.aiYear1)} <span className="text-sm text-gray-400">{t('ROICalculator.cards.oneYear')}</span></div>
            <div className="text-sm text-gray-400">{fmtMoney(calc.ai2Years)}{t('ROICalculator.cards.twoYears')}</div>
            <div className="text-sm text-gray-400">{fmtMoney(calc.ai3Years)}{t('ROICalculator.cards.threeYears')}</div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
            <div className="text-xs text-gray-300">{t('ROICalculator.cards.savingsTitle')}</div>
            <div className="mt-1 text-2xl font-bold text-emerald-400">{fmtMoney(calc.saveYear1)} <span className="text-sm text-gray-400">{t('ROICalculator.cards.oneYear')}</span></div>
            <div className="text-sm text-emerald-400">{fmtMoney(calc.save2Years)}{t('ROICalculator.cards.twoYears')} • {fmtMoney(calc.save3Years)}{t('ROICalculator.cards.threeYears')}</div>
            <div className="mt-2 text-[13px] text-gray-400">{t('ROICalculator.cards.roi3yNote')} <b>{fmtInt(calc.roiPct3)}%</b></div>
          </div>
        </div>

        {/* Tabel scurt cu diferențe */}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-300">
                <th className="py-3 px-4">{t('ROICalculator.table.headers.scenario')}</th>
                <th className="py-3 px-4">{t('ROICalculator.table.headers.y1')}</th>
                <th className="py-3 px-4">{t('ROICalculator.table.headers.y2')}</th>
                <th className="py-3 px-4">{t('ROICalculator.table.headers.y3')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 px-4 text-gray-200">{(() => {
                  const raw = t('ROICalculator.table.rows.employees');
                  const salary = fmtMoney(salaryPerAgentMonth);
                  if (raw.includes('{agents}') || raw.includes('{salary}')) {
                    return raw.replace('{agents}', String(agents)).replace('{salary}', salary);
                  }
                  return `${raw} (${agents} × ${salary}/lună)`;
                })()}</td>
                <td className="py-3 px-4">{fmtMoney(calc.humanYear1)}</td>
                <td className="py-3 px-4">{fmtMoney(calc.human2Years)}</td>
                <td className="py-3 px-4">{fmtMoney(calc.humanYear3)}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-200">{(() => {
                  const raw = t('ROICalculator.table.rows.withBravin', 'Cu Bravin (plan {plan} + LLM)');
                  if (raw.includes('{plan}')) return raw.replace('{plan}', translatePlanName(calc.plan.name));
                  return `${raw} (${translatePlanName(calc.plan.name)} + LLM)`;
                })()}</td>
                <td className="py-3 px-4">{fmtMoney(calc.aiYear1)}</td>
                <td className="py-3 px-4">{fmtMoney(calc.ai2Years)}</td>
                <td className="py-3 px-4">{fmtMoney(calc.ai3Years)}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-emerald-400">{t('ROICalculator.table.rows.netSavings')}</td>
                <td className="py-3 px-4 font-semibold text-emerald-400">{fmtMoney(calc.saveYear1)}</td>
                <td className="py-3 px-4 font-semibold text-emerald-400">{fmtMoney(calc.save2Years)}</td>
                <td className="py-3 px-4 font-semibold text-emerald-400">{fmtMoney(calc.save3Years)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
