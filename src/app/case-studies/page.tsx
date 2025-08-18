'use client'

import type { Metadata } from 'next';
import { useMemo, useState } from 'react';



// ---------------- UI helpers ----------------
function ImgPlaceholder({
  className = '',
  label = 'IMAGINE',
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100 ${className}`}
      aria-label="Image placeholder"
    >
      <div className="absolute inset-0 grid place-items-center text-[10px] tracking-widest text-gray-400">
        <span>{label}</span>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-700">
      {children}
    </span>
  );
}

// ---------------- Data ----------------
export type CaseStudy = {
  id: string;
  brand: string;
  title: string;
  excerpt: string;
  industry: string;
  channels: string[]; // WhatsApp / Instagram / Messenger / Web / Email / SMS
  size: 'SMB' | 'Mid‑market' | 'Enterprise';
  kpis: string[]; // e.g. "+60% conversii"
  variant?: 'brandTile' | 'imageTile';
};

const ALL_CASES: CaseStudy[] = [
  {
    id: 'mizzen',
    brand: 'Mizzen INC.',
    title: 'Agent AI de vânzări pe WhatsApp → +36% AOV',
    excerpt:
      'Recomandări dinamice și checkout ghidat. Handoff către agent uman pentru retururi și cazuri speciale.',
    industry: 'E‑commerce',
    channels: ['WhatsApp', 'Web'],
    size: 'Mid‑market',
    kpis: ['+36% AOV', '−48% timp răspuns'],
    variant: 'brandTile',
  },
  {
    id: 'brand24',
    brand: 'Brand24',
    title: 'Suport 24/7 pe Web chat → NPS 71',
    excerpt:
      'Răspunsuri pe baza documentației + transfer context către agent. Reducere majoră a ticurilor repetitive.',
    industry: 'SaaS B2B',
    channels: ['Web', 'Email'],
    size: 'SMB',
    kpis: ['NPS 71', '−63% timp pe tichet'],
    variant: 'imageTile',
  },
  {
    id: 'remember',
    brand: 'remember',
    title: 'Conversii din Instagram DM → +58%',
    excerpt:
      'Fluxuri automate pentru răspunsuri pre‑vânzare și linkuri directe spre plată.',
    industry: 'Retail',
    channels: ['Instagram'],
    size: 'SMB',
    kpis: ['+58% conversii', '3× răspunsuri/agent'],
    variant: 'brandTile',
  },
  {
    id: 'boundless',
    brand: 'boundless',
    title: 'WhatsApp + Web chat unificate → −32% cost/contact',
    excerpt:
      'Un singur agent AI pentru status comenzi, retururi și upsell la accesorii.',
    industry: 'E‑commerce',
    channels: ['WhatsApp', 'Web'],
    size: 'Mid‑market',
    kpis: ['−32% cost/contact', '+21% reacții pozitive'],
    variant: 'imageTile',
  },
  {
    id: 'materials',
    brand: 'Materials Market',
    title: 'Calificare lead‑uri B2B prin chat → 2.4× SQL',
    excerpt:
      'Întrebări ghidate, scoring și programări automate pentru call‑uri de vânzări.',
    industry: 'Industrial',
    channels: ['Web', 'Email'],
    size: 'Mid‑market',
    kpis: ['2.4× SQL', '−41% no‑show'],
    variant: 'imageTile',
  },
  {
    id: 'yatter',
    brand: 'Yatter',
    title: 'Inbox social automatizat → −55% TTR',
    excerpt:
      'Agentul AI prioritzează DM‑urile și creează răspunsuri pe baza ghidurilor interne.',
    industry: 'Agenție',
    channels: ['Instagram', 'Facebook'],
    size: 'SMB',
    kpis: ['−55% time‑to‑respond', '+29% retenție'],
    variant: 'brandTile',
  },
  {
    id: 'razorpay',
    brand: 'Razorpay',
    title: 'Self‑service plăți și dispute → −61% tichete',
    excerpt:
      'Recunoaștere intenții, verificări KYC și status tranzacții fără operator uman.',
    industry: 'Fintech',
    channels: ['Web', 'Email'],
    size: 'Enterprise',
    kpis: ['−61% tichete', '24/7 disponibil'],
    variant: 'imageTile',
  },
  {
    id: 'adventure',
    brand: 'ADVENTURE CO',
    title: 'Rezervări automate → +41% vânzări directe',
    excerpt:
      'Calendar unificat, upsell la pachete și memento‑uri automate pe SMS.',
    industry: 'Travel & Hospitality',
    channels: ['Web', 'SMS'],
    size: 'SMB',
    kpis: ['+41% rezervări', '−22% OTA'],
    variant: 'imageTile',
  },
  {
    id: 'ccv',
    brand: 'CCV',
    title: 'Suport tehnic cu KB → −48% interacțiuni umane',
    excerpt:
      'Întrebări despre integrare și facturare rezolvate de agentul AI în < 1 min.',
    industry: 'SaaS B2B',
    channels: ['Web', 'Email'],
    size: 'Mid‑market',
    kpis: ['−48% interacțiuni umane', 'CSAT 4.7/5'],
    variant: 'imageTile',
  },
  {
    id: 'esw',
    brand: 'esw',
    title: 'Automatizare retururi globale',
    excerpt:
      'Formulare inteligente + tracking cross‑border — mai puține tichete, clienți informați.',
    industry: 'E‑commerce',
    channels: ['Web', 'Email'],
    size: 'Enterprise',
    kpis: ['−37% cost suport', '+18% NPS'],
    variant: 'imageTile',
  },
  {
    id: 'clickmechanic',
    brand: 'ClickMechanic',
    title: 'Programări service auto din chat',
    excerpt:
      'Estimări, piese și ore disponibile — totul fără apel telefonic.',
    industry: 'Auto',
    channels: ['Web', 'WhatsApp'],
    size: 'SMB',
    kpis: ['−55% timp programare', '3× productivitate'],
    variant: 'imageTile',
  },
  {
    id: 'unbounce',
    brand: 'unbounce',
    title: 'Onboarding ghidat → +23% activări',
    excerpt:
      'Agentul AI explică pașii cheie, propune template‑uri și detectează blocaje.',
    industry: 'SaaS B2B',
    channels: ['Web'],
    size: 'SMB',
    kpis: ['+23% activări', '−19% churn 30d'],
    variant: 'brandTile',
  },
  {
    id: 'studentcrowd',
    brand: 'StudentCrowd',
    title: 'Asistență admiteri pe Instagram DM',
    excerpt:
      'Q&A despre cursuri, costuri și cazări — răspunsuri consistente, 24/7.',
    industry: 'Educație',
    channels: ['Instagram'],
    size: 'SMB',
    kpis: ['+120% conversii trial', 'NPS 72'],
    variant: 'imageTile',
  },
  {
    id: 'wearebrave',
    brand: 'wearebrave',
    title: 'Routing inteligent pentru lead‑uri',
    excerpt:
      'Calificare automată și trimitere la consultantul potrivit în timp real.',
    industry: 'Agenție',
    channels: ['Web'],
    size: 'SMB',
    kpis: ['2.1× trial → plătit', '+31% win rate'],
    variant: 'imageTile',
  },
  {
    id: 'netguru',
    brand: 'netguru',
    title: 'Self‑service pentru întrebări HR',
    excerpt:
      'Politici interne, concedii, beneficii — rezolvate instant; integrare cu Slack.',
    industry: 'HR/IT',
    channels: ['Slack', 'Web'],
    size: 'Mid‑market',
    kpis: ['−67% tichete interne', 'CSAT 4.8/5'],
    variant: 'imageTile',
  },
  {
    id: 'dashthis',
    brand: 'DashThis',
    title: 'Suport clienți multi‑lingv',
    excerpt:
      'Detecție limbă + răspunsuri din KB; escaladare contextuală.',
    industry: 'SaaS B2B',
    channels: ['Web', 'Email'],
    size: 'SMB',
    kpis: ['−44% backlog', 'TTFR < 30s'],
    variant: 'imageTile',
  },
];

const INDUSTRIES = [
  'E‑commerce',
  'SaaS B2B',
  'Retail',
  'Industrial',
  'Travel & Hospitality',
  'Agenție',
  'Fintech',
  'Auto',
  'Educație',
  'HR/IT',
];

const CHANNELS = ['Web', 'WhatsApp', 'Instagram', 'Facebook', 'Email', 'SMS', 'Slack'];

const SIZES: Array<CaseStudy['size']> = ['SMB', 'Mid‑market', 'Enterprise'];

// ---------------- Components ----------------
function SidebarFilters({
  q,
  setQ,
  selectedIndustries,
  setSelectedIndustries,
  selectedChannels,
  setSelectedChannels,
  selectedSizes,
  setSelectedSizes,
  reset,
}: any) {
  return (
    <aside className="lg:sticky lg:top-24">
      {/* Search */}
      <label className="group relative block">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </span>
        <input
          type="search"
          placeholder="Caută studii de caz"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none"
        />
      </label>

      {/* Filters */}
      <div className="mt-6 space-y-6">
        <div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Industrie</h3>
          <div className="grid grid-cols-1 gap-2">
            {INDUSTRIES.map((ind) => (
              <label key={ind} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedIndustries.includes(ind)}
                  onChange={(e) =>
                    setSelectedIndustries((prev: string[]) =>
                      e.target.checked ? [...prev, ind] : prev.filter((x) => x !== ind),
                    )
                  }
                />
                {ind}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Canal</h3>
          <div className="grid grid-cols-2 gap-2">
            {CHANNELS.map((ch) => (
              <label key={ch} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedChannels.includes(ch)}
                  onChange={(e) =>
                    setSelectedChannels((prev: string[]) =>
                      e.target.checked ? [...prev, ch] : prev.filter((x) => x !== ch),
                    )
                  }
                />
                {ch}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Dimensiunea companiei</h3>
          <div className="grid grid-cols-3 gap-2">
            {SIZES.map((sz) => (
              <label key={sz} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(sz)}
                  onChange={(e) =>
                    setSelectedSizes((prev: string[]) =>
                      e.target.checked ? [...prev, sz] : prev.filter((x) => x !== sz),
                    )
                  }
                />
                {sz}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={reset}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Resetează filtrele
        </button>
      </div>
    </aside>
  );
}

function CaseCard({ cs }: { cs: CaseStudy }) {
  const isBrand = cs.variant === 'brandTile';
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-3 transition-shadow hover:shadow-sm">
      {/* Visual */}
      {isBrand ? (
        <div className="relative grid aspect-[16/9] w-full place-items-center overflow-hidden rounded-xl bg-gray-50">
          <div className="absolute inset-0 opacity-40">
            <ImgPlaceholder className="h-full w-full rounded-none" label="BRAND" />
          </div>
          <div className="relative z-10 text-center">
            <div className="text-2xl font-bold text-gray-900 sm:text-3xl">{cs.brand}</div>
          </div>
        </div>
      ) : (
        <ImgPlaceholder className="aspect-[16/9] w-full" label="COVER" />
      )}

      {/* Body */}
      <div className="mt-3 px-1 pb-1">
        <div className="flex flex-wrap items-center gap-2">
          <Tag>{cs.industry}</Tag>
          {cs.channels.map((c) => (
            <Tag key={c}>{c}</Tag>
          ))}
        </div>
        <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-gray-900">
          {cs.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600">{cs.excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {cs.kpis.map((k) => (
            <span key={k} className="rounded-lg bg-gray-900 px-2.5 py-1 text-xs font-medium text-white">
              {k}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <button className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-700">
            Citește studiul
          </button>
        </div>
      </div>
    </article>
  );
}

// ---------------- Page ----------------
export default function CaseStudiesPage() {
  const [q, setQ] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'alpha'>('recent');

  const reset = () => {
    setQ('');
    setSelectedIndustries([]);
    setSelectedChannels([]);
    setSelectedSizes([]);
    setSortBy('recent');
  };

  const filtered = useMemo(() => {
    let list = [...ALL_CASES];

    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (c) =>
          c.brand.toLowerCase().includes(s) ||
          c.title.toLowerCase().includes(s) ||
          c.excerpt.toLowerCase().includes(s),
      );
    }

    if (selectedIndustries.length) {
      list = list.filter((c) => selectedIndustries.includes(c.industry));
    }

    if (selectedChannels.length) {
      list = list.filter((c) => c.channels.some((ch) => selectedChannels.includes(ch)));
    }

    if (selectedSizes.length) {
      list = list.filter((c) => selectedSizes.includes(c.size));
    }

    if (sortBy === 'alpha') {
      list.sort((a, b) => a.brand.localeCompare(b.brand));
    }

    return list;
  }, [q, selectedIndustries, selectedChannels, selectedSizes, sortBy]);

  return (
    <div className="min-h-screen bg-white">
  <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:py-12 mt-20 md:mt-26">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Studii de caz
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Idei reale despre agenți AI care răspund la mesaje — rezultate, canale și procese.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-500 sm:inline">{filtered.length} rezultate</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700"
            >
              <option value="recent">Cele mai recente</option>
              <option value="alpha">Alfabetic (brand)</option>
            </select>
          </div>
        </div>

        {/* 2-col layout: sidebar + grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <SidebarFilters
            q={q}
            setQ={setQ}
            selectedIndustries={selectedIndustries}
            setSelectedIndustries={setSelectedIndustries}
            selectedChannels={selectedChannels}
            setSelectedChannels={setSelectedChannels}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            reset={reset}
          />

          <main>
            {/* Mosaic grid */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {filtered.map((cs) => (
                <CaseCard key={cs.id} cs={cs} />
              ))}
            </div>

            {/* Bottom CTA, similar cu blocul de la final din screenshot */}
            <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
              <div className="grid items-center gap-0 md:grid-cols-2">
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-gray-900">Începe cu agenții AI</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Implementăm rapid agenți AI pe canalele tale (WhatsApp, Instagram, Web) și măsurăm impactul.
                  </p>
                  <div className="mt-4 flex gap-3">
                    <button className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-700">
                      Programează un demo
                    </button>
                    <button className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50">
                      Vezi arhitectura
                    </button>
                  </div>
                </div>
                <ImgPlaceholder className="h-52 w-full rounded-none md:h-full" label="CTA IMAGE" />
              </div>
            </div>
          </main>
        </div>

        {/* Footer mini‑nav (opțional, în stil directory) */}
        <div className="mt-16 border-t border-gray-200 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} AI Chat Mega Promoting. Toate drepturile rezervate.
        </div>
      </div>
    </div>
  );
}
