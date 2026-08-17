import React, { useState } from 'react';
import {
  Coins,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  ArrowLeftRight,
  Percent,
  AlertTriangle,
  Lock,
  FileText,
  Layers,
  Cpu,
  Zap,
  Scale,
  Building2,
  WalletCards,
  Users,
  Activity,
  Server,
  ChevronDown
} from 'lucide-react';

interface AppCoinUtilityProps {
  onOpenAccessRequest?: () => void;
}

type QuestionId = 'what' | 'where' | 'acquired' | 'limitations' | 'fees';

type Accent = 'blue' | 'indigo' | 'cyan' | 'rose' | 'amber';

const ACCENT: Record<Accent, { text: string; bg: string; border: string }> = {
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/40' },
  indigo: { text: 'text-indigo-400', bg: 'bg-indigo-500/15', border: 'border-indigo-500/40' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/15', border: 'border-cyan-500/40' },
  rose: { text: 'text-rose-400', bg: 'bg-rose-500/15', border: 'border-rose-500/40' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/40' },
};

interface Point { icon: React.ElementType; title: string; desc: string; }
interface Metric { value: string; label: string; sub: string; accent: Accent; }

interface QAItem {
  id: QuestionId;
  question: string;
  icon: React.ElementType;
  accent: Accent;
  answer: string;
  points?: Point[];
  metrics?: Metric[];
  note?: string;
}

const QUESTIONS: QAItem[] = [
  {
    id: 'what',
    question: 'What is APX?',
    icon: Cpu,
    accent: 'blue',
    answer:
      'APX is a non-speculative, internal coordination token — not an investment product. It exists only to meter and settle platform infrastructure: gas relaying, API usage, hardware attestation, and multi-signer governance logging.',
    points: [
      { icon: Zap, title: 'Atomic relayer fuel', desc: 'Pays sub-second cross-chain routing across 45+ venues without holding separate volatile gas tokens (SOL, ETH, AVAX).' },
      { icon: CheckCircle2, title: 'Deterministic accounting', desc: 'One unified denomination for enterprise API consumption, governance logs, and audit trails.' },
    ],
  },
  {
    id: 'where',
    question: 'Where is it used?',
    icon: Layers,
    accent: 'indigo',
    answer: 'Accepted strictly inside the enterprise operating environment for four concrete technical operations:',
    points: [
      { icon: Zap, title: 'Smart Order Routing costs', desc: 'Offsets execution slippage and dark-pool connection hops.' },
      { icon: Lock, title: 'FIPS 140-3 enclave attestation', desc: 'Covers cryptographic proof generation from Swiss & US hardware security modules.' },
      { icon: Cpu, title: 'High-throughput API metering', desc: 'Unlocks dedicated endpoints handling 100,000+ telemetry queries/sec.' },
      { icon: FileText, title: 'FATF Travel Rule certificates', desc: 'Programmatic zero-knowledge compliance attestations between regulated VASPs.' },
    ],
  },
  {
    id: 'acquired',
    question: 'How is it acquired?',
    icon: WalletCards,
    accent: 'cyan',
    answer: 'Qualified institutions obtain utility balances through three authorized, audited channels:',
    points: [
      { icon: Building2, title: 'Direct enterprise billing', desc: 'Fixed rate via monthly corporate invoicing or automated fiat wire settlement.' },
      { icon: Zap, title: 'Real-time auto-conversion', desc: 'Converted from USDC / EURC balances at the exact moment of API execution.' },
      { icon: Layers, title: 'Node operation grants', desc: 'Allocated to partners hosting FIPS physical hardware signer pods.' },
    ],
  },
  {
    id: 'limitations',
    question: 'What are its limitations?',
    icon: Lock,
    accent: 'rose',
    answer: 'APX is deliberately constrained so it can never behave like a security or a speculative asset:',
    points: [
      { icon: Scale, title: 'No governance over capital', desc: 'Zero voting power over client segregated assets, treasury allocations, or liquidity balances.' },
      { icon: ArrowLeftRight, title: 'No guaranteed market liquidity', desc: 'Built for in-platform utility; no commitment to market-making or exchange listings.' },
      { icon: AlertTriangle, title: 'Velocity & anti-hoarding caps', desc: 'Balances capped to projected annual API / relayer volume to prevent speculative accumulation.' },
    ],
  },
  {
    id: 'fees',
    question: 'What fees apply?',
    icon: Percent,
    accent: 'amber',
    answer: 'Using APX yields transparent, fixed reductions on infrastructure overhead — and unused credits stay refundable:',
    metrics: [
      { value: '-35%', label: 'SOR relayer discount', sub: 'On high-frequency block fills', accent: 'amber' },
      { value: 'Zero', label: 'Gas overhead spread', sub: 'Raw on-chain cost pass-through', accent: 'blue' },
      { value: '100%', label: 'Itemized receipts', sub: 'Verifiable on-chain logs', accent: 'cyan' },
    ],
    note: 'Discounts apply only to infrastructure operational costs — never to third-party staking rewards or raw exchange spreads. Unused credits bought via enterprise billing refund 1:1 to fiat at contract closeout, minus raw gas consumed.',
  },
];

// Animated utility flow: USER → APP COIN → UTILITY → PLATFORM → ACCOUNT ACTIVITY
const FLOW_STAGES: Array<{ icon: React.ElementType; label: string; sub: string; accent: Accent }> = [
  { icon: Users, label: 'User', sub: 'Institutional operator', accent: 'blue' },
  { icon: Coins, label: 'App Coin', sub: 'APX balance', accent: 'amber' },
  { icon: Zap, label: 'Utility', sub: 'Gas · API · Attestation', accent: 'indigo' },
  { icon: Server, label: 'Platform', sub: 'Relayers & enclaves', accent: 'cyan' },
  { icon: Activity, label: 'Account Activity', sub: 'Settled & logged', accent: 'blue' },
];

export const AppCoinUtility: React.FC<AppCoinUtilityProps> = ({ onOpenAccessRequest }) => {
  const [openId, setOpenId] = useState<QuestionId | null>('what');

  return (
    <section id="app-coin-section" className="py-20 sm:py-28 bg-[#06080e] relative overflow-hidden border-t border-slate-800/80">

      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-blue-600/05 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Coins className="w-3.5 h-3.5" />
            PROTOCOL UTILITY SPECIFICATION
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            APX <span className="text-slate-500 font-light">—</span> App Utility
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            A plain-language guide to the platform's technical coordination token: what it is, where it works, and the strict limits that keep it a pure utility.
          </p>
        </div>

        {/* ===================== LARGE APX VISUAL ===================== */}
        <div className="relative rounded-[28px] bg-[#0a0d16] border border-slate-800 shadow-2xl overflow-hidden p-8 sm:p-10 mb-8 flex flex-col items-center gap-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] bg-amber-500/08 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

          {/* Coin emblem with orbiting utility chips */}
          <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center group">
            {/* Rotating calibration rings + aura */}
            <div className="absolute -inset-3 rounded-full border border-amber-400/25 border-dashed animate-[spin_22s_linear_infinite] pointer-events-none" />
            <div className="absolute -inset-8 rounded-full border border-slate-700/40 animate-[spin_36s_linear_infinite_reverse] pointer-events-none" />
            <div className="absolute inset-4 rounded-full bg-amber-500/15 blur-2xl animate-pulse pointer-events-none" />

            {/* Coin face */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#2a2410] via-[#161206] to-[#0a0803] border-2 border-amber-500/50 shadow-2xl shadow-amber-500/20 flex flex-col items-center justify-center ring-8 ring-amber-500/5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-[#0a0803] flex items-center justify-center mb-1.5 shadow-lg shadow-amber-500/30">
                <Coins className="w-6 h-6" />
              </div>
              <div className="text-2xl font-extrabold text-white tracking-wider">APX</div>
              <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-amber-300/80 mt-0.5">App Utility</div>
            </div>

            {/* Orbiting utility chips */}
            {[
              { icon: Zap, cls: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2', color: 'text-blue-300 border-blue-500/40 bg-[#0a0f1e]' },
              { icon: Percent, cls: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2', color: 'text-amber-300 border-amber-500/40 bg-[#161206]' },
              { icon: Lock, cls: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2', color: 'text-emerald-300 border-emerald-500/40 bg-[#081512]' },
              { icon: FileText, cls: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2', color: 'text-cyan-300 border-cyan-500/40 bg-[#07131a]' },
            ].map((chip, i) => {
              const ChipIcon = chip.icon;
              return (
                <div key={i} className={`absolute ${chip.cls} w-9 h-9 rounded-xl border backdrop-blur-md shadow-lg flex items-center justify-center ${chip.color}`}>
                  <ChipIcon className="w-4 h-4" />
                </div>
              );
            })}
          </div>

          {/* Compliance mandate */}
          <div className="relative z-10 max-w-2xl w-full p-4 rounded-2xl bg-[#0a0e1a] border border-blue-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-400">
                <span className="text-white font-bold font-mono uppercase tracking-wider">Strict technical utility.</span>{' '}
                Not an investment product — zero equity, dividends, or capital-appreciation mechanisms.
              </div>
            </div>
            <div className="px-3 py-1 rounded-lg bg-[#070910] border border-slate-800 text-[11px] font-mono text-emerald-400 font-semibold flex-shrink-0 whitespace-nowrap">
              FINMA / Q-Utility Compliant
            </div>
          </div>
        </div>

        {/* ===================== FIVE Q&A BLOCKS ===================== */}
        <div className="space-y-3">
          {QUESTIONS.map((item) => {
            const Icon = item.icon;
            const accent = ACCENT[item.accent];
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${
                  isOpen ? `bg-[#0b0f1b] ${accent.border}` : 'bg-[#080b13] border-slate-800/80'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${accent.bg} ${accent.text} ${accent.border}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-base sm:text-lg font-extrabold text-white">{item.question}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 space-y-4 animate-in fade-in duration-300">
                    <p className="text-sm text-slate-300 leading-relaxed">{item.answer}</p>

                    {item.points && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {item.points.map((p, idx) => {
                          const PIcon = p.icon;
                          return (
                            <div key={idx} className="p-3.5 rounded-xl bg-[#070911] border border-slate-800 space-y-1">
                              <div className="text-xs font-bold text-white flex items-center gap-2">
                                <PIcon className={`w-4 h-4 ${accent.text}`} />
                                {p.title}
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {item.metrics && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                        {item.metrics.map((m, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-[#070911] border border-slate-800">
                            <div className={`text-2xl font-extrabold font-mono ${ACCENT[m.accent].text}`}>{m.value}</div>
                            <div className="text-xs font-bold text-white mt-1">{m.label}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{m.sub}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.note && (
                      <div className="p-3.5 rounded-xl bg-[#070911] border border-slate-800 text-xs text-slate-400 leading-relaxed">
                        {item.note}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ===================== ANIMATED UTILITY FLOW ===================== */}
        <div className="mt-10 rounded-[28px] bg-[#0a0d16] border border-slate-800 shadow-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            <ArrowLeftRight className="w-3.5 h-3.5 text-blue-400" />
            How value flows through the system
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
            {FLOW_STAGES.map((stage, i) => {
              const StageIcon = stage.icon;
              const acc = ACCENT[stage.accent];
              return (
                <React.Fragment key={stage.label}>
                  <div className={`flex-1 p-4 rounded-2xl bg-[#080b13] border ${acc.border} flex flex-col items-center text-center gap-2 relative`}>
                    <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${acc.bg.replace('/15', '/60')} opacity-70`} />
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${acc.bg.replace('/15', '')}`} />
                    </span>
                    <div className={`w-11 h-11 rounded-2xl ${acc.bg} ${acc.text} border ${acc.border} flex items-center justify-center`}>
                      <StageIcon className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-bold text-white">{stage.label}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{stage.sub}</div>
                  </div>

                  {/* Animated connector (chase dots + directional arrow) */}
                  {i < FLOW_STAGES.length - 1 && (
                    <div className="flex lg:flex-col items-center justify-center gap-1.5 py-1 lg:py-0 lg:px-1">
                      <div className="flex lg:flex-row flex-col gap-1">
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className="w-1.5 h-1.5 rounded-full bg-blue-400/80 animate-pulse"
                            style={{ animationDelay: `${d * 180}ms` }}
                          />
                        ))}
                      </div>
                      <ArrowRight className="hidden lg:block w-4 h-4 text-blue-400/70" />
                      <ArrowDown className="lg:hidden w-4 h-4 text-blue-400/70" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <p className="mt-5 text-center text-xs text-slate-500 font-mono">
            APX is spent as fuel — it converts operator intent into metered platform work and a verifiable activity log.
          </p>
        </div>

        {/* Bottom Action / Whitepaper */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Full Technical Whitepaper &amp; Smart Contract Specification v2.6 · Audited by Trail of Bits</span>
          </div>

          <button
            onClick={onOpenAccessRequest}
            className="px-5 py-2 rounded-xl bg-[#121727] hover:bg-[#182035] text-blue-300 hover:text-white font-semibold text-xs transition-all border border-blue-500/30 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Request Enterprise SLA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
