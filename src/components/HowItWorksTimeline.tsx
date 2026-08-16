import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  ShieldCheck, 
  FileCheck2, 
  Coins, 
  Activity, 
  ArrowUpRight, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  KeyRound, 
  Sparkles, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Wallet,
  Building,
  Fingerprint,
  QrCode,
  Sliders,
  Send,
  Zap,
  Globe2
} from 'lucide-react';
import {
  LiquidityIllustration,
  SecurityIllustration,
  NetworkIllustration,
  WalletIllustration,
  TransparencyIllustration,
  GrowthIllustration,
  VectorEntitySetupIllustration,
  VectorMpcSecurityIllustration,
  VectorKycVerificationIllustration,
  VectorReserveFundingIllustration,
  VectorExecutionIllustration
} from './illustrations/ArchitecturalIllustrations';

interface HowItWorksTimelineProps {
  onOpenAccessRequest: () => void;
}

export const HowItWorksTimeline: React.FC<HowItWorksTimelineProps> = ({ onOpenAccessRequest }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const STEPS = [
    {
      stepNumber: '01',
      title: 'Create Account',
      subtitle: 'Institutional Entity Setup',
      desc: 'Register legal entity credentials, designate authorized signers, and define role-based organization access boundaries.',
      icon: UserPlus,
      accent: 'blue',
      badge: 'Step 01 • Instant Setup',
      details: [
        'Multi-entity corporate structure support',
        'Custom administrative signing policies',
        'Delegated team access with zero shared credentials'
      ],
      renderVector: (active: boolean) => <VectorEntitySetupIllustration active={active} />,
      render3D: () => <NetworkIllustration size="lg" />
    },
    {
      stepNumber: '02',
      title: 'Secure Your Account',
      subtitle: 'Keyless MPC-CMP Generation',
      desc: 'Generate mathematical cryptographic key shares partitioned across geographically isolated hardware enclaves without single point of failure.',
      icon: Lock,
      accent: 'emerald',
      badge: 'Step 02 • Zero Private Keys',
      details: [
        'Threshold signature scheme (TSS)',
        'Biometric FIDO2 / WebAuthn token pairing',
        'Disaster recovery time-lock backup shares'
      ],
      renderVector: (active: boolean) => <VectorMpcSecurityIllustration active={active} />,
      render3D: () => <SecurityIllustration size="lg" />
    },
    {
      stepNumber: '03',
      title: 'Complete Verification',
      subtitle: 'KYB & Compliance Clearance',
      desc: 'Complete automated institutional Know-Your-Business validation, beneficial ownership attestation, and FATF Travel Rule protocol linkage.',
      icon: FileCheck2,
      accent: 'cyan',
      badge: 'Step 03 • Fast-Track KYB',
      details: [
        'Automated global sanctions screening (OFAC, EU, UN)',
        'Ultimate Beneficial Owner (UBO) digital intake',
        'Certified SOC 2 Type II audit trail integration'
      ],
      renderVector: (active: boolean) => <VectorKycVerificationIllustration active={active} />,
      render3D: () => <TransparencyIllustration size="lg" />
    },
    {
      stepNumber: '04',
      title: 'Fund / Allocate Reserves',
      subtitle: 'Reserve Allocation & Staking',
      desc: 'Deposit fiat wires or digital assets into bankruptcy-remote segregated custody, or allocate directly into yield-bearing staking validators.',
      icon: Coins,
      accent: 'amber',
      badge: 'Step 04 • Multi-Venue Flow',
      details: [
        'Instant Fedwire / SEPA Instant fiat settlement rails',
        'Direct staking delegation with zero unbonding penalties',
        'Sub-second smart order routing to 45+ liquidity venues'
      ],
      renderVector: (active: boolean) => <VectorReserveFundingIllustration active={active} />,
      render3D: () => <WalletIllustration size="lg" />
    },
    {
      stepNumber: '05',
      title: 'Route Liquidity & Monitor',
      subtitle: 'Real-Time Solvency & Logs',
      desc: 'Verify continuous cryptographic Merkle tree reserves, inspect live execution latencies, and track all institutional signer actions.',
      icon: Activity,
      accent: 'indigo',
      badge: 'Step 05 • Continuous Audit',
      details: [
        'Live streaming mempool and execution telemetry',
        'Cryptographic Merkle tree reserve proof validation',
        'Automated real-time anomaly detection and threshold alerts'
      ],
      renderVector: (active: boolean) => <VectorExecutionIllustration active={active} />,
      render3D: () => <LiquidityIllustration size="lg" />
    },
    {
      stepNumber: '06',
      title: 'Quorum Governance Outflow',
      subtitle: 'Quorum Governance & Sweeps',
      desc: 'Execute outbound multi-signature withdrawals, adjust spending velocity limits, or sweep staking yields with full hardware verification.',
      icon: ArrowUpRight,
      accent: 'rose',
      badge: 'Step 06 • Controlled Outflow',
      details: [
        'Time-locked delayed execution for ultra-large transfers',
        'Whitelisted address registries with mandatory co-signing',
        'Instant multi-tiered kill switch and emergency freeze'
      ],
      renderVector: (active: boolean) => (
        <div className="w-full h-36 sm:h-40 rounded-2xl bg-[#080b13] border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-rose-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              OUTFLOW POLICY GATE
            </span>
            <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
              QUORUM MET (2/3)
            </span>
          </div>

          <div className="my-auto p-2.5 rounded-xl bg-[#0b0e17] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-200 font-bold">
              <span>Transfer: $2,500,000 USDC</span>
              <span className="text-emerald-400 font-mono text-[10px]">Verified ✓</span>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full w-full" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-1.5">
            <span>Co-Signers: FIDO2 Token Authorized</span>
            <span className="text-emerald-400 font-semibold">Broadcasted</span>
          </div>
        </div>
      ),
      render3D: () => <GrowthIllustration size="lg" />
    },
  ];

  // Auto-advance timeline if autoPlay is active
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [autoPlay, STEPS.length]);

  const activeStep = STEPS[activeStepIndex];

  return (
    <section id="how-it-works-section" className="py-24 sm:py-32 relative bg-[#07090f] overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/06 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Layers className="w-3.5 h-3.5" />
            OPERATIONAL LIFECYCLE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            From organizational onboarding to multi-signature threshold management—a transparent, mathematically verified 6-stage lifecycle.
          </p>
        </div>

        {/* Responsive Horizontal / Grid Timeline Steps Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 mb-8 sm:mb-12">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStepIndex === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => {
                  setActiveStepIndex(idx);
                  setAutoPlay(false);
                }}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between relative group cursor-pointer ${
                  isSelected
                    ? 'bg-[#0f1422] border-blue-500 shadow-xl shadow-blue-500/15 scale-[1.03] ring-1 ring-blue-500/30'
                    : 'bg-[#090c15] border-slate-800/80 hover:border-slate-700 hover:bg-[#0c101c]'
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isSelected && (
                  <div className="absolute top-0 left-3 right-3 h-0.5 bg-blue-400 rounded-full" />
                )}

                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-blue-400' : 'text-slate-400'}`}>
                    {step.stepNumber}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800/60 text-slate-400 group-hover:text-slate-200'}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <div className={`text-xs font-bold transition-colors ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {step.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {step.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Panel (Large Hero-Quality Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center p-6 sm:p-8 lg:p-12 rounded-3xl bg-[#0b0e18]/95 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* Ambient Background Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Left Column: Detailed Step Explanation & Metadata */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-blue-400">
                {activeStep.stepNumber}
              </span>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
                  {activeStep.badge}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                  {activeStep.title}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              {activeStep.desc}
            </p>

            {/* Checklist items */}
            <div className="space-y-2.5 pt-2">
              {activeStep.details.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* 2D Vector Micro-Illustration for Step Verification */}
            <div className="pt-2">
              {activeStep.renderVector(true)}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3">
              <button
                onClick={onOpenAccessRequest}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-600/25 cursor-pointer"
              >
                <span>Initiate Step {activeStep.stepNumber}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setActiveStepIndex((prev) => (prev + 1) % STEPS.length);
                  setAutoPlay(false);
                }}
                className="px-5 py-3 rounded-xl bg-[#121624] hover:bg-[#181e30] text-slate-300 hover:text-white font-semibold text-xs sm:text-sm transition-all border border-slate-700/80 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Column: Architectural 3D Motif Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[340px] sm:min-h-[400px] p-4 rounded-3xl bg-[#060810]/80 border border-slate-800 shadow-inner">
            
            {/* Ambient Backlight for 3D Geometry */}
            <div className="absolute inset-8 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
            
            {/* Render Cohesive 3D Geometric Object */}
            <div className="relative z-10 transform scale-110 sm:scale-125 transition-transform duration-500">
              {activeStep.render3D()}
            </div>

            {/* Micro Badge for Architectural DNA */}
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-xl bg-[#0b0e18]/90 border border-slate-800 text-[10px] font-mono text-slate-400">
              AEVUM DESIGN SYSTEM // 3D MOTIF
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
