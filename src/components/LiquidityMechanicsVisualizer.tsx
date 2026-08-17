import React, { useState, useEffect, useRef } from 'react';
import { 
  Droplets, 
  ArrowRight, 
  ArrowDown, 
  ArrowUpRight, 
  Layers, 
  Activity, 
  PieChart, 
  Gift, 
  Receipt, 
  HelpCircle, 
  CheckCircle2, 
  Info, 
  Sliders, 
  Cpu, 
  Lock, 
  RefreshCw,
  Coins,
  ShieldCheck,
  Zap,
  Globe2,
  X
} from 'lucide-react';

type FlowElementId = 
  | 'inputs'
  | 'central-pool'
  | 'activity'
  | 'allocations'
  | 'rewards'
  | 'fees';

interface ElementExplanation {
  id: FlowElementId;
  title: string;
  category: 'Input Rail' | 'Core Engine' | 'Output Destination';
  badge: string;
  summary: string;
  enters: string;
  happens: string;
  exits: string;
  transparencyGuarantee: string;
}

const EXPLANATIONS: Record<FlowElementId, ElementExplanation> = {
  inputs: {
    id: 'inputs',
    title: 'Capital Inflow Rails',
    category: 'Input Rail',
    badge: 'Source Phase',
    summary: 'How deposits and liquidity arrive in the system without compromising ownership.',
    enters: 'Institutional fiat wires (Fedwire, SEPA Instant) and on-chain wallet transfers.',
    happens: 'MPC and AML / Travel Rule checks assign funds to segregated, bankruptcy-remote accounts via unique cryptographic derivation paths — never commingled with operating funds.',
    exits: 'A 1:1-backed balance credited to your isolated ledger, ready for the core pool.',
    transparencyGuarantee: '1:1 asset backing verified through continuous Merkle tree solvency proofs.'
  },
  'central-pool': {
    id: 'central-pool',
    title: 'Central Liquidity Pool',
    category: 'Core Engine',
    badge: 'Aggregation Engine',
    summary: 'The mathematical reserve core that aggregates depth, facilitates settlement, and prevents fragmentation.',
    enters: 'Verified deposits and recalled liquidity from 45+ venues, dark pools, and staking contracts.',
    happens: 'A unified virtual reserve layer aggregates depth and routes every order along the cheapest path via real-time Smart Order Routing, netting internal balances before touching chain.',
    exits: 'Cost-optimal net flows dispatched outward to execution, allocations, rewards, and fees.',
    transparencyGuarantee: 'All pool allocations are verifiable in real-time on-chain and through public auditor attestations.'
  },
  activity: {
    id: 'activity',
    title: 'Activity & Execution',
    category: 'Output Destination',
    badge: 'Operational Flow',
    summary: 'How capital is deployed to execute transactions, balance books, and settle trades.',
    enters: 'Order instructions and routed capital from the central pool.',
    happens: 'SOR splits block trades into TWAP / VWAP child orders; atomic relays and zero-knowledge proofs settle sub-millisecond with no counterparty risk.',
    exits: 'Filled positions settle back into your designated custody sub-account with full telemetry.',
    transparencyGuarantee: 'Full execution telemetry logs with timestamped transaction hashes and slippage reports.'
  },
  allocations: {
    id: 'allocations',
    title: 'Reserve Allocations',
    category: 'Output Destination',
    badge: 'Custodial Partition',
    summary: 'Structured distribution of capital into segregated cold, warm, and treasury partitions.',
    enters: 'Capital directed by your percentage rules (e.g., 60% Cold Vault, 30% Staking, 10% Warm Relayer).',
    happens: 'Automated rebalancing sweeps idle liquidity into multi-signature, time-locked MPC cold storage across fully partitioned sub-ledgers.',
    exits: 'Segregated cold, warm, and treasury reserves, each requiring quorum authorization.',
    transparencyGuarantee: 'Every allocation rule requires quorum authorization from your designated institutional signers.'
  },
  rewards: {
    id: 'rewards',
    title: 'Rewards & Distributions',
    category: 'Output Destination',
    badge: 'Protocol Accrual',
    summary: 'The transparent distribution of consensus staking yields and network incentives.',
    enters: 'Principal delegated to prime proof-of-stake validator nodes.',
    happens: 'Yield accrues natively from protocol inflation and block production — no lending, borrowing, or rehypothecation of your principal.',
    exits: 'Rewards harvested daily and credited directly to your balance, with principal untouched.',
    transparencyGuarantee: 'Yield rates reflect pure on-chain protocol metrics with zero synthetic leverage or hidden lockups.'
  },
  fees: {
    id: 'fees',
    title: 'Network & Protocol Fees',
    category: 'Output Destination',
    badge: 'Transparent Costs',
    summary: 'A clear accounting of gas costs, custodian maintenance, and relayer fees.',
    enters: 'Per-transaction gas, relayer routing, and enterprise security SLA costs.',
    happens: 'Costs are metered transparently — zero hidden maker/taker markups, withdrawal penalties, or slippage buffers.',
    exits: 'An itemized, verifiable receipt published before every transaction confirmation.',
    transparencyGuarantee: 'Itemized fee breakdown published before every transaction confirmation with verifiable receipts.'
  }
};

/** Shared accent tokens per node so the graph and the reveal panel stay in sync. */
const NODE_ACCENT: Record<FlowElementId, { text: string; bg: string; border: string; ring: string; stroke: string; dot: string }> = {
  inputs: { text: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/50', ring: 'ring-blue-500/30', stroke: '#3B82F6', dot: '#60A5FA' },
  'central-pool': { text: 'text-cyan-300', bg: 'bg-cyan-500/15', border: 'border-cyan-400/60', ring: 'ring-cyan-500/25', stroke: '#22D3EE', dot: '#67E8F9' },
  activity: { text: 'text-cyan-400', bg: 'bg-cyan-500/15', border: 'border-cyan-500/50', ring: 'ring-cyan-500/30', stroke: '#38BDF8', dot: '#38BDF8' },
  allocations: { text: 'text-indigo-400', bg: 'bg-indigo-500/15', border: 'border-indigo-500/50', ring: 'ring-indigo-500/30', stroke: '#818CF8', dot: '#818CF8' },
  rewards: { text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/50', ring: 'ring-emerald-500/30', stroke: '#34D399', dot: '#34D399' },
  fees: { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/50', ring: 'ring-amber-500/30', stroke: '#F59E0B', dot: '#FBBF24' },
};

/** Output nodes that fan out from the core, with their graph geometry (in the 600x450 viewBox). */
const OUTPUT_NODES: Array<{
  id: FlowElementId;
  label: string;
  sub: string;
  icon: React.ElementType;
  leftPct: number;
  topPct: number;
  path: string;
}> = [
  { id: 'activity', label: 'Activity', sub: 'Execution • SOR', icon: Activity, leftPct: 85, topPct: 18, path: 'M 352 208 Q 430 120 476 88' },
  { id: 'allocations', label: 'Allocations', sub: 'Cold • Warm • Reserves', icon: PieChart, leftPct: 85, topPct: 39, path: 'M 356 220 Q 430 195 476 178' },
  { id: 'rewards', label: 'Rewards', sub: 'Validator Yield', icon: Gift, leftPct: 85, topPct: 61, path: 'M 356 230 Q 430 258 476 272' },
  { id: 'fees', label: 'Fees', sub: 'Gas • Custody SLAs', icon: Receipt, leftPct: 85, topPct: 82, path: 'M 352 242 Q 430 336 476 362' },
];

export const LiquidityMechanicsVisualizer: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<FlowElementId>('central-pool');
  const [activeSimulationMode, setActiveSimulationMode] = useState<'balanced' | 'high-volume' | 'staking-focused'>('balanced');
  const svgRef = useRef<SVGSVGElement | null>(null);

  const currentExplanation = EXPLANATIONS[selectedElement];
  const accent = NODE_ACCENT[selectedElement];
  // Stream speed reacts to the selected simulation mode (faster = higher velocity).
  const streamDur = activeSimulationMode === 'high-volume' ? 1.1 : activeSimulationMode === 'staking-focused' ? 3.2 : 2.2;

  return (
    <section id="liquidity-explanation-section" className="py-20 sm:py-28 bg-[#06080e] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-blue-600/05 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Educational, Mechanics-First Tone */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Droplets className="w-3.5 h-3.5" />
            SYSTEM ARCHITECTURE & LIQUIDITY PLUMBING
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            How Capital Flows Through the Engine
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            Understand the mechanical flow of digital assets from intake, through the central liquidity engine, to execution, allocations, native rewards, and transparent network fees.
          </p>
        </div>

        {/* Top Simulation Mode Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b0e17] border border-slate-800 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>Interactive Plumbing Inspector • Click any node to explore mechanics:</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#07090f] p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveSimulationMode('balanced')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSimulationMode === 'balanced'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Balanced Flow
            </button>
            <button
              onClick={() => setActiveSimulationMode('high-volume')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSimulationMode === 'high-volume'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              High-Velocity Trading
            </button>
            <button
              onClick={() => setActiveSimulationMode('staking-focused')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSimulationMode === 'staking-focused'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Treasury Staking
            </button>
          </div>
        </div>

        {/* ===================== SIGNATURE CENTERPIECE: Liquidity Engine Graph ===================== */}
        <div className="relative rounded-[28px] bg-[#0a0d16] border border-slate-800 shadow-2xl overflow-hidden">
          {/* Ambient volumetric glow + isometric grid */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-blue-600/12 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:30px_30px] opacity-15 pointer-events-none" />

          {/* Top label: LIQUIDITY down into the structure */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-[11px] font-mono uppercase tracking-[0.2em] text-blue-300/80">
            <span className="flex items-center gap-1.5"><Droplets className="w-3.5 h-3.5" /> Liquidity</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>

          {/* Graph stage — fixed 4/3 ratio so the 600x450 SVG maps to node percentages */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] min-h-[460px] select-none">

            {/* Animated stream + connector layer (keyed by mode so speed changes restart cleanly) */}
            <svg
              key={activeSimulationMode}
              ref={svgRef}
              viewBox="0 0 600 450"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <defs>
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Core focal glow */}
              <circle cx="300" cy="225" r="130" fill="url(#coreGlow)" />

              {/* Inputs -> Core connector + streams */}
              {(() => {
                const inputActive = selectedElement === 'inputs' || selectedElement === 'central-pool';
                return (
                  <>
                    <path
                      id="path-inputs"
                      d="M 150 225 L 250 225"
                      fill="none"
                      stroke={NODE_ACCENT.inputs.stroke}
                      strokeWidth={inputActive ? 3.5 : 2}
                      strokeOpacity={inputActive ? 0.9 : 0.35}
                      strokeDasharray="7 6"
                      className="transition-all duration-300"
                    />
                    {[0, 1].map((k) => (
                      <circle key={k} r="3.6" fill={NODE_ACCENT.inputs.dot}>
                        <animateMotion dur={`${streamDur}s`} begin={`${(streamDur / 2) * k}s`} repeatCount="indefinite">
                          <mpath href="#path-inputs" />
                        </animateMotion>
                      </circle>
                    ))}
                  </>
                );
              })()}

              {/* Core -> each output connector + streams */}
              {OUTPUT_NODES.map((node, ni) => {
                const acc = NODE_ACCENT[node.id];
                const active = selectedElement === node.id || selectedElement === 'central-pool';
                const pathId = `path-${node.id}`;
                return (
                  <g key={node.id}>
                    <path
                      id={pathId}
                      d={node.path}
                      fill="none"
                      stroke={acc.stroke}
                      strokeWidth={active ? 3.5 : 2}
                      strokeOpacity={active ? 0.9 : 0.3}
                      strokeDasharray="7 6"
                      className="transition-all duration-300"
                    />
                    {[0, 1].map((k) => (
                      <circle key={k} r="3.4" fill={acc.dot}>
                        <animateMotion dur={`${streamDur}s`} begin={`${(streamDur / 2) * k + ni * 0.15}s`} repeatCount="indefinite">
                          <mpath href={`#${pathId}`} />
                        </animateMotion>
                      </circle>
                    ))}
                  </g>
                );
              })}
            </svg>

            {/* ---- INPUT NODE (left) ---- */}
            <button
              onClick={() => setSelectedElement('inputs')}
              style={{ left: '13%', top: '50%' }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-28 sm:w-32 p-3 rounded-2xl border text-left transition-all cursor-pointer z-20 ${
                selectedElement === 'inputs'
                  ? `bg-[#101728] ${NODE_ACCENT.inputs.border} shadow-xl ring-2 ${NODE_ACCENT.inputs.ring} scale-105`
                  : 'bg-[#080b12]/95 border-slate-800 hover:border-slate-700 hover:bg-[#0c101c]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className={`w-7 h-7 rounded-lg ${NODE_ACCENT.inputs.bg} ${NODE_ACCENT.inputs.text} flex items-center justify-center`}>
                  <Coins className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[9px] font-mono font-bold ${NODE_ACCENT.inputs.text}`}>ENTERS</span>
              </div>
              <div className="text-xs font-bold text-white">Inputs</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Wires • On-Chain</div>
            </button>

            {/* ---- CENTRAL CORE ---- */}
            <button
              onClick={() => setSelectedElement('central-pool')}
              style={{ left: '50%', top: '50%' }}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 z-20 w-40 h-40 sm:w-44 sm:h-44 rounded-full border-2 flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all ${
                selectedElement === 'central-pool'
                  ? 'bg-[#0c1526] border-cyan-400 shadow-2xl shadow-cyan-500/30 ring-4 ring-cyan-500/20 scale-105'
                  : 'bg-[#0a0e1a] border-cyan-500/40 hover:border-cyan-400 hover:bg-[#0e1322]'
              }`}
            >
              {/* Rotating calibration ring + pulse aura */}
              <div className="absolute -inset-3 rounded-full border border-cyan-400/25 border-dashed animate-[spin_18s_linear_infinite] pointer-events-none" />
              <div className="absolute -inset-6 rounded-full bg-cyan-500/10 blur-2xl animate-pulse pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center mb-1.5 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                <Droplets className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-bold text-white tracking-wide leading-tight">
                Central<br />Liquidity Core
              </div>
              <div className="text-[10px] text-emerald-400 font-mono mt-1 font-semibold">$48.2B Depth</div>
            </button>

            {/* ---- OUTPUT NODES (fan out to the right) ---- */}
            {OUTPUT_NODES.map((node) => {
              const acc = NODE_ACCENT[node.id];
              const Icon = node.icon;
              const active = selectedElement === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedElement(node.id)}
                  style={{ left: `${node.leftPct}%`, top: `${node.topPct}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-32 sm:w-36 p-3 rounded-2xl border text-left transition-all cursor-pointer z-20 ${
                    active
                      ? `bg-[#0f1626] ${acc.border} shadow-xl ring-2 ${acc.ring} scale-105`
                      : 'bg-[#080b12]/95 border-slate-800 hover:border-slate-700 hover:bg-[#0c101c]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className={`w-6 h-6 rounded-lg ${acc.bg} ${acc.text} flex items-center justify-center`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <span className={`text-[9px] font-mono ${acc.text}`}>EXITS</span>
                  </div>
                  <div className="text-xs font-bold text-white">{node.label}</div>
                  <div className="text-[10px] text-slate-400">{node.sub}</div>
                </button>
              );
            })}

            {/* Bottom-right distribution hint */}
            <div className="absolute bottom-4 right-6 z-20 text-[10px] font-mono uppercase tracking-widest text-slate-500 hidden sm:flex items-center gap-1.5">
              Distribution <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          {/* Footer hint */}
          <div className="relative z-20 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-mono border-t border-slate-800/80 py-3">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>Click any node to trace what enters, what happens, and what exits.</span>
          </div>
        </div>

        {/* ===================== REVEAL: What Enters / Happens / Exits ===================== */}
        <div className="mt-8 rounded-[28px] bg-[#0c101a] border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-2xl ${accent.bg} ${accent.text} border ${accent.border} flex items-center justify-center`}>
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${accent.text}`}>
                  {currentExplanation.badge} • {currentExplanation.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">{currentExplanation.title}</h3>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md sm:text-right">{currentExplanation.summary}</p>
          </div>

          {/* Three facets: Enters / Happens / Exits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-[#070910] border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
                <ArrowDown className="w-4 h-4" /> What Enters
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{currentExplanation.enters}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#070910] border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
                <RefreshCw className="w-4 h-4" /> What Happens
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{currentExplanation.happens}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#070910] border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                <ArrowUpRight className="w-4 h-4" /> What Exits
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{currentExplanation.exits}</p>
            </div>
          </div>

          {/* Guarantee footer */}
          <div className="mt-5 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <strong className="text-white block text-[11px] font-mono uppercase">Solvency Guarantee</strong>
              <span>{currentExplanation.transparencyGuarantee}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
