import React, { useState } from 'react';
import { 
  Network, 
  Layers, 
  Users, 
  Activity, 
  DollarSign, 
  ChevronRight, 
  ChevronDown, 
  Sliders, 
  Info, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  TrendingUp,
  Maximize2,
  Minimize2,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';

interface MatrixNodeData {
  id: string;
  label: string;
  tier: number; // 1 to 6
  branch: 'left' | 'right' | 'root';
  position: string;
  activity: string;
  activityStatus: 'optimal' | 'high' | 'syncing';
  teamSize: number;
  volumeUsd: number;
  signers: string[];
  latencyMs: number;
  children?: MatrixNodeData[];
}

export const MatrixExplanationVisualizer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'simple' | 'detailed'>('detailed');
  const [hoveredNode, setHoveredNode] = useState<MatrixNodeData | null>(null);
  const [selectedNode, setSelectedNode] = useState<MatrixNodeData | null>(null);
  const [expandedTiers, setExpandedTiers] = useState<number[]>([1, 2, 3]);

  // 2x6 Matrix Hierarchy Data (2 Primary Branches x 6 Depth Tiers)
  const MATRIX_DATA: MatrixNodeData = {
    id: 'node-root',
    label: 'Apex Organization Root',
    tier: 1,
    branch: 'root',
    position: 'Tier 01 • Apex Multi-Sig Master',
    activity: 'Consensus Active (100% Attestation)',
    activityStatus: 'optimal',
    teamSize: 48,
    volumeUsd: 148290000,
    signers: ['CRO Key (Zurich)', 'Treasury Desk (NY)', 'FIPS Enclave (London)'],
    latencyMs: 14,
    children: [
      {
        id: 'node-t2-left',
        label: 'Institutional Prime Branch (L)',
        tier: 2,
        branch: 'left',
        position: 'Tier 02 • Primary OTC & Custody Channel',
        activity: 'High-Volume Settlement Active',
        activityStatus: 'high',
        teamSize: 26,
        volumeUsd: 92450000,
        signers: ['Prime Custodian Shard #1', 'Tier-1 Relayer (Geneva)'],
        latencyMs: 18,
        children: [
          {
            id: 'node-t3-l1',
            label: 'Zurich Vault Enclave',
            tier: 3,
            branch: 'left',
            position: 'Tier 03 • Deep Offline MPC Vault',
            activity: 'Quorum Verified (2-of-3)',
            activityStatus: 'optimal',
            teamSize: 12,
            volumeUsd: 54100000,
            signers: ['Hardware HSM A1', 'Cold Shard Zurich'],
            latencyMs: 22,
            children: [
              {
                id: 'node-t4-l1-1',
                label: 'OTC Block Desk',
                tier: 4,
                branch: 'left',
                position: 'Tier 04 • Dark Pool Routing Desk',
                activity: 'TWAP Execution Streaming',
                activityStatus: 'high',
                teamSize: 6,
                volumeUsd: 28900000,
                signers: ['Execution Algo Gateway'],
                latencyMs: 31,
                children: [
                  {
                    id: 'node-t5-l1-1',
                    label: 'Algorithmic Arbitrage Rail',
                    tier: 5,
                    branch: 'left',
                    position: 'Tier 05 • Cross-Venue Settlement Rail',
                    activity: 'Sub-second Netting Active',
                    activityStatus: 'optimal',
                    teamSize: 3,
                    volumeUsd: 16400000,
                    signers: ['SOR Node Alpha'],
                    latencyMs: 38,
                    children: [
                      {
                        id: 'node-t6-l1-1',
                        label: 'Micro-Liquidity Provider Pod',
                        tier: 6,
                        branch: 'left',
                        position: 'Tier 06 • Final Endpoint Settlement Unit',
                        activity: 'Real-Time Attested',
                        activityStatus: 'optimal',
                        teamSize: 2,
                        volumeUsd: 8900000,
                        signers: ['Endpoint Relayer #01'],
                        latencyMs: 44
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'node-t3-l2',
            label: 'Frankfurt Market Relayer',
            tier: 3,
            branch: 'left',
            position: 'Tier 03 • European Fast-Path Gateway',
            activity: 'Mempool Monitoring Active',
            activityStatus: 'optimal',
            teamSize: 8,
            volumeUsd: 38350000,
            signers: ['SEPA Instant Bridge Desk'],
            latencyMs: 16
          }
        ]
      },
      {
        id: 'node-t2-right',
        label: 'Treasury & Staking Branch (R)',
        tier: 2,
        branch: 'right',
        position: 'Tier 02 • Proof-of-Stake & Yield Hub',
        activity: 'Validator Node Consensus (99.98%)',
        activityStatus: 'optimal',
        teamSize: 22,
        volumeUsd: 55840000,
        signers: ['Treasury Signer #2', 'Validator Controller (Singapore)'],
        latencyMs: 24,
        children: [
          {
            id: 'node-t3-r1',
            label: 'Singapore Validator Node',
            tier: 3,
            branch: 'right',
            position: 'Tier 03 • Prime Consensus Validator',
            activity: 'Block Production (3.92% APY)',
            activityStatus: 'optimal',
            teamSize: 10,
            volumeUsd: 32200000,
            signers: ['Zero-Slash Slashing Shield'],
            latencyMs: 28,
            children: [
              {
                id: 'node-t4-r1-1',
                label: 'Ethereum PoS Delegation Pool',
                tier: 4,
                branch: 'right',
                position: 'Tier 04 • Smart Contract Delegation Pool',
                activity: 'Daily Staking Reward Harvest',
                activityStatus: 'optimal',
                teamSize: 5,
                volumeUsd: 18600000,
                signers: ['Auto-Compounder Engine'],
                latencyMs: 35,
                children: [
                  {
                    id: 'node-t5-r1-1',
                    label: 'Yield Sweeper Treasury',
                    tier: 5,
                    branch: 'right',
                    position: 'Tier 05 • Non-Custodial Yield Sweeper',
                    activity: 'Automated Treasury Allocator',
                    activityStatus: 'optimal',
                    teamSize: 4,
                    volumeUsd: 11400000,
                    signers: ['Yield Escrow Controller'],
                    latencyMs: 40,
                    children: [
                      {
                        id: 'node-t6-r1-1',
                        label: 'Ecosystem Partner Shard',
                        tier: 6,
                        branch: 'right',
                        position: 'Tier 06 • Partner Distribution Vault',
                        activity: 'Audited Distributions',
                        activityStatus: 'optimal',
                        teamSize: 3,
                        volumeUsd: 6200000,
                        signers: ['Audit Feed Oracle #09'],
                        latencyMs: 48
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'node-t3-r2',
            label: 'Tokyo Treasury Liquidity Desk',
            tier: 3,
            branch: 'right',
            position: 'Tier 03 • APAC Liquidity Buffer',
            activity: 'FX Multi-Currency Rebalancer',
            activityStatus: 'syncing',
            teamSize: 7,
            volumeUsd: 23640000,
            signers: ['APAC Wire Escrow Desk'],
            latencyMs: 29
          }
        ]
      }
    ]
  };

  const toggleTier = (tier: number) => {
    if (expandedTiers.includes(tier)) {
      setExpandedTiers(expandedTiers.filter(t => t !== tier));
    } else {
      setExpandedTiers([...expandedTiers, tier]);
    }
  };

  const activeFocus = hoveredNode || selectedNode || MATRIX_DATA;

  // 6 Tier Reference Specs
  const TIERS_META = [
    { tier: 1, name: 'Tier 01 • Apex Root', count: '1 Apex Entity', volume: '$148.3M' },
    { tier: 2, name: 'Tier 02 • Prime Channels', count: '2 Core Branches (L / R)', volume: '$148.3M' },
    { tier: 3, name: 'Tier 03 • Regional Enclaves', count: '4 Enclave Gateways', volume: '$148.3M' },
    { tier: 4, name: 'Tier 04 • Execution Desks', count: '8 Trading & Yield Pods', volume: '$98.4M' },
    { tier: 5, name: 'Tier 05 • Arbitrage Rails', count: '16 Liquidity Sweepers', volume: '$62.1M' },
    { tier: 6, name: 'Tier 06 • Settlement Endpoints', count: '32 Connected Shards', volume: '$34.8M' }
  ];

  return (
    <section id="matrix-explanation-section" className="py-20 sm:py-28 bg-[#070911] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background Architectural Glow and Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-blue-600/05 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Network className="w-3.5 h-3.5" />
            ORGANIZATIONAL NETWORK ARCHITECTURE
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            2×6 Matrix Network Structure
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            An interactive topological visualization of the institutional dual-branch matrix spanning 6 tiers of organizational depth, liquidity routing, and quorum governance.
          </p>
        </div>

        {/* View Mode Toggle & Metrics Status Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 mb-8">
          
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-xs font-mono text-slate-300">
              <span className="text-slate-500 uppercase">Topology:</span>{' '}
              <strong className="text-white font-bold">2 Branches × 6 Expansion Tiers</strong>
            </div>
          </div>

          {/* Simple View vs Detailed View Toggle */}
          <div className="flex items-center bg-[#070910] p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('simple')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'simple'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Simple View</span>
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'detailed'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Detailed View</span>
            </button>
          </div>

        </div>

        {/* Main 2-Column Visualization + Real-Time Node Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: 2x6 MATRIX VISUALIZATION ================= */}
          <div className="lg:col-span-8 rounded-3xl bg-[#0a0d16] border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {viewMode === 'simple' ? (
              /* --- SIMPLE VIEW: 6 TIER ABSTRACT FLOW WITH DIRECTIONAL ANIMATIONS --- */
              <div className="space-y-4 py-2">
                <div className="text-xs font-mono text-slate-400 mb-4 flex items-center justify-between">
                  <span>6-TIER MATRIX STRATA (2 DUAL CHANNELS)</span>
                  <span className="text-blue-400">Directional Flow: Top → Bottom</span>
                </div>

                <div className="space-y-3">
                  {TIERS_META.map((t, idx) => (
                    <div
                      key={t.tier}
                      onMouseEnter={() => {
                        setHoveredNode({
                          id: `tier-${t.tier}`,
                          label: t.name,
                          tier: t.tier,
                          branch: 'root',
                          position: `Matrix Level ${t.tier}`,
                          activity: 'Active Synchronized Quorum',
                          activityStatus: 'optimal',
                          teamSize: Math.pow(2, t.tier - 1) * 3,
                          volumeUsd: 148290000 / t.tier,
                          signers: [`Signer Ring Tier #${t.tier}`],
                          latencyMs: 12 + t.tier * 4
                        });
                      }}
                      className="group p-4 rounded-2xl bg-[#0e121f] border border-slate-800 hover:border-blue-500/60 hover:bg-[#111728] transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-mono font-bold text-xs border border-blue-500/20">
                          0{t.tier}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                            {t.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {t.count}
                          </div>
                        </div>
                      </div>

                      {/* Directional Connection Line Animation */}
                      <div className="hidden sm:flex items-center gap-3 text-xs font-mono">
                        <div className="flex items-center gap-1 text-slate-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                          <span className="text-[11px] text-blue-300">2-Way Liquidity Rail</span>
                        </div>
                        <div className="px-3 py-1 rounded-lg bg-[#070910] border border-slate-800 text-emerald-400 font-bold font-tabular">
                          {t.volume}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* --- DETAILED VIEW: EXPANDABLE 2x6 TREE WITH GLOWING NODES & CONNECTION LINES --- */
              <div className="space-y-6">
                
                {/* Visual SVG Connecting Tree Map */}
                <div className="relative py-2 select-none">
                  
                  {/* Tier 1: Apex Organization Root Node */}
                  <div className="flex justify-center mb-8">
                    <div
                      onMouseEnter={() => setHoveredNode(MATRIX_DATA)}
                      onClick={() => setSelectedNode(MATRIX_DATA)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer max-w-sm w-full text-center relative ${
                        activeFocus.id === MATRIX_DATA.id
                          ? 'bg-[#11172c] border-blue-400 shadow-2xl shadow-blue-500/30 scale-105 ring-4 ring-blue-500/20'
                          : 'bg-[#0c0f1a] border-blue-500/40 hover:border-blue-400'
                      }`}
                    >
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px] mb-1">
                        <ShieldCheck className="w-3 h-3" />
                        TIER 01 • APEX ROOT MASTER
                      </div>
                      <div className="text-sm font-extrabold text-white">
                        {MATRIX_DATA.label}
                      </div>
                      <div className="text-xs font-mono text-emerald-400 font-bold mt-1">
                        ${(MATRIX_DATA.volumeUsd / 1e6).toFixed(1)}M Total Notional
                      </div>
                    </div>
                  </div>

                  {/* Tier 2: 2 Major Binary Branches (Left vs Right) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    
                    {/* LEFT PRIMARY CHANNEL: PRIME OTC & CUSTODY */}
                    <div className="space-y-4 p-4 rounded-2xl bg-[#070a12] border border-slate-800">
                      
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="text-[11px] font-mono font-bold text-blue-400 uppercase">
                          BRANCH A • OTC & PRIME CUSTODY
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300">
                          Tier 02-06
                        </span>
                      </div>

                      {/* Left Tier 2 Node */}
                      <div
                        onMouseEnter={() => setHoveredNode(MATRIX_DATA.children![0])}
                        onClick={() => setSelectedNode(MATRIX_DATA.children![0])}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          activeFocus.id === MATRIX_DATA.children![0].id
                            ? 'bg-[#111728] border-blue-400 shadow-lg'
                            : 'bg-[#0c0f1a] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-white">
                            {MATRIX_DATA.children![0].label}
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            $92.5M
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          26 Members • High Settlement
                        </div>
                      </div>

                      {/* Left Tier 3, 4, 5, 6 Sub-Branches */}
                      <div className="pl-4 border-l-2 border-blue-500/30 space-y-2.5 ml-2">
                        
                        {/* Tier 3: Zurich Enclave */}
                        <div
                          onMouseEnter={() => setHoveredNode(MATRIX_DATA.children![0].children![0])}
                          onClick={() => setSelectedNode(MATRIX_DATA.children![0].children![0])}
                          className="p-2.5 rounded-lg bg-[#0a0d17] border border-slate-800/90 hover:border-blue-500/50 transition-all cursor-pointer"
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-white">
                            <span>Zurich Vault Enclave</span>
                            <span className="text-[10px] font-mono text-blue-400">Tier 03</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between mt-1">
                            <span>Vol: $54.1M</span>
                            <span className="text-emerald-400">2-of-3 Quorum</span>
                          </div>
                        </div>

                        {/* Tier 4: OTC Block Desk */}
                        <div
                          onMouseEnter={() => setHoveredNode(MATRIX_DATA.children![0].children![0].children![0])}
                          onClick={() => setSelectedNode(MATRIX_DATA.children![0].children![0].children![0])}
                          className="p-2.5 rounded-lg bg-[#0a0d17] border border-slate-800/90 hover:border-blue-500/50 transition-all cursor-pointer"
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-white">
                            <span>OTC Block Desk</span>
                            <span className="text-[10px] font-mono text-blue-400">Tier 04</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between mt-1">
                            <span>Vol: $28.9M</span>
                            <span className="text-blue-300">TWAP Algo</span>
                          </div>
                        </div>

                        {/* Tier 5 & 6 Deep Pods Indicator */}
                        <div
                          onMouseEnter={() => setHoveredNode(MATRIX_DATA.children![0].children![0].children![0].children![0])}
                          onClick={() => setSelectedNode(MATRIX_DATA.children![0].children![0].children![0].children![0])}
                          className="p-2.5 rounded-lg bg-[#07090f] border border-dashed border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer text-xs text-slate-300 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Tiers 05–06 (Arbitrage & Shards)</span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">$16.4M</span>
                        </div>

                      </div>

                    </div>

                    {/* RIGHT PRIMARY CHANNEL: TREASURY & STAKING */}
                    <div className="space-y-4 p-4 rounded-2xl bg-[#070a12] border border-slate-800">
                      
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase">
                          BRANCH B • TREASURY & STAKING
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                          Tier 02-06
                        </span>
                      </div>

                      {/* Right Tier 2 Node */}
                      <div
                        onMouseEnter={() => setHoveredNode(MATRIX_DATA.children![1])}
                        onClick={() => setSelectedNode(MATRIX_DATA.children![1])}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          activeFocus.id === MATRIX_DATA.children![1].id
                            ? 'bg-[#0f1c19] border-emerald-400 shadow-lg'
                            : 'bg-[#0c0f1a] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-white">
                            {MATRIX_DATA.children![1].label}
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            $55.8M
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          22 Members • Consensus 99.98%
                        </div>
                      </div>

                      {/* Right Tier 3, 4, 5, 6 Sub-Branches */}
                      <div className="pl-4 border-l-2 border-emerald-500/30 space-y-2.5 ml-2">
                        
                        {/* Tier 3: Singapore Validator */}
                        <div
                          onMouseEnter={() => setHoveredNode(MATRIX_DATA.children![1].children![0])}
                          onClick={() => setSelectedNode(MATRIX_DATA.children![1].children![0])}
                          className="p-2.5 rounded-lg bg-[#0a0d17] border border-slate-800/90 hover:border-emerald-500/50 transition-all cursor-pointer"
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-white">
                            <span>Singapore Validator Node</span>
                            <span className="text-[10px] font-mono text-emerald-400">Tier 03</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between mt-1">
                            <span>Vol: $32.2M</span>
                            <span className="text-emerald-400 font-bold">3.92% APY</span>
                          </div>
                        </div>

                        {/* Tier 4: PoS Delegation Pool */}
                        <div
                          onMouseEnter={() => setHoveredNode(MATRIX_DATA.children![1].children![0].children![0])}
                          onClick={() => setSelectedNode(MATRIX_DATA.children![1].children![0].children![0])}
                          className="p-2.5 rounded-lg bg-[#0a0d17] border border-slate-800/90 hover:border-emerald-500/50 transition-all cursor-pointer"
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-white">
                            <span>Ethereum PoS Delegation</span>
                            <span className="text-[10px] font-mono text-emerald-400">Tier 04</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between mt-1">
                            <span>Vol: $18.6M</span>
                            <span className="text-emerald-300">Daily Harvest</span>
                          </div>
                        </div>

                        {/* Tier 5 & 6 Staking Endpoints Indicator */}
                        <div
                          onMouseEnter={() => setHoveredNode(MATRIX_DATA.children![1].children![0].children![0].children![0])}
                          onClick={() => setSelectedNode(MATRIX_DATA.children![1].children![0].children![0].children![0])}
                          className="p-2.5 rounded-lg bg-[#07090f] border border-dashed border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer text-xs text-slate-300 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Tiers 05–06 (Sweepers & Oracles)</span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">$11.4M</span>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* Bottom Instructional Note */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-400" />
                Hover or click any node to inspect position, activity, team size, and volume.
              </span>
              <span className="text-slate-500 hidden sm:inline">2×6 Architecture Verified</span>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: HOVER / FOCUS NODE TELEMETRY INSPECTOR ================= */}
          <div className="lg:col-span-4 rounded-3xl bg-[#0c101b] border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-5">
            
            {/* Inspector Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
                  REAL-TIME NODE TELEMETRY
                </span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  {activeFocus.label}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
            </div>

            {/* 4 Required Hover Metrics Cards: Position, Activity, Team Size, Volume */}
            <div className="space-y-3">
              
              {/* 1. Position */}
              <div className="p-3 rounded-xl bg-[#070911] border border-slate-800 space-y-1">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Position</span>
                  <Layers className="w-3 h-3 text-blue-400" />
                </div>
                <div className="text-sm font-bold text-white">
                  {activeFocus.position}
                </div>
              </div>

              {/* 2. Activity */}
              <div className="p-3 rounded-xl bg-[#070911] border border-slate-800 space-y-1">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Activity</span>
                  <Activity className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {activeFocus.activity}
                </div>
              </div>

              {/* 3. Team Size */}
              <div className="p-3 rounded-xl bg-[#070911] border border-slate-800 space-y-1">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Team Size</span>
                  <Users className="w-3 h-3 text-indigo-400" />
                </div>
                <div className="text-base font-extrabold text-white font-tabular">
                  {activeFocus.teamSize} Authorized Signers & Operators
                </div>
              </div>

              {/* 4. Volume */}
              <div className="p-3 rounded-xl bg-[#070911] border border-slate-800 space-y-1">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Volume</span>
                  <DollarSign className="w-3 h-3 text-amber-400" />
                </div>
                <div className="text-lg font-extrabold text-white font-tabular">
                  ${activeFocus.volumeUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

            </div>

            {/* Additional Institutional Quorum & Latency Specs */}
            <div className="p-3.5 rounded-2xl bg-[#070911] border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-400">
                <span>Network Latency:</span>
                <span className="text-blue-400 font-bold">{activeFocus.latencyMs} ms</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Signer Authority:</span>
                <span className="text-slate-200 truncate max-w-[170px] text-right">
                  {activeFocus.signers.join(', ')}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
