import React, { useState, useEffect, useRef } from 'react';
import { 
  Wallet, 
  Network, 
  BarChart3, 
  Lock, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  Users, 
  Activity, 
  Zap, 
  CheckCircle2, 
  KeyRound, 
  Layers, 
  ChevronRight,
  Server,
  Cpu,
  Globe2,
  DollarSign,
  ArrowUpRight,
  Database,
  Radio,
  Fingerprint,
  RefreshCw,
  Sparkles,
  Maximize2
} from 'lucide-react';
import {
  WalletIllustration,
  NetworkIllustration,
  TransparencyIllustration
} from './illustrations/ArchitecturalIllustrations';

interface PlatformOverviewProps {
  onOpenAccessRequest: () => void;
}

type CapabilityId = 'wallet' | 'network' | 'analytics';

/**
 * Renders the large hero-quality 3D product illustration for a capability tile,
 * drawn from the shared architectural illustration family for a consistent visual DNA.
 */
const renderCapabilityIllustration = (id: CapabilityId) => {
  switch (id) {
    case 'wallet':
      return <WalletIllustration size="md" />;
    case 'network':
      return <NetworkIllustration size="md" />;
    case 'analytics':
      return <TransparencyIllustration size="md" />;
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
};

export const PlatformOverview: React.FC<PlatformOverviewProps> = ({
  onOpenAccessRequest,
}) => {
  const [activeCapability, setActiveCapability] = useState<CapabilityId>('wallet');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  
  // Interactive states inside the 3D visual stage
  const [walletQuorumActive, setWalletQuorumActive] = useState<number>(3); // 3 of 4
  const [networkSelectedNode, setNetworkSelectedNode] = useState<string>('cro');
  const [analyticsMetric, setAnalyticsMetric] = useState<'liquidity' | 'latency' | 'yield'>('liquidity');
  
  // Canvas Ref for subtle ambient flow particles
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto-cycle through capabilities if user hasn't manually interacted
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveCapability((prev) => {
        if (prev === 'wallet') return 'network';
        if (prev === 'network') return 'analytics';
        return 'wallet';
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Ambient fluid stream in the 3D stage canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 460);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI * 2
    }));

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle orbital rings
      const cx = width * 0.5;
      const cy = height * 0.5;
      
      ctx.strokeStyle = activeCapability === 'wallet' 
        ? 'rgba(245, 158, 11, 0.08)' 
        : activeCapability === 'network'
        ? 'rgba(59, 130, 246, 0.08)'
        : 'rgba(6, 182, 212, 0.08)';
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      ctx.ellipse(cx, cy, width * 0.38, height * 0.38, time * 0.05, 0, Math.PI * 2);
      ctx.stroke();

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.04;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dynamicAlpha = p.alpha + Math.sin(p.pulse) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = activeCapability === 'wallet'
          ? `rgba(245, 158, 11, ${Math.max(0.1, dynamicAlpha * 0.8)})`
          : activeCapability === 'network'
          ? `rgba(59, 130, 246, ${Math.max(0.1, dynamicAlpha * 0.8)})`
          : `rgba(6, 182, 212, ${Math.max(0.1, dynamicAlpha * 0.8)})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeCapability]);

  const capabilities = [
    {
      id: 'wallet' as CapabilityId,
      name: 'Wallet',
      badge: 'KEYLESS CUSTODY & RESERVES',
      shortDesc: 'MPC-CMP zero-knowledge vaults with segregated bankruptcy-remote balance tracking.',
      icon: Wallet,
      color: 'amber',
      accentColor: 'text-amber-400',
      accentBg: 'bg-amber-500/10',
      accentBorder: 'border-amber-500/30',
      activeRing: 'ring-amber-500/20',
      points: [
        'Multi-Party Computation with keyless 3-of-4 quorum signing',
        'Direct on-chain balance verification & continuous Merkle proofs',
        'Hardware security enclaves across Zurich, New York, and Singapore'
      ]
    },
    {
      id: 'network' as CapabilityId,
      name: 'Network',
      badge: 'QUORUM GOVERNANCE & ROUTING',
      shortDesc: 'Organizational hierarchy multi-sig policies paired with automated smart order routing.',
      icon: Network,
      color: 'blue',
      accentColor: 'text-blue-400',
      accentBg: 'bg-blue-500/10',
      accentBorder: 'border-blue-500/30',
      activeRing: 'ring-blue-500/20',
      points: [
        'Multi-tier role management with automated Travel Rule V2 compliance',
        'Smart Order Routing (SOR) across 45 tier-1 institutional venues',
        'Policy firewalls with hardware biometric velocity limits'
      ]
    },
    {
      id: 'analytics' as CapabilityId,
      name: 'Analytics',
      badge: 'REAL-TIME EXECUTION & TELEMETRY',
      shortDesc: 'High-frequency fill telemetry, slippage reduction benchmarks, and continuous proof logs.',
      icon: BarChart3,
      color: 'cyan',
      accentColor: 'text-cyan-400',
      accentBg: 'bg-cyan-500/10',
      accentBorder: 'border-cyan-500/30',
      activeRing: 'ring-cyan-500/20',
      points: [
        'Sub-millisecond execution tick logs & slippage savings analyzer',
        'Real-time automated staking yield streams and collateral health',
        'Exportable ISO 27001 / SOC 2 Type II audit telemetry'
      ]
    }
  ];

  const currentCap = capabilities.find(c => c.id === activeCapability)!;

  return (
    <section id="platform-overview-section" className="py-24 sm:py-32 relative bg-[#080a11] overflow-hidden">
      
      {/* Background Architectural Grid Lines & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-blue-600/06 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. SECTION TITLE HEADER                                                  */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Layers className="w-3.5 h-3.5" />
            UNIFIED INSTITUTIONAL SYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Platform Architecture<br className="hidden sm:inline" /> & Core Capabilities
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            A cohesive three-pillar architecture engineered for zero-compromise institutional digital asset management, cryptographic policy governance, and real-time execution telemetry.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAJOR 3D HERO PRODUCT VISUALIZATION STAGE                              */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl bg-[#0b0e1a]/95 border border-slate-800 shadow-2xl p-6 sm:p-8 lg:p-10 mb-12 overflow-hidden">
          
          {/* Ambient Lighting Accents */}
          <div className={`absolute top-0 right-0 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 ${
            activeCapability === 'wallet' 
              ? 'bg-amber-500/10' 
              : activeCapability === 'network' 
              ? 'bg-blue-600/15' 
              : 'bg-cyan-500/12'
          }`} />

          {/* Top Control Bar of Visual Stage */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-800/80 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full flex items-center justify-center ${
                activeCapability === 'wallet' ? 'bg-amber-400' : activeCapability === 'network' ? 'bg-blue-400' : 'bg-cyan-400'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#080a11] animate-ping" />
              </div>
              <span className="font-bold text-white uppercase tracking-wider">
                CORE CAPABILITY SHOWCASE // {currentCap.name.toUpperCase()}
              </span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="hidden sm:inline text-slate-400 font-sans">
                {currentCap.badge}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 hidden sm:inline">Simulation mode:</span>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-2.5 py-1 rounded-lg border text-[10px] uppercase font-bold tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer ${
                  autoRotate
                    ? 'bg-blue-600/20 text-blue-300 border-blue-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <RefreshCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
                <span>{autoRotate ? 'Auto-Cycle ON' : 'Paused'}</span>
              </button>
            </div>
          </div>

          {/* Canvas Background for Particle Geometry */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

          {/* Visual Showcase Stage Body */}
          <div className="relative z-10 min-h-[420px] sm:min-h-[480px] flex items-center justify-center">

            {/* ========================================================================= */}
            {/* CAPABILITY 1: WALLET 3D ARCHITECTURAL VISUALIZATION                       */}
            {/* ========================================================================= */}
            {activeCapability === 'wallet' && (
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-500">
                
                {/* Left: 3D Vault Isometric Stage */}
                <div className="lg:col-span-7 flex flex-col items-center justify-center relative py-6">
                  
                  {/* Central Large 3D Kinetic Vault Core */}
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-[40px] bg-gradient-to-br from-[#1b233a] via-[#0d1222] to-[#060912] border-2 border-amber-500/50 p-3 shadow-2xl shadow-amber-500/10 flex items-center justify-center group">
                    
                    {/* Concentric Rotating Outer Security Rings */}
                    <div className="absolute -inset-6 rounded-full border border-amber-500/20 border-dashed animate-[spin_40s_linear_infinite] pointer-events-none" />
                    <div className="absolute -inset-12 rounded-full border border-slate-700/30 animate-[spin_55s_linear_infinite_reverse] pointer-events-none" />

                    {/* Inner Steel Chamber with MPC Nodes */}
                    <div className="w-full h-full rounded-[32px] bg-[#090d18] border border-slate-700/80 p-5 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-inner">
                      
                      <div className="w-full flex items-center justify-between text-[10px] font-mono">
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          KEYLESS VAULT
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {walletQuorumActive}-of-4 SIGNED
                        </span>
                      </div>

                      {/* Floating Keyless Shard Graphic */}
                      <div className="relative my-2">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-400/10 border border-amber-500/40 flex items-center justify-center shadow-xl shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                          <Wallet className="w-10 h-10 text-amber-400" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm font-extrabold text-white">
                          $4,829,148,000.00
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Audited Segregated Reserves
                        </div>
                      </div>

                    </div>

                    {/* Floating Quorum Node Shard 1 (Top Left) */}
                    <div className="absolute -top-4 -left-6 sm:-left-10 px-3 py-1.5 rounded-xl bg-[#0d1222]/95 border border-amber-500/40 backdrop-blur-xl shadow-xl text-xs font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-slate-300">Zurich HSM: <strong className="text-amber-300">Active</strong></span>
                    </div>

                    {/* Floating Quorum Node Shard 2 (Bottom Right) */}
                    <div className="absolute -bottom-4 -right-6 sm:-right-10 px-3 py-1.5 rounded-xl bg-[#0d1222]/95 border border-blue-500/40 backdrop-blur-xl shadow-xl text-xs font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <span className="text-slate-300">NY Qualified: <strong className="text-blue-300">Confirmed</strong></span>
                    </div>

                  </div>

                  {/* Interactive Quorum Trigger Simulation */}
                  <div className="mt-8 flex items-center gap-2 bg-[#080b13] px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
                    <span className="text-slate-400">Interactive Threshold:</span>
                    <button 
                      onClick={() => setWalletQuorumActive(2)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${walletQuorumActive === 2 ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                    >
                      2/4 (Fast)
                    </button>
                    <button 
                      onClick={() => setWalletQuorumActive(3)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${walletQuorumActive === 3 ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                    >
                      3/4 (Standard)
                    </button>
                    <button 
                      onClick={() => setWalletQuorumActive(4)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${walletQuorumActive === 4 ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                    >
                      4/4 (Maximum)
                    </button>
                  </div>

                </div>

                {/* Right: Technical Specification Panel */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-2">
                    <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                      CAPABILITY 01 // CUSTODY ARCHITECTURE
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Zero Single Points of Compromise
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Unlike traditional private keys that risk catastrophic single-device loss, Aevum’s multi-party computation generates key shares in isolated cryptographic enclaves without ever assembling the master key.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-[#070a12] border border-slate-800 space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Mathematical Security (MPC-CMP)</span>
                      </div>
                      <p className="text-xs text-slate-400 pl-6">
                        Elliptic curve threshold signatures guarantee mathematically verifiable non-custodial sovereignty.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#070a12] border border-slate-800 space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>$750M Specie Insurance Backing</span>
                      </div>
                      <p className="text-xs text-slate-400 pl-6">
                        Underwritten by Lloyd's of London syndicates for physical, software, and transmission breach events.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onOpenAccessRequest}
                      className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                    >
                      <span>Explore Custody Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* CAPABILITY 2: NETWORK 3D ARCHITECTURAL VISUALIZATION                      */}
            {/* ========================================================================= */}
            {activeCapability === 'network' && (
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-500">
                
                {/* Left: Interactive Organization Multi-Sig Hierarchy & Routing Graph */}
                <div className="lg:col-span-7 flex flex-col items-center justify-center relative py-6">
                  
                  <div className="w-full max-w-md space-y-3">
                    
                    {/* Root Apex Master Entity Node */}
                    <div 
                      onClick={() => setNetworkSelectedNode('apex')}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        networkSelectedNode === 'apex'
                          ? 'bg-[#10172e] border-blue-500 shadow-xl shadow-blue-500/20 scale-[1.02]'
                          : 'bg-[#0a0d18] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Apex Institutional Entity</div>
                          <div className="text-xs text-slate-400 font-mono">Multi-Sig Root Governance Tree</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        HEALTHY
                      </span>
                    </div>

                    {/* Branching Nodes */}
                    <div className="pl-6 sm:pl-8 border-l-2 border-slate-800 ml-4 sm:ml-5 space-y-2.5">
                      
                      {/* Signer Node 1 */}
                      <div 
                        onClick={() => setNetworkSelectedNode('cro')}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          networkSelectedNode === 'cro'
                            ? 'bg-[#10172e] border-blue-500 shadow-lg'
                            : 'bg-[#080b14] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
                            <Users className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Chief Risk Officer (CRO)</div>
                            <div className="text-[10px] text-slate-400 font-mono">FIDO2 Hardware Key Verified</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          Signed (4m ago)
                        </span>
                      </div>

                      {/* Signer Node 2 */}
                      <div 
                        onClick={() => setNetworkSelectedNode('sor')}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          networkSelectedNode === 'sor'
                            ? 'bg-[#10172e] border-blue-500 shadow-lg'
                            : 'bg-[#080b14] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
                            <Zap className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Smart Order Routing (SOR)</div>
                            <div className="text-[10px] text-slate-400 font-mono">45 Connected Venues</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                          0.8 bps Slippage
                        </span>
                      </div>

                      {/* Signer Node 3 */}
                      <div 
                        onClick={() => setNetworkSelectedNode('travel')}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          networkSelectedNode === 'travel'
                            ? 'bg-[#10172e] border-blue-500 shadow-lg'
                            : 'bg-[#080b14] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                            <Cpu className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Automated Travel Rule Relay</div>
                            <div className="text-[10px] text-slate-400 font-mono">IVMS101 / TRP V2 Handshake</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          Compliant ✓
                        </span>
                      </div>

                    </div>

                  </div>

                  <div className="mt-4 text-xs font-mono text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                    <span>Live Quorum Policy: <strong className="text-white">Strict Multi-Signature Zero-Trust</strong></span>
                  </div>

                </div>

                {/* Right: Technical Specification Panel */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-2">
                    <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                      CAPABILITY 02 // GOVERNANCE & EXECUTION
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Granular Enterprise Control
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Eliminate rogue operator risk with hierarchical policy rules, multi-officer spending thresholds, automated whitelists, and cross-venue liquidity routing.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-[#070a12] border border-slate-800 space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Dynamic Multi-Officer Governance</span>
                      </div>
                      <p className="text-xs text-slate-400 pl-6">
                        Configure conditional velocity gates, dual-custody authorization, and emergency freeze triggers.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#070a12] border border-slate-800 space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Global Smart Order Routing</span>
                      </div>
                      <p className="text-xs text-slate-400 pl-6">
                        Execute 8-figure trades across major exchanges and OTC desks with algorithmic market impact mitigation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onOpenAccessRequest}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
                    >
                      <span>Explore Governance Rules</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* CAPABILITY 3: ANALYTICS 3D ARCHITECTURAL VISUALIZATION                     */}
            {/* ========================================================================= */}
            {activeCapability === 'analytics' && (
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-500">
                
                {/* Left: Holographic 3D Curve & Telemetry Stream */}
                <div className="lg:col-span-7 flex flex-col items-center justify-center relative py-6">
                  
                  <div className="w-full max-w-lg rounded-2xl bg-[#090d18] border border-slate-800 p-5 space-y-4 shadow-2xl">
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-cyan-400" />
                        <span className="text-sm font-bold text-white">Execution Telemetry Engine</span>
                      </div>
                      <div className="flex items-center gap-1 bg-[#06080f] p-0.5 rounded-lg border border-slate-800">
                        <button
                          onClick={() => setAnalyticsMetric('liquidity')}
                          className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${analyticsMetric === 'liquidity' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}
                        >
                          Liquidity
                        </button>
                        <button
                          onClick={() => setAnalyticsMetric('latency')}
                          className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${analyticsMetric === 'latency' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}
                        >
                          Latency
                        </button>
                        <button
                          onClick={() => setAnalyticsMetric('yield')}
                          className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${analyticsMetric === 'yield' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}
                        >
                          Yield
                        </button>
                      </div>
                    </div>

                    {/* SVG High Precision Telemetry Area */}
                    <div className="h-44 w-full relative bg-[#060810] rounded-xl border border-slate-800/80 p-3 overflow-hidden">
                      <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Area Fill */}
                        <path
                          d="M 0 100 Q 80 80 140 85 T 260 40 T 400 15 L 400 120 L 0 120 Z"
                          fill="url(#analyticsGrad)"
                        />

                        {/* Top Line */}
                        <path
                          d="M 0 100 Q 80 80 140 85 T 260 40 T 400 15"
                          fill="none"
                          stroke="#06B6D4"
                          strokeWidth="2.5"
                        />

                        {/* Grid lines */}
                        <line x1="0" y1="30" x2="400" y2="30" stroke="#1e293b" strokeDasharray="4 4" />
                        <line x1="0" y1="60" x2="400" y2="60" stroke="#1e293b" strokeDasharray="4 4" />
                        <line x1="0" y1="90" x2="400" y2="90" stroke="#1e293b" strokeDasharray="4 4" />

                        {/* Glowing End Point */}
                        <circle cx="400" cy="15" r="4" fill="#06B6D4" />
                        <circle cx="400" cy="15" r="8" fill="#06B6D4" fillOpacity="0.3" />
                      </svg>

                      {/* Tooltip Overlay */}
                      <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-[#0b0f1e]/90 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
                        {analyticsMetric === 'liquidity' && 'Aggregated Depth: $4.82B across 45 venues'}
                        {analyticsMetric === 'latency' && 'Sub-18ms Tick Finality Roundtrip'}
                        {analyticsMetric === 'yield' && 'Blended Staking APY: 3.92% net'}
                      </div>
                    </div>

                    {/* Stats Matrix */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                      <div className="p-2 rounded-lg bg-[#070a12] border border-slate-800">
                        <div className="text-[10px] text-slate-500">24H VOLUME</div>
                        <div className="text-white font-bold mt-0.5">$184.2M</div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#070a12] border border-slate-800">
                        <div className="text-[10px] text-slate-500">AVG SLIPPAGE</div>
                        <div className="text-emerald-400 font-bold mt-0.5">0.8 bps</div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#070a12] border border-slate-800">
                        <div className="text-[10px] text-slate-500">ATTESTATION</div>
                        <div className="text-cyan-400 font-bold mt-0.5">Merkle 100%</div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Right: Technical Specification Panel */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-2">
                    <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      CAPABILITY 03 // AUDIT & METRICS
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Verifiable Institutional Proof
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Complete visibility into every execution, collateral rebalance, staking reward distribution, and cryptographic proof of solvency.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-[#070a12] border border-slate-800 space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Automated Regulatory Reporting</span>
                      </div>
                      <p className="text-xs text-slate-400 pl-6">
                        One-click export of FISA, TRP V2, and UCC Article 8 custody certificates.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#070a12] border border-slate-800 space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>High-Frequency Tick Data Feeds</span>
                      </div>
                      <p className="text-xs text-slate-400 pl-6">
                        WebSocket and FIX 4.4 connectivity for institutional OMS/EMS integrations.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onOpenAccessRequest}
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
                    >
                      <span>Explore Analytics Engine</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. CAPABILITY SHOWCASE SELECTORS (Wallet • Network • Analytics)           */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            const isSelected = activeCapability === cap.id;

            return (
              <div
                key={cap.id}
                onClick={() => {
                  setActiveCapability(cap.id);
                  setAutoRotate(false);
                }}
                className={`group p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? `bg-[#0e1322] ${cap.accentBorder} shadow-2xl ${cap.activeRing} ring-2 scale-[1.02]`
                    : 'bg-[#090c15] border-slate-800/80 hover:border-slate-700 hover:bg-[#0c101c]'
                }`}
              >
                {/* Top Highlight Beam */}
                {isSelected && (
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                    cap.id === 'wallet' ? 'from-amber-500 to-amber-300' : cap.id === 'network' ? 'from-blue-600 to-indigo-400' : 'from-cyan-500 to-teal-300'
                  }`} />
                )}

                {/* Major Product Visual: Large Shared 3D Illustration */}
                <div className={`relative flex items-center justify-center h-44 sm:h-48 mb-6 rounded-2xl border overflow-hidden transition-colors duration-300 ${
                  isSelected ? `${cap.accentBorder} bg-[#0a0f1c]` : 'border-slate-800/70 bg-[#070a12]/70'
                }`}>
                  {/* Isometric ambient grid + focal glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
                  <div className={`absolute -inset-6 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
                    cap.id === 'wallet' ? 'bg-amber-500/10' : cap.id === 'network' ? 'bg-blue-600/12' : 'bg-cyan-500/12'
                  } ${isSelected ? 'opacity-100' : 'opacity-60'}`} />

                  {/* Subtle interactive motion: gentle lift + scale on hover */}
                  <div className="relative z-10 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1">
                    {renderCapabilityIllustration(cap.id)}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Icon & Monospace Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${cap.accentBg} border ${cap.accentBorder} ${cap.accentColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      isSelected ? `${cap.accentBg} ${cap.accentColor} border ${cap.accentBorder}` : 'bg-slate-800/60 text-slate-400'
                    }`}>
                      {isSelected ? 'ACTIVE VIEW' : 'CLICK TO VIEW'}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                      <span>{cap.name}</span>
                      {isSelected && (
                        <span className={`w-2 h-2 rounded-full ${
                          cap.id === 'wallet' ? 'bg-amber-400' : cap.id === 'network' ? 'bg-blue-400' : 'bg-cyan-400'
                        } animate-ping`} />
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-wider">
                      {cap.badge}
                    </p>
                    <p className="text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                      {cap.shortDesc}
                    </p>
                  </div>

                  {/* 2-3 Supporting Points */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    {cap.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-normal">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${cap.accentColor} shrink-0 mt-0.5`} />
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                  <span className={`${isSelected ? cap.accentColor : 'text-slate-400'}`}>
                    {isSelected ? 'Inspecting 3D Architecture' : `Select ${cap.name}`}
                  </span>
                  <div className={`flex items-center gap-1 ${isSelected ? cap.accentColor : 'text-slate-400 group-hover:text-white'} group-hover:translate-x-1 transition-all`}>
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
