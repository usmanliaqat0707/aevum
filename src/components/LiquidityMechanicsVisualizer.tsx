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
  howItWorks: string[];
  mechanicsBreakdown: string;
  transparencyGuarantee: string;
}

const EXPLANATIONS: Record<FlowElementId, ElementExplanation> = {
  inputs: {
    id: 'inputs',
    title: 'Capital Inflow Rails',
    category: 'Input Rail',
    badge: 'Source Phase',
    summary: 'How deposits and liquidity arrive in the system without compromising ownership.',
    howItWorks: [
      'Deposits originate from institutional fiat wire rails (Fedwire, SEPA Instant) or on-chain wallet transfers.',
      'Funds are assigned directly to segregated, bankruptcy-remote accounts using unique cryptographic derivation paths.',
      'Assets enter the pool only after multi-party computation (MPC) and AML/Travel Rule policy checks pass.'
    ],
    mechanicsBreakdown: 'Incoming capital does not get commingled with company operating funds. Every deposit creates an immutable cryptographic receipt and increments the entity\'s isolated ledger balance.',
    transparencyGuarantee: '1:1 asset backing verified through continuous Merkle tree solvency proofs.'
  },
  'central-pool': {
    id: 'central-pool',
    title: 'Central Liquidity Pool',
    category: 'Core Engine',
    badge: 'Aggregation Engine',
    summary: 'The mathematical reserve core that aggregates depth, facilitates settlement, and prevents fragmentation.',
    howItWorks: [
      'Acts as a virtual unified liquidity layer connecting 45+ spot venues, dark pools, and non-custodial staking contracts.',
      'Determines the most cost-effective path for orders using real-time Smart Order Routing (SOR) algorithms.',
      'Maintains internal balance accounting to minimize unnecessary on-chain gas transfers until final net settlement.'
    ],
    mechanicsBreakdown: 'Rather than holding funds in dozens of disparate exchange accounts, the central pool serves as a coordinated coordination engine. Assets stay locked in audited smart contracts or MPC cold vaults until explicitly directed by authorized signers.',
    transparencyGuarantee: 'All pool allocations are verifiable in real-time on-chain and through public auditor attestations.'
  },
  activity: {
    id: 'activity',
    title: 'Activity & Execution',
    category: 'Output Destination',
    badge: 'Operational Flow',
    summary: 'How capital is deployed to execute transactions, balance books, and settle trades.',
    howItWorks: [
      'Capital flows outward to fulfill buy and sell orders across connected institutional venues.',
      'Smart Order Routing breaks large block trades into smaller algorithmic child orders (TWAP / VWAP) to eliminate market slippage.',
      'Zero-knowledge proofs and atomic relays guarantee that trades execute with sub-millisecond precision without counterparty risk.'
    ],
    mechanicsBreakdown: 'When a trade is triggered, the pool routes the transaction to the venue with the lowest net spread. Once executed, the acquired assets immediately settle back into the entity\'s designated custody sub-account.',
    transparencyGuarantee: 'Full execution telemetry logs with timestamped transaction hashes and slippage reports.'
  },
  allocations: {
    id: 'allocations',
    title: 'Reserve Allocations',
    category: 'Output Destination',
    badge: 'Custodial Partition',
    summary: 'Structured distribution of capital into segregated cold, warm, and treasury partitions.',
    howItWorks: [
      'Entities set customizable percentage rules for how their capital is distributed (e.g., 60% Cold Vault, 30% Staking, 10% Warm Relayer).',
      'Automated rebalancing sweeps excess liquidity from active operational accounts back into deep offline MPC cold storage.',
      'Sub-accounts remain completely partitioned so one organization\'s risk parameters never affect another.'
    ],
    mechanicsBreakdown: 'Allocations function like dedicated sub-ledgers. Capital designated for long-term reserves is held in multi-signature time-locked enclaves, while operational capital is kept in warm relayers for immediate settlement.',
    transparencyGuarantee: 'Every allocation rule requires quorum authorization from your designated institutional signers.'
  },
  rewards: {
    id: 'rewards',
    title: 'Rewards & Distributions',
    category: 'Output Destination',
    badge: 'Protocol Accrual',
    summary: 'The transparent distribution of consensus staking yields and network incentives.',
    howItWorks: [
      'Capital allocated to prime validator nodes participates directly in proof-of-stake blockchain consensus.',
      'Yield is generated natively by the underlying blockchain protocols through transaction validation and block production.',
      'Earned rewards are harvested daily and distributed directly to the entity\'s balance without intermediaries taking a spread.'
    ],
    mechanicsBreakdown: 'Staking rewards come purely from network protocol inflation and transaction fee distribution—not from lending, borrowing, or speculative rehypothecation. Your underlying principal remains in non-custodial custody.',
    transparencyGuarantee: 'Yield rates reflect pure on-chain protocol metrics with zero synthetic leverage or hidden lockups.'
  },
  fees: {
    id: 'fees',
    title: 'Network & Protocol Fees',
    category: 'Output Destination',
    badge: 'Transparent Costs',
    summary: 'A clear accounting of gas costs, custodian maintenance, and relayer fees.',
    howItWorks: [
      'Underlying blockchain network fees (gas) required to broadcast and finalize on-chain transactions.',
      'Sub-millisecond relayer routing and dark pool connectivity costs.',
      'Enterprise security SLAs including Lloyd\'s specie insurance premiums and FIPS 140-3 HSM attestation upkeep.'
    ],
    mechanicsBreakdown: 'Fees are deducted strictly on a per-transaction basis or via scheduled transparent billing tiers. There are zero hidden maker/taker markups, withdrawal penalties, or unexpected slippage buffers.',
    transparencyGuarantee: 'Itemized fee breakdown published before every transaction confirmation with verifiable receipts.'
  }
};

export const LiquidityMechanicsVisualizer: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<FlowElementId>('central-pool');
  const [activeSimulationMode, setActiveSimulationMode] = useState<'balanced' | 'high-volume' | 'staking-focused'>('balanced');
  const svgRef = useRef<SVGSVGElement | null>(null);

  const currentExplanation = EXPLANATIONS[selectedElement];

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How Capital Flows Through the Engine
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
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

        {/* Interactive Visual Canvas & Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT / TOP: INTERACTIVE FLOW DIAGRAM ================= */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0a0d16] border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* SVG Visual Flow Graph */}
            <div className="relative w-full aspect-[4/3] min-h-[380px] flex items-center justify-center select-none">
              
              {/* Dynamic Connecting SVG Paths with Flowing Packet Animation */}
              <svg 
                ref={svgRef} 
                viewBox="0 0 600 450" 
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <defs>
                  <linearGradient id="inputToPoolGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
                  </linearGradient>

                  <linearGradient id="poolToActivityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
                  </linearGradient>

                  <linearGradient id="poolToAllocGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#818CF8" stopOpacity="0.8" />
                  </linearGradient>

                  <linearGradient id="poolToRewardsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#34D399" stopOpacity="0.8" />
                  </linearGradient>

                  <linearGradient id="poolToFeesGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Path 1: Input -> Central Pool */}
                <path
                  d="M 120 225 L 230 225"
                  fill="none"
                  stroke="url(#inputToPoolGrad)"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className="animate-[dash_2s_linear_infinite]"
                />

                {/* Path 2: Central Pool -> Activity (Top Right) */}
                <path
                  d="M 370 200 Q 420 120 480 90"
                  fill="none"
                  stroke="url(#poolToActivityGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />

                {/* Path 3: Central Pool -> Allocations (Mid-Top Right) */}
                <path
                  d="M 370 215 Q 430 180 480 180"
                  fill="none"
                  stroke="url(#poolToAllocGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />

                {/* Path 4: Central Pool -> Rewards (Mid-Bottom Right) */}
                <path
                  d="M 370 235 Q 430 270 480 270"
                  fill="none"
                  stroke="url(#poolToRewardsGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />

                {/* Path 5: Central Pool -> Fees (Bottom Right) */}
                <path
                  d="M 370 250 Q 420 330 480 360"
                  fill="none"
                  stroke="url(#poolToFeesGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
              </svg>

              {/* --- 1. INPUTS NODE (Left) --- */}
              <div 
                onClick={() => setSelectedElement('inputs')}
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-32 p-3 rounded-2xl border transition-all cursor-pointer z-10 ${
                  selectedElement === 'inputs'
                    ? 'bg-[#101728] border-blue-500 shadow-xl shadow-blue-500/20 ring-2 ring-blue-500/30 scale-105'
                    : 'bg-[#080b12] border-slate-800 hover:border-slate-700 hover:bg-[#0c101c]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Coins className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-mono text-blue-400 font-bold">INFLOW</span>
                </div>
                <div className="text-xs font-bold text-white">Inputs</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Wires, On-Chain</div>
              </div>

              {/* --- 2. CENTRAL LIQUIDITY POOL NODE (Center) --- */}
              <div 
                onClick={() => setSelectedElement('central-pool')}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-3xl border-2 transition-all cursor-pointer z-20 flex flex-col items-center justify-center p-3 text-center ${
                  selectedElement === 'central-pool'
                    ? 'bg-[#11172a] border-blue-400 shadow-2xl shadow-blue-500/30 ring-4 ring-blue-500/20 scale-105'
                    : 'bg-[#0a0e1a] border-blue-500/40 hover:border-blue-400 hover:bg-[#0e1322]'
                }`}
              >
                {/* Core Water Droplet / Liquidity Pulse */}
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center mb-1.5 shadow-lg shadow-blue-500/30">
                  <Droplets className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-white tracking-wide">
                  Central Liquidity Pool
                </div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5 font-semibold">
                  $48.2B Depth
                </div>
                <span className="mt-1 text-[9px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                  MPC Segregated
                </span>
              </div>

              {/* --- 3. OUTPUT 1: ACTIVITY (Top Right) --- */}
              <div 
                onClick={() => setSelectedElement('activity')}
                className={`absolute right-4 top-8 w-36 p-3 rounded-2xl border transition-all cursor-pointer z-10 ${
                  selectedElement === 'activity'
                    ? 'bg-[#0f1a26] border-cyan-500 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-500/30 scale-105'
                    : 'bg-[#080b12] border-slate-800 hover:border-slate-700 hover:bg-[#0c101c]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Activity className="w-3 h-3" />
                  </div>
                  <span className="text-[9px] font-mono text-cyan-400">OUTPUT</span>
                </div>
                <div className="text-xs font-bold text-white">Activity</div>
                <div className="text-[10px] text-slate-400">Execution, SOR Orders</div>
              </div>

              {/* --- 4. OUTPUT 2: ALLOCATIONS (Mid-Top Right) --- */}
              <div 
                onClick={() => setSelectedElement('allocations')}
                className={`absolute right-4 top-[125px] w-36 p-3 rounded-2xl border transition-all cursor-pointer z-10 ${
                  selectedElement === 'allocations'
                    ? 'bg-[#131628] border-indigo-500 shadow-xl shadow-indigo-500/20 ring-2 ring-indigo-500/30 scale-105'
                    : 'bg-[#080b12] border-slate-800 hover:border-slate-700 hover:bg-[#0c101c]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <PieChart className="w-3 h-3" />
                  </div>
                  <span className="text-[9px] font-mono text-indigo-400">OUTPUT</span>
                </div>
                <div className="text-xs font-bold text-white">Allocations</div>
                <div className="text-[10px] text-slate-400">Cold, Warm & Reserves</div>
              </div>

              {/* --- 5. OUTPUT 3: REWARDS (Mid-Bottom Right) --- */}
              <div 
                onClick={() => setSelectedElement('rewards')}
                className={`absolute right-4 bottom-[125px] w-36 p-3 rounded-2xl border transition-all cursor-pointer z-10 ${
                  selectedElement === 'rewards'
                    ? 'bg-[#0d1c18] border-emerald-500 shadow-xl shadow-emerald-500/20 ring-2 ring-emerald-500/30 scale-105'
                    : 'bg-[#080b12] border-slate-800 hover:border-slate-700 hover:bg-[#0c101c]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Gift className="w-3 h-3" />
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400">OUTPUT</span>
                </div>
                <div className="text-xs font-bold text-white">Rewards</div>
                <div className="text-[10px] text-slate-400">Validator Staking Yield</div>
              </div>

              {/* --- 6. OUTPUT 4: FEES (Bottom Right) --- */}
              <div 
                onClick={() => setSelectedElement('fees')}
                className={`absolute right-4 bottom-8 w-36 p-3 rounded-2xl border transition-all cursor-pointer z-10 ${
                  selectedElement === 'fees'
                    ? 'bg-[#1c160b] border-amber-500 shadow-xl shadow-amber-500/20 ring-2 ring-amber-500/30 scale-105'
                    : 'bg-[#080b12] border-slate-800 hover:border-slate-700 hover:bg-[#0c101c]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Receipt className="w-3 h-3" />
                  </div>
                  <span className="text-[9px] font-mono text-amber-400">OUTPUT</span>
                </div>
                <div className="text-xs font-bold text-white">Fees</div>
                <div className="text-[10px] text-slate-400">Gas & Custody SLAs</div>
              </div>

            </div>

            {/* Bottom Instructional Hint */}
            <div className="mt-4 text-center text-xs text-slate-400 font-mono flex items-center justify-center gap-1.5 border-t border-slate-800/80 pt-3">
              <Info className="w-3.5 h-3.5 text-blue-400" />
              <span>Click any box above to inspect mechanical specifications.</span>
            </div>

          </div>

          {/* ================= RIGHT: PLAIN-LANGUAGE EXPLANATION PANEL ================= */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0c101a] border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-5">
            
            {/* Header with Selected Node Title & Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
                  {currentExplanation.badge} • {currentExplanation.category}
                </span>
                <h3 className="text-2xl font-extrabold text-white">
                  {currentExplanation.title}
                </h3>
              </div>

              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
            </div>

            {/* Summary */}
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              {currentExplanation.summary}
            </p>

            {/* How It Works Bulleted Breakdown */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Operational Mechanics:
              </div>
              {currentExplanation.howItWorks.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* Plain Language Plumbing Summary Box */}
            <div className="p-4 rounded-2xl bg-[#070910] border border-slate-800 space-y-1.5 text-xs">
              <div className="text-slate-400 font-mono uppercase text-[10px] font-semibold">
                Plumbing Transparency:
              </div>
              <p className="text-slate-300 leading-relaxed">
                {currentExplanation.mechanicsBreakdown}
              </p>
            </div>

            {/* Verification Guarantee */}
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <strong className="text-white block text-[11px] font-mono uppercase">Solvency Guarantee</strong>
                <span>{currentExplanation.transparencyGuarantee}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
