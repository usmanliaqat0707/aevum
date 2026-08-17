import React, { useEffect, useRef, useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Layers, 
  Cpu, 
  Activity, 
  Zap, 
  RotateCcw,
  Play,
  Pause,
  Server,
  TrendingUp,
  Wallet,
  Globe2,
  ArrowUpRight,
  Database,
  Radio,
  CheckCircle2,
  Fingerprint,
  Maximize2
} from 'lucide-react';
import gsap from 'gsap';

interface HeroVisualCoreProps {
  onInteractCore?: () => void;
}

type ModeFilter = 'all' | 'money' | 'network' | 'security' | 'data';

interface NetworkNode {
  id: string;
  name: string;
  category: 'money' | 'network' | 'security' | 'data';
  tag: string;
  value: string;
  metric: string;
  x: number; // percentage in canvas coordinate system (0 to 100)
  y: number;
  icon: React.ElementType;
  accent: string;
  accentBorder: string;
  accentGlow: string;
  status: string;
}

export const HeroVisualCore: React.FC<HeroVisualCoreProps> = ({ onInteractCore }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const coreElementRef = useRef<HTMLDivElement | null>(null);
  
  const [activeFilter, setActiveFilter] = useState<ModeFilter>('all');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [coreRotation, setCoreRotation] = useState({ x: 12, y: -18 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTelemetryIndex, setActiveTelemetryIndex] = useState(0);

  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    sourceIndex: number;
    targetIndex: number;
    t: number;
    speed: number;
    size: number;
    color: string;
    pulse: number;
    payloadText?: string;
    category: 'money' | 'network' | 'security' | 'data';
  }>>([]);

  // Architectural Network Nodes
  const NODES: NetworkNode[] = [
    {
      id: 'node-wallet',
      name: 'MPC Vault Enclave',
      category: 'money',
      tag: 'MONEY • CUSTODY',
      value: '$4.82B Tier-1 Assets',
      metric: 'Keyless 3-of-4 Quorum',
      x: 18,
      y: 28,
      icon: Wallet,
      accent: 'text-amber-400',
      accentBorder: 'border-amber-500/40 hover:border-amber-400',
      accentGlow: 'rgba(245, 158, 11, 0.15)',
      status: 'Secured'
    },
    {
      id: 'node-routing',
      name: 'Global Liquidity SOR',
      category: 'network',
      tag: 'NETWORK • ROUTING',
      value: '45 Connected Venues',
      metric: '0.8 bps Slippage Avg',
      x: 82,
      y: 26,
      icon: Zap,
      accent: 'text-blue-400',
      accentBorder: 'border-blue-500/40 hover:border-blue-400',
      accentGlow: 'rgba(59, 130, 246, 0.15)',
      status: 'Active Matrix'
    },
    {
      id: 'node-security',
      name: 'FIPS 140-3 HSM Shield',
      category: 'security',
      tag: 'SECURITY • ATTESTATION',
      value: 'Zero-Knowledge MPC',
      metric: 'Continuous Merkle Proof',
      x: 20,
      y: 74,
      icon: ShieldCheck,
      accent: 'text-emerald-400',
      accentBorder: 'border-emerald-500/40 hover:border-emerald-400',
      accentGlow: 'rgba(16, 185, 129, 0.15)',
      status: 'Audited'
    },
    {
      id: 'node-telemetry',
      name: 'Settlement Data Bus',
      category: 'data',
      tag: 'DATA • TELEMETRY',
      value: '18ms Finality Tick',
      metric: 'FISA & TRP V2 Relay',
      x: 80,
      y: 76,
      icon: Database,
      accent: 'text-cyan-400',
      accentBorder: 'border-cyan-500/40 hover:border-cyan-400',
      accentGlow: 'rgba(6, 182, 212, 0.15)',
      status: 'Streaming'
    }
  ];

  // Dynamic Telemetry Feed updates
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTelemetryIndex((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Interactive 3D parallax on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: nx, y: ny });
    setCoreRotation({
      x: 12 - ny * 24,
      y: -18 + nx * 32
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setCoreRotation({ x: 12, y: -18 });
  };

  // High Performance Canvas Rendering Engine: Fluid Liquidity & Particle Mesh
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height || 640;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Node pixel positions calculation
    const getNodePixelCoords = () => {
      const cx = width * 0.5;
      const cy = height * 0.5;
      return [
        { x: width * 0.20, y: height * 0.28, category: 'money' },     // Wallet
        { x: width * 0.80, y: height * 0.26, category: 'network' },   // Routing
        { x: width * 0.22, y: height * 0.74, category: 'security' },  // HSM Security
        { x: width * 0.78, y: height * 0.76, category: 'data' },      // Telemetry
      ];
    };

    // Initialize 80 fluid particles with diverse categories
    const colors = {
      money: ['#F59E0B', '#FCD34D', '#FBBF24'],
      network: ['#3B82F6', '#60A5FA', '#93C5FD'],
      security: ['#10B981', '#34D399', '#6EE7B7'],
      data: ['#06B6D4', '#38BDF8', '#818CF8']
    };

    const categories: Array<'money' | 'network' | 'security' | 'data'> = ['money', 'network', 'security', 'data'];

    particlesRef.current = Array.from({ length: 150 }, (_, i) => {
      const cat = categories[i % categories.length];
      const pal = colors[cat];
      return {
        x: width * 0.5,
        y: height * 0.5,
        sourceIndex: Math.floor(Math.random() * 4),
        targetIndex: -1, // -1 means central core
        t: Math.random(),
        speed: 0.0035 + Math.random() * 0.0065,
        size: 2.0 + Math.random() * 2.8,
        color: pal[i % pal.length],
        pulse: Math.random() * Math.PI * 2,
        category: cat
      };
    });

    let time = 0;

    const render = () => {
      time += 0.018;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const nodes = getNodePixelCoords();

      // 1. Draw Architectural Orbital Grid & Concentric Rings
      ctx.save();
      ctx.lineWidth = 1;

      // Outer boundary ellipse
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.07)';
      ctx.beginPath();
      ctx.ellipse(cx, cy, width * 0.46, height * 0.44, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Prominent glowing SECURITY RING (bright, animated) around the core
      ctx.save();
      ctx.shadowColor = 'rgba(16, 185, 129, 0.6)';
      ctx.shadowBlur = 18;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.55)';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([14, 10]);
      ctx.beginPath();
      ctx.ellipse(cx, cy, width * 0.34, height * 0.32, time * 0.12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      // Counter-rotating thin companion ring for depth
      ctx.shadowBlur = 8;
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, width * 0.30, height * 0.285, -time * 0.18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Inner fast spinning telemetry rings
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.ellipse(cx, cy, width * 0.21, height * 0.19, -time * 0.24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 2. Draw Vector Flowing Curved Energy Lines (Core to Nodes & Node-to-Node)
      nodes.forEach((n, idx) => {
        const isDimmed = activeFilter !== 'all' && activeFilter !== n.category;
        const alphaMultiplier = isDimmed ? 0.15 : 1.0;

        // Curved Bezier from Center Core to Node
        ctx.save();
        const grad = ctx.createLinearGradient(cx, cy, n.x, n.y);
        if (n.category === 'money') {
          grad.addColorStop(0, `rgba(59, 130, 246, ${0.4 * alphaMultiplier})`);
          grad.addColorStop(1, `rgba(245, 158, 11, ${0.8 * alphaMultiplier})`);
        } else if (n.category === 'network') {
          grad.addColorStop(0, `rgba(59, 130, 246, ${0.4 * alphaMultiplier})`);
          grad.addColorStop(1, `rgba(59, 130, 246, ${0.8 * alphaMultiplier})`);
        } else if (n.category === 'security') {
          grad.addColorStop(0, `rgba(59, 130, 246, ${0.4 * alphaMultiplier})`);
          grad.addColorStop(1, `rgba(16, 185, 129, ${0.8 * alphaMultiplier})`);
        } else {
          grad.addColorStop(0, `rgba(59, 130, 246, ${0.4 * alphaMultiplier})`);
          grad.addColorStop(1, `rgba(6, 182, 212, ${0.8 * alphaMultiplier})`);
        }

        // Control point for smooth organic curve
        const cpx = (cx + n.x) * 0.5 + (idx % 2 === 0 ? -40 : 40) * Math.sin(time + idx);
        const cpy = (cy + n.y) * 0.5 + (idx < 2 ? -30 : 30);

        // Ambient glowing wide path
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo(cpx, cpy, n.x, n.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = isDimmed ? 1.5 : 4;
        ctx.shadowColor = n.category === 'money' ? 'rgba(245,158,11,0.5)'
          : n.category === 'network' ? 'rgba(59,130,246,0.5)'
          : n.category === 'security' ? 'rgba(16,185,129,0.5)'
          : 'rgba(6,182,212,0.5)';
        ctx.shadowBlur = isDimmed ? 0 : 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // High-energy glow pass
        if (!isDimmed) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.quadraticCurveTo(cpx, cpy, n.x, n.y);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Cross-connections between satellite nodes for mesh architecture
        const nextNode = nodes[(idx + 1) % nodes.length];
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(nextNode.x, nextNode.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * alphaMultiplier})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      });

      // 3. Render High Density Dynamic Transaction Particles
      particlesRef.current.forEach((p) => {
        const isDimmed = activeFilter !== 'all' && activeFilter !== p.category;
        if (isPlaying) {
          p.t += p.speed;
          if (p.t > 1) {
            p.t = 0;
            p.sourceIndex = Math.floor(Math.random() * nodes.length);
          }
        }

        const node = nodes[p.sourceIndex] || nodes[0];
        const t = p.t;

        // Quadratic trajectory (alternating inward and outward flow)
        const isInward = p.sourceIndex % 2 === 0;
        const p0 = isInward ? { x: node.x, y: node.y } : { x: cx, y: cy };
        const p2 = isInward ? { x: cx, y: cy } : { x: node.x, y: node.y };
        const cpx = (p0.x + p2.x) * 0.5 + (p.sourceIndex % 2 === 0 ? -35 : 35);
        const cpy = (p0.y + p2.y) * 0.5 + (p.sourceIndex < 2 ? -25 : 25);

        // Interpolate point
        const px = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * cpx + t * t * p2.x;
        const py = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * cpy + t * t * p2.y;

        p.pulse += 0.06;
        const curSize = (p.size + Math.sin(p.pulse) * 0.6) * (isDimmed ? 0.6 : 1);

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, curSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = isDimmed ? 0.2 : 0.9;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isDimmed ? 2 : 10;
        ctx.fill();

        // Particle stream light tail
        const prevT = Math.max(0, t - 0.04);
        const tx = (1 - prevT) * (1 - prevT) * p0.x + 2 * (1 - prevT) * prevT * cpx + prevT * prevT * p2.x;
        const ty = (1 - prevT) * (1 - prevT) * p0.y + 2 * (1 - prevT) * prevT * cpy + prevT * prevT * p2.y;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = isDimmed ? 0.08 : 0.4;
        ctx.lineWidth = curSize * 0.8;
        ctx.stroke();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [activeFilter, isPlaying]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[600px] sm:h-[720px] lg:h-[780px] select-none flex items-center justify-center overflow-hidden rounded-[32px] bg-[#06080e]/90 border border-slate-800 shadow-2xl backdrop-blur-md"
    >
      
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[360px] h-[360px] bg-amber-500/12 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[360px] h-[360px] bg-emerald-500/12 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Header Bar with Live Institutional Telemetry */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-[#090d18]/90 border border-slate-800/80 backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              INFRASTRUCTURE TOPOLOGY
            </span>
          </div>
          <div className="hidden sm:block h-3.5 w-px bg-slate-800" />
          <span className="hidden sm:inline text-[11px] font-mono text-slate-400">
            Money → Network → Security → Data
          </span>
        </div>

        {/* Mode Interactive Filter Pill Tabs */}
        <div className="flex items-center bg-[#06080f] p-0.5 rounded-xl border border-slate-800/90">
          {(['all', 'money', 'network', 'security', 'data'] as ModeFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-2.5 py-1 text-[10px] font-mono font-semibold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas Stream Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10" 
      />

      {/* ========================================================================= */}
      {/* CENTRAL GLOWING 3D CORE (Isometric Layered Hyper-Prism Engine)           */}
      {/* ========================================================================= */}
      <div 
        ref={coreElementRef}
        onClick={onInteractCore}
        style={{
          transform: `perspective(1000px) rotateX(${coreRotation.x}deg) rotateY(${coreRotation.y}deg)`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="relative z-20 group cursor-pointer"
      >
        {/* Ambient Pulsing Aura */}
        <div className="absolute -inset-20 rounded-full bg-blue-600/25 blur-3xl group-hover:bg-blue-500/40 transition-all duration-700 animate-pulse" />
        <div className="absolute -inset-12 rounded-full bg-emerald-500/15 blur-2xl group-hover:bg-emerald-400/25 transition-all duration-700" />

        {/* External Rotating Cryptographic Calibration Rings (Security halo) */}
        <div className="absolute -inset-12 rounded-full border-2 border-emerald-400/30 border-dashed animate-[spin_20s_linear_infinite] pointer-events-none shadow-[0_0_40px_rgba(16,185,129,0.25)]" />
        <div className="absolute -inset-16 rounded-full border border-blue-500/25 border-dashed animate-[spin_28s_linear_infinite_reverse] pointer-events-none" />
        <div className="absolute -inset-24 rounded-full border border-slate-700/30 animate-[spin_44s_linear_infinite] pointer-events-none" />

        {/* 3D Multi-Layered Central Isometric Cube / Crystalline Enclave */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-[36px] bg-gradient-to-br from-[#12192e] via-[#090d19] to-[#04060b] border-2 border-blue-500/60 p-2.5 shadow-2xl backdrop-blur-2xl group-hover:border-blue-400 group-hover:scale-105 transition-all duration-500 ring-8 ring-blue-500/10 flex items-center justify-center">
          
          {/* Inner Crystalline Chamber */}
          <div className="w-full h-full rounded-[24px] bg-[#080c18]/90 border border-slate-700/80 p-4 flex flex-col items-center justify-between text-center relative overflow-hidden">
            
            {/* Prismatic Light Gleam */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Core Header Monospace Badges */}
            <div className="w-full flex items-center justify-between text-[10px] font-mono">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                MPC-CMP
              </span>
              <span className="text-blue-400 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                FIPS 140-3
              </span>
            </div>

            {/* Central Glowing Icon / Quantum Lock Core */}
            <div className="relative my-1">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-500 to-emerald-500 p-0.5 shadow-xl shadow-blue-500/40 flex items-center justify-center group-hover:rotate-6 transition-transform duration-500">
                <div className="w-full h-full bg-[#070a14] rounded-[18px] flex items-center justify-center relative">
                  <Cpu className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#070a14] animate-pulse" />
                </div>
              </div>
            </div>

            {/* Engine Identification & Live Quorum Status */}
            <div className="space-y-0.5">
              <div className="text-xs sm:text-sm font-extrabold text-white tracking-wider">
                AEVUM QUANTUM CORE
              </div>
              <div className="text-[10px] text-blue-300 font-mono flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>3-of-4 Quorum Signed</span>
              </div>
            </div>

          </div>

          {/* Floating Live Shard Tags Attached to Core */}
          <div className="absolute -top-3.5 -left-4 px-3 py-1 rounded-xl bg-[#0a0f1e]/95 border border-blue-500/40 backdrop-blur-md shadow-xl text-[10px] font-mono text-slate-200 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-amber-400" />
            <span className="text-amber-300 font-bold">0x9F41...E8</span>
          </div>

          <div className="absolute -bottom-3.5 -right-4 px-3 py-1 rounded-xl bg-[#0a0f1e]/95 border border-emerald-500/40 backdrop-blur-md shadow-xl text-[10px] font-mono text-slate-200 flex items-center gap-1.5">
            <Fingerprint className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-300 font-bold">ECDSA + Ed25519</span>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* SATELLITE NETWORK NODES (Money, Network, Security, Data)                  */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-20">
        
        {/* Node 1: WALLET / MONEY (Top Left) */}
        <div 
          onMouseEnter={() => setHoveredNode('node-wallet')}
          onMouseLeave={() => setHoveredNode(null)}
          className={`absolute top-[14%] left-[4%] sm:left-[8%] p-3 sm:p-3.5 rounded-2xl bg-[#0a0e1a]/95 border backdrop-blur-xl shadow-2xl transition-all duration-300 pointer-events-auto hover:scale-105 cursor-pointer max-w-[210px] ${
            activeFilter === 'all' || activeFilter === 'money'
              ? 'border-amber-500/40 opacity-100'
              : 'border-slate-800 opacity-30'
          }`}
          style={{ boxShadow: `0 10px 30px rgba(245, 158, 11, 0.12)` }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                MONEY • CUSTODY
              </div>
              <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                $4.82B Reserves
              </div>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-800/80 pt-1.5">
            <span>Threshold Quorum:</span>
            <span className="text-amber-300 font-bold">3/4 MPC Active</span>
          </div>
        </div>

        {/* Node 2: NETWORK / ROUTING (Top Right) */}
        <div 
          onMouseEnter={() => setHoveredNode('node-routing')}
          onMouseLeave={() => setHoveredNode(null)}
          className={`absolute top-[13%] right-[4%] sm:right-[8%] p-3 sm:p-3.5 rounded-2xl bg-[#0a0e1a]/95 border backdrop-blur-xl shadow-2xl transition-all duration-300 pointer-events-auto hover:scale-105 cursor-pointer max-w-[210px] ${
            activeFilter === 'all' || activeFilter === 'network'
              ? 'border-blue-500/40 opacity-100'
              : 'border-slate-800 opacity-30'
          }`}
          style={{ boxShadow: `0 10px 30px rgba(59, 130, 246, 0.12)` }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                NETWORK • ROUTING
              </div>
              <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                45 Venues Matrix
              </div>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-800/80 pt-1.5">
            <span>Slippage Optim:</span>
            <span className="text-blue-300 font-bold">&lt; 0.8 bps</span>
          </div>
        </div>

        {/* Node 3: SECURITY / HSM ATTESTATION (Bottom Left) */}
        <div 
          onMouseEnter={() => setHoveredNode('node-security')}
          onMouseLeave={() => setHoveredNode(null)}
          className={`absolute bottom-[14%] left-[4%] sm:left-[8%] p-3 sm:p-3.5 rounded-2xl bg-[#0a0e1a]/95 border backdrop-blur-xl shadow-2xl transition-all duration-300 pointer-events-auto hover:scale-105 cursor-pointer max-w-[210px] ${
            activeFilter === 'all' || activeFilter === 'security'
              ? 'border-emerald-500/40 opacity-100'
              : 'border-slate-800 opacity-30'
          }`}
          style={{ boxShadow: `0 10px 30px rgba(16, 185, 129, 0.12)` }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                SECURITY • SHIELD
              </div>
              <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                FIPS 140-3 HSM
              </div>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-800/80 pt-1.5">
            <span>Continuous Proof:</span>
            <span className="text-emerald-300 font-bold">Merkle Validated</span>
          </div>
        </div>

        {/* Node 4: DATA / TELEMETRY (Bottom Right) */}
        <div 
          onMouseEnter={() => setHoveredNode('node-telemetry')}
          onMouseLeave={() => setHoveredNode(null)}
          className={`absolute bottom-[14%] right-[4%] sm:right-[8%] p-3 sm:p-3.5 rounded-2xl bg-[#0a0e1a]/95 border backdrop-blur-xl shadow-2xl transition-all duration-300 pointer-events-auto hover:scale-105 cursor-pointer max-w-[210px] ${
            activeFilter === 'all' || activeFilter === 'data'
              ? 'border-cyan-500/40 opacity-100'
              : 'border-slate-800 opacity-30'
          }`}
          style={{ boxShadow: `0 10px 30px rgba(6, 182, 212, 0.12)` }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                DATA • FINALITY
              </div>
              <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                18ms Settlement
              </div>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-800/80 pt-1.5">
            <span>Standard Compliance:</span>
            <span className="text-cyan-300 font-bold">FISA & TRP V2</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* BOTTOM FLOATING STATUS BAR & PLAYBACK CONTROLS                           */}
      {/* ========================================================================= */}
      <div className="absolute bottom-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 px-4 py-2 rounded-2xl bg-[#090d18]/90 border border-slate-800/80 backdrop-blur-xl text-xs font-mono text-slate-300 shadow-xl">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-white transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Stream Status:</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>LIVE 85 PACKETS/SEC</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
          <span>Active Rail: <strong className="text-white">Zurich ↔ New York ↔ Singapore</strong></span>
          <span className="text-slate-600">•</span>
          <span className="text-blue-400 font-bold">FIPS Level 4 Boundary</span>
        </div>
      </div>

    </div>
  );
};
