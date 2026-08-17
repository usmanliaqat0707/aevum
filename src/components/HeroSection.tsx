import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Activity, 
  Terminal, 
  TrendingUp, 
  Cpu, 
  CheckCircle2, 
  ChevronRight,
  Eye,
  Sliders,
  Sparkles,
  Zap,
  Globe2,
  FileCheck2,
  ShieldAlert
} from 'lucide-react';
import { LIVE_ASSETS } from '../data/mockData';
import { HeroVisualCore } from './HeroVisualCore';

interface HeroSectionProps {
  onOpenAccessRequest: () => void;
  onOpenSecurityModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAccessRequest,
  onOpenSecurityModal,
}) => {
  const [activeAssetIndex, setActiveAssetIndex] = useState(0);
  const [simulatedBlock, setSimulatedBlock] = useState(21849204);
  const [signingSpeed, setSigningSpeed] = useState(38);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedBlock(prev => prev + 1);
      setSigningSpeed(34 + Math.floor(Math.random() * 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeAsset = LIVE_ASSETS[activeAssetIndex];

  // Scroll-driven slow 3D rotation of the hero visual object.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const coreRotateY = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const coreScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section ref={heroRef} id="hero-section" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      
      {/* Background Architectural Glow and Radial Lighting */}
      <div className="absolute top-20 left-1/4 -translate-x-1/2 w-[600px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-emerald-500/05 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Hero Grid: Left Content + Right 3D Scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-5 space-y-7 text-left">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101424]/90 border border-blue-500/30 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                  DIGITAL FINANCIAL INFRASTRUCTURE
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[40px] sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.05]">
              A clearer way to manage{' '}
              <span className="bg-gradient-to-r from-blue-400 via-blue-200 to-indigo-300 bg-clip-text text-transparent">
                digital assets
              </span>
              , activity and financial participation.
            </h1>

            {/* Supporting Explanation */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              Enterprise custody, liquidity routing, and automated balance operations unified into a single verifiable system. Built with multi-party computation, instant settlement rails, and zero-compromise security controls.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                id="hero-create-account-btn"
                onClick={onOpenAccessRequest}
                className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2.5 border border-blue-400/30 group cursor-pointer"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                id="hero-explore-platform-btn"
                onClick={scrollToHowItWorks}
                className="px-6 py-3.5 rounded-xl bg-[#131724] hover:bg-[#1a2032] text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700/80 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/30 cursor-pointer"
              >
                <span>Explore Platform</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Micro Trust Line: Secure • Transparent • Risk-Aware */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold text-slate-200">Secure</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-slate-200">Transparent</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-slate-200">Risk-Aware</span>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN ================= */}
          {/* Large Abstract Financial Infrastructure Visualization */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            {/* Ambient Background Radial Lighting Behind the Object */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-blue-600/15 via-emerald-500/08 to-transparent rounded-[40px] blur-3xl pointer-events-none" />
            
            {/* 3D Vector & Particle Financial Infrastructure Core (slow scroll-driven rotation) */}
            <motion.div
              style={{ rotateY: coreRotateY, scale: coreScale, transformPerspective: 1600 }}
              className="w-full flex items-center justify-center"
            >
              <HeroVisualCore onInteractCore={onOpenAccessRequest} />
            </motion.div>
          </div>

        </div>

        {/* Live Interactive Institutional Asset & Settlement Ticker Box */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="dark-panel rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Institutional Asset Reserves & Smart Order Depth
                  </h3>
                  <p className="text-xs text-slate-400">
                    Real-time quotes with qualified custodian segregation and automated yield accrual
                  </p>
                </div>
              </div>

              {/* Asset Selector Tabs */}
              <div className="flex items-center bg-[#090b12] p-1 rounded-lg border border-slate-800 overflow-x-auto">
                {LIVE_ASSETS.map((asset, idx) => (
                  <button
                    key={asset.symbol}
                    onClick={() => setActiveAssetIndex(idx)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                      activeAssetIndex === idx
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {asset.symbol}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Asset Deep Dive Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-5 items-center">
              
              {/* Asset Name & Price */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">{activeAsset.name}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-tabular text-white">
                    ${activeAsset.priceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className={`text-xs font-semibold font-tabular ${activeAsset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {activeAsset.change24h >= 0 ? '+' : ''}{activeAsset.change24h}% (24h)
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Market Depth: <span className="text-slate-200 font-tabular">{activeAsset.marketCap}</span>
                </div>
              </div>

              {/* Custody Tier & Security Rule */}
              <div className="p-3 rounded-xl bg-[#090c14] border border-slate-800 space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium flex items-center justify-between">
                  <span>Custody Tier</span>
                  <Lock className="w-3 h-3 text-blue-400" />
                </div>
                <div className="text-sm font-semibold text-white">
                  {activeAsset.custodyTier}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {activeAsset.jurisdiction}
                </div>
              </div>

              {/* Staking & Treasury APY */}
              <div className="p-3 rounded-xl bg-[#090c14] border border-slate-800 space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium flex items-center justify-between">
                  <span>Treasury Yield</span>
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="text-base font-bold font-tabular text-emerald-400">
                  {activeAsset.stakingApy}% APY
                </div>
                <div className="text-[11px] text-slate-400">
                  Compound daily • Zero lockup
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={onOpenAccessRequest}
                  className="w-full py-2.5 px-4 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  Allocate Reserve
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('liquidity-explanation-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-[11px] font-medium text-slate-300 hover:text-white transition-colors text-center border border-slate-700/60 cursor-pointer"
                >
                  Simulate SOR Route
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
