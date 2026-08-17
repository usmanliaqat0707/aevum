import React, { useMemo, useRef, useState } from 'react';
import {
  Network,
  Layers,
  Users,
  Activity,
  DollarSign,
  ShieldCheck,
  Info,
  Crosshair,
  Gauge,
  Plus,
  Minus
} from 'lucide-react';

type Branch = 'center' | 'left' | 'right';
type ActivityStatus = 'optimal' | 'high' | 'syncing';

interface GraphNode {
  id: string;
  label: string;
  tier: number;
  tierLabel: string;
  branch: Branch;
  x: number; // in the 1000 x 640 graph coordinate space
  y: number;
  deep: boolean; // belongs to the deep tiers (04–06), hidden when the branch is collapsed
  position: string;
  activity: string;
  activityStatus: ActivityStatus;
  teamSize: number;
  volumeUsd: number;
  signers: string[];
  latencyMs: number;
}

// Shared accent tokens per branch, keeping the graph and inspector visually in sync.
const BRANCH_COLOR: Record<Branch, { stroke: string; dot: string; text: string; bg: string; border: string; ring: string }> = {
  center: { stroke: '#22D3EE', dot: '#67E8F9', text: 'text-cyan-300', bg: 'bg-cyan-500/15', border: 'border-cyan-400/60', ring: 'ring-cyan-500/25' },
  left: { stroke: '#3B82F6', dot: '#60A5FA', text: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/50', ring: 'ring-blue-500/30' },
  right: { stroke: '#34D399', dot: '#6EE7B7', text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/50', ring: 'ring-emerald-500/30' },
};

const STATUS_PULSE: Record<ActivityStatus, string> = {
  optimal: 'bg-emerald-400',
  high: 'bg-blue-400',
  syncing: 'bg-amber-400',
};

// "My Position" sits at the center; the 2×6 structure (2 branches × 6 tiers) is built around it.
const GRAPH_NODES: GraphNode[] = [
  {
    id: 'center', label: 'My Position', tier: 1, tierLabel: 'Tier 01', branch: 'center',
    x: 500, y: 320, deep: false,
    position: 'Tier 01 • My Apex Multi-Sig Position',
    activity: 'Consensus Active (100% Attestation)', activityStatus: 'optimal',
    teamSize: 48, volumeUsd: 148290000,
    signers: ['CRO Key (Zurich)', 'Treasury Desk (NY)', 'FIPS Enclave (London)'], latencyMs: 14,
  },

  // Branch A (left) — OTC & Prime Custody
  { id: 'l2', label: 'Institutional Prime Branch', tier: 2, tierLabel: 'Tier 02', branch: 'left', x: 300, y: 118, deep: false,
    position: 'Tier 02 • Primary OTC & Custody Channel', activity: 'High-Volume Settlement Active', activityStatus: 'high',
    teamSize: 26, volumeUsd: 92450000, signers: ['Prime Custodian Shard #1', 'Tier-1 Relayer (Geneva)'], latencyMs: 18 },
  { id: 'l3', label: 'Zurich Vault Enclave', tier: 3, tierLabel: 'Tier 03', branch: 'left', x: 170, y: 210, deep: false,
    position: 'Tier 03 • Deep Offline MPC Vault', activity: 'Quorum Verified (2-of-3)', activityStatus: 'optimal',
    teamSize: 12, volumeUsd: 54100000, signers: ['Hardware HSM A1', 'Cold Shard Zurich'], latencyMs: 22 },
  { id: 'l4', label: 'OTC Block Desk', tier: 4, tierLabel: 'Tier 04', branch: 'left', x: 150, y: 360, deep: true,
    position: 'Tier 04 • Dark Pool Routing Desk', activity: 'TWAP Execution Streaming', activityStatus: 'high',
    teamSize: 6, volumeUsd: 28900000, signers: ['Execution Algo Gateway'], latencyMs: 31 },
  { id: 'l5', label: 'Algorithmic Arbitrage Rail', tier: 5, tierLabel: 'Tier 05', branch: 'left', x: 225, y: 500, deep: true,
    position: 'Tier 05 • Cross-Venue Settlement Rail', activity: 'Sub-second Netting Active', activityStatus: 'optimal',
    teamSize: 3, volumeUsd: 16400000, signers: ['SOR Node Alpha'], latencyMs: 38 },
  { id: 'l6', label: 'Micro-Liquidity Pod', tier: 6, tierLabel: 'Tier 06', branch: 'left', x: 370, y: 560, deep: true,
    position: 'Tier 06 • Final Endpoint Settlement Unit', activity: 'Real-Time Attested', activityStatus: 'optimal',
    teamSize: 2, volumeUsd: 8900000, signers: ['Endpoint Relayer #01'], latencyMs: 44 },

  // Branch B (right) — Treasury & Staking
  { id: 'r2', label: 'Treasury & Staking Branch', tier: 2, tierLabel: 'Tier 02', branch: 'right', x: 700, y: 118, deep: false,
    position: 'Tier 02 • Proof-of-Stake & Yield Hub', activity: 'Validator Node Consensus (99.98%)', activityStatus: 'optimal',
    teamSize: 22, volumeUsd: 55840000, signers: ['Treasury Signer #2', 'Validator Controller (Singapore)'], latencyMs: 24 },
  { id: 'r3', label: 'Singapore Validator Node', tier: 3, tierLabel: 'Tier 03', branch: 'right', x: 830, y: 210, deep: false,
    position: 'Tier 03 • Prime Consensus Validator', activity: 'Block Production (3.92% APY)', activityStatus: 'optimal',
    teamSize: 10, volumeUsd: 32200000, signers: ['Zero-Slash Slashing Shield'], latencyMs: 28 },
  { id: 'r4', label: 'Ethereum PoS Delegation', tier: 4, tierLabel: 'Tier 04', branch: 'right', x: 850, y: 360, deep: true,
    position: 'Tier 04 • Smart Contract Delegation Pool', activity: 'Daily Staking Reward Harvest', activityStatus: 'optimal',
    teamSize: 5, volumeUsd: 18600000, signers: ['Auto-Compounder Engine'], latencyMs: 35 },
  { id: 'r5', label: 'Yield Sweeper Treasury', tier: 5, tierLabel: 'Tier 05', branch: 'right', x: 775, y: 500, deep: true,
    position: 'Tier 05 • Non-Custodial Yield Sweeper', activity: 'Automated Treasury Allocator', activityStatus: 'optimal',
    teamSize: 4, volumeUsd: 11400000, signers: ['Yield Escrow Controller'], latencyMs: 40 },
  { id: 'r6', label: 'Ecosystem Partner Shard', tier: 6, tierLabel: 'Tier 06', branch: 'right', x: 630, y: 560, deep: true,
    position: 'Tier 06 • Partner Distribution Vault', activity: 'Audited Distributions', activityStatus: 'optimal',
    teamSize: 3, volumeUsd: 6200000, signers: ['Audit Feed Oracle #09'], latencyMs: 48 },
];

const EDGES: Array<{ from: string; to: string }> = [
  { from: 'center', to: 'l2' }, { from: 'l2', to: 'l3' }, { from: 'l3', to: 'l4' }, { from: 'l4', to: 'l5' }, { from: 'l5', to: 'l6' },
  { from: 'center', to: 'r2' }, { from: 'r2', to: 'r3' }, { from: 'r3', to: 'r4' }, { from: 'r4', to: 'r5' }, { from: 'r5', to: 'r6' },
];

const VIEW_W = 1000;
const VIEW_H = 640;

export const MatrixExplanationVisualizer: React.FC = () => {
  const [focusId, setFocusId] = useState<string>('center');
  const [expandedLeft, setExpandedLeft] = useState<boolean>(true);
  const [expandedRight, setExpandedRight] = useState<boolean>(true);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const nodeById = useMemo(() => {
    const map: Record<string, GraphNode> = {};
    GRAPH_NODES.forEach((n) => { map[n.id] = n; });
    return map;
  }, []);

  const isNodeVisible = (n: GraphNode) => {
    if (!n.deep) return true;
    return n.branch === 'left' ? expandedLeft : expandedRight;
  };

  const focusNode = nodeById[focusId] ?? nodeById.center;

  // Subtle 3D parallax: tilt the whole graph layer toward the cursor (edges + nodes move together).
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1400px) rotateX(${(-ny * 5).toFixed(2)}deg) rotateY(${(nx * 6).toFixed(2)}deg)`;
  };
  const handleMouseLeave = () => {
    if (stageRef.current) stageRef.current.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg)';
  };

  const pctLeft = (x: number) => `${(x / VIEW_W) * 100}%`;
  const pctTop = (y: number) => `${(y / VIEW_H) * 100}%`;

  const bothExpanded = expandedLeft && expandedRight;

  return (
    <section id="matrix-explanation-section" className="py-20 sm:py-28 bg-[#070911] relative border-t border-slate-800/80">

      {/* Background glow — clipped by an inner wrapper so it never introduces horizontal scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[560px] bg-blue-600/06 rounded-full blur-[170px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Network className="w-3.5 h-3.5" />
            ORGANIZATIONAL NETWORK ARCHITECTURE
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            2×6 Matrix Network Structure
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            A living topology of your institutional matrix — two branches spanning six tiers of depth — mapped around your own position at the center.
          </p>
        </div>

        {/* Control Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-xs font-mono text-slate-300">
              <span className="text-slate-500 uppercase">Topology:</span>{' '}
              <strong className="text-white font-bold">2 Branches × 6 Expansion Tiers</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => { setExpandedLeft(true); setExpandedRight(true); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                bothExpanded ? 'bg-blue-600 text-white border-blue-500 shadow-md' : 'bg-[#070910] text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Plus className="w-3.5 h-3.5" /> Expand Full Matrix
            </button>
            <button
              onClick={() => { setExpandedLeft(false); setExpandedRight(false); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                !expandedLeft && !expandedRight ? 'bg-blue-600 text-white border-blue-500 shadow-md' : 'bg-[#070910] text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Minus className="w-3.5 h-3.5" /> Collapse Deep Tiers
            </button>
          </div>
        </div>

        {/* ============================ FULL-WIDTH SIGNATURE GRAPH ============================ */}
        <div className="relative rounded-[28px] bg-[#0a0d16] border border-slate-800 shadow-2xl overflow-hidden">
          {/* Ambient depth glows + isometric grid */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-blue-600/12 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

          {/* Legend */}
          <div className="absolute top-4 left-5 z-30 flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-400" /> Branch A · OTC</span>
            <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Branch B · Treasury</span>
          </div>

          {/* Graph stage — fixed ratio so the 1000×640 coordinate space maps to node percentages */}
          <div
            className="relative w-full aspect-[25/16] min-h-[460px] select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1400px' }}
          >
            <div
              ref={stageRef}
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.25s ease-out', willChange: 'transform' }}
            >
              {/* -------- Glowing connection + animated flow layer -------- */}
              {/* preserveAspectRatio="none" makes SVG coords map linearly to the container,
                  so edges stay perfectly aligned with the percentage-positioned node cards. */}
              <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                {EDGES.map((e) => {
                  const from = nodeById[e.from];
                  const to = nodeById[e.to];
                  if (!isNodeVisible(from) || !isNodeVisible(to)) return null;
                  const color = BRANCH_COLOR[to.branch === 'center' ? from.branch : to.branch];
                  const active = focusId === e.from || focusId === e.to;
                  const d = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
                  const edgeId = `edge-${e.from}-${e.to}`;
                  return (
                    <g key={edgeId}>
                      {/* Wide soft glow */}
                      <path d={d} fill="none" stroke={color.stroke} strokeWidth={active ? 6 : 4} strokeOpacity={active ? 0.18 : 0.08} strokeLinecap="round" className="transition-all duration-300" />
                      {/* Bright core line */}
                      <path id={edgeId} d={d} fill="none" stroke={color.stroke} strokeWidth={active ? 2.6 : 1.6} strokeOpacity={active ? 0.95 : 0.4} strokeDasharray="7 7" strokeLinecap="round" className="transition-all duration-300" />
                      {/* Animated flow packet */}
                      <circle r={active ? 4 : 3} fill={color.dot}>
                        <animateMotion dur={active ? '1.6s' : '2.6s'} repeatCount="indefinite">
                          <mpath href={`#${edgeId}`} />
                        </animateMotion>
                      </circle>
                    </g>
                  );
                })}
              </svg>

              {/* -------- Nodes -------- */}
              {GRAPH_NODES.map((node) => {
                if (!isNodeVisible(node)) return null;
                const color = BRANCH_COLOR[node.branch];
                const isFocus = focusId === node.id;
                const isCenter = node.branch === 'center';
                const isHub = node.tier === 2; // branch entry hub (expand/collapse control)
                const expanded = node.branch === 'left' ? expandedLeft : expandedRight;

                return (
                  <button
                    key={node.id}
                    onClick={() => setFocusId(node.id)}
                    style={{ left: pctLeft(node.x), top: pctTop(node.y) }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isCenter ? 'w-40 sm:w-48 p-4' : 'w-32 sm:w-36 p-3'
                    } ${
                      isFocus
                        ? `${color.bg.replace('/15', '/10')} ${color.border} shadow-2xl ring-2 ${color.ring} scale-105`
                        : isCenter
                          ? 'bg-[#0c1526] border-cyan-500/40 hover:border-cyan-400'
                          : 'bg-[#080b12]/95 border-slate-800 hover:border-slate-700 hover:bg-[#0c101c]'
                    }`}
                  >
                    {/* Activity pulse */}
                    <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${STATUS_PULSE[node.activityStatus]} opacity-70`} />
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${STATUS_PULSE[node.activityStatus]}`} />
                    </span>

                    {isCenter ? (
                      <div className="text-center space-y-1.5">
                        <div className="mx-auto w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30">
                          <Crosshair className="w-5 h-5" />
                        </div>
                        <div className="text-sm font-extrabold text-white">My Position</div>
                        <div className="text-[10px] font-mono text-cyan-300">Tier 01 • Apex Master</div>
                        <div className="text-[10px] font-mono text-emerald-400 font-bold">${(node.volumeUsd / 1e6).toFixed(1)}M Notional</div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[9px] font-mono font-bold ${color.text}`}>{node.tierLabel}</span>
                          {isHub && (
                            <span
                              role="button"
                              tabIndex={0}
                              onClick={(ev) => {
                                ev.stopPropagation();
                                if (node.branch === 'left') setExpandedLeft((v) => !v);
                                else setExpandedRight((v) => !v);
                              }}
                              className={`w-4 h-4 rounded flex items-center justify-center ${color.bg} ${color.text} hover:brightness-125`}
                              aria-label={expanded ? 'Collapse branch' : 'Expand branch'}
                            >
                              {expanded ? <Minus className="w-2.5 h-2.5" /> : <Plus className="w-2.5 h-2.5" />}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-bold text-white leading-tight">{node.label}</div>
                        <div className="text-[10px] text-emerald-400 font-mono mt-0.5">${(node.volumeUsd / 1e6).toFixed(1)}M</div>
                        {isHub && !expanded && (
                          <div className="text-[9px] text-slate-500 font-mono mt-0.5">+3 deep tiers</div>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer hint */}
          <div className="relative z-20 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-mono border-t border-slate-800/80 py-3">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>Click any node to focus it • use +/− on a branch hub to expand or collapse its deep tiers.</span>
          </div>
        </div>

        {/* ============================ FOCUS NODE TELEMETRY ============================ */}
        <div className="mt-8 rounded-[28px] bg-[#0c101b] border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-2xl ${BRANCH_COLOR[focusNode.branch].bg} ${BRANCH_COLOR[focusNode.branch].text} border ${BRANCH_COLOR[focusNode.branch].border} flex items-center justify-center`}>
                {focusNode.branch === 'center' ? <Crosshair className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
              </div>
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${BRANCH_COLOR[focusNode.branch].text}`}>
                  Focus Node • Real-Time Telemetry
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">{focusNode.label}</h3>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <Gauge className="w-4 h-4 text-blue-400" />
              <span>Latency <strong className="text-blue-400">{focusNode.latencyMs}ms</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-[#070911] border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center justify-between">
                <span>Position</span><Layers className="w-3 h-3 text-blue-400" />
              </div>
              <div className="text-sm font-bold text-white">{focusNode.position}</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#070911] border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center justify-between">
                <span>Activity</span><Activity className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${STATUS_PULSE[focusNode.activityStatus]} animate-pulse`} />
                {focusNode.activity}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#070911] border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center justify-between">
                <span>Team Size</span><Users className="w-3 h-3 text-indigo-400" />
              </div>
              <div className="text-base font-extrabold text-white font-tabular">{focusNode.teamSize} Signers & Operators</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#070911] border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center justify-between">
                <span>Volume</span><DollarSign className="w-3 h-3 text-amber-400" />
              </div>
              <div className="text-lg font-extrabold text-white font-tabular">
                ${focusNode.volumeUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-[#070911] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
            <span className="text-slate-400">Signer Authority:</span>
            <span className="text-slate-200">{focusNode.signers.join('  •  ')}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
