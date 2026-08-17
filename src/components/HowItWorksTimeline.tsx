import React, { useState, useEffect, useRef } from 'react';
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

const ACCENT: Record<string, { text: string; bg: string; border: string; dot: string; glow: string }> = {
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/40', dot: 'bg-blue-400', glow: 'bg-blue-600/15' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/40', dot: 'bg-emerald-400', glow: 'bg-emerald-500/15' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/40', dot: 'bg-cyan-400', glow: 'bg-cyan-500/15' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/40', dot: 'bg-amber-400', glow: 'bg-amber-500/15' },
  indigo: { text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/40', dot: 'bg-indigo-400', glow: 'bg-indigo-600/15' },
  rose: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/40', dot: 'bg-rose-400', glow: 'bg-rose-500/15' },
};

export const HowItWorksTimeline: React.FC<HowItWorksTimelineProps> = ({ onOpenAccessRequest }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

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

  // Scroll-driven active step: observe each step panel and activate the one
  // occupying the central viewport band, producing a pinned storytelling sequence.
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const idx = Number((visible[0].target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setActiveStepIndex(idx);
        }
      },
      { root: null, rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToStep = (idx: number) => {
    panelRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const activeStep = STEPS[activeStepIndex];
  const accent = ACCENT[activeStep.accent];

  return (
    <section id="how-it-works-section" className="py-24 sm:py-32 relative bg-[#07090f]">
      
      {/* Background Radial Glow — clipped by an inner wrapper so the section itself
          keeps overflow:visible (otherwise it would break the sticky pinned stage). */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/06 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Layers className="w-3.5 h-3.5" />
            OPERATIONAL LIFECYCLE
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            From organizational onboarding to multi-signature threshold management—a transparent, mathematically verified 6-stage lifecycle.
          </p>
        </div>

        {/* ================================================================= */}
        {/* SCROLL-DRIVEN SEQUENCE: Pinned Stage (left) + Step Panels (right)  */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ---------- LEFT: Pinned Cinematic Stage (desktop) ---------- */}
          {/* Outer grid item stretches to the full (tall) row height; the inner card
              is sticky, giving it room to stay pinned while the right panels scroll. */}
          <div className="hidden lg:block">
            <div className="lg:sticky lg:top-24 relative rounded-3xl bg-[#0b0e18]/95 border border-slate-800 shadow-2xl p-8 overflow-hidden min-h-[540px] flex flex-col">
              {/* Accent ambient glow (transitions with active step) */}
              <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-colors duration-700 ${accent.glow}`} />
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:26px_26px] opacity-15 pointer-events-none" />

              {/* Top: Huge step number + clickable progress rail */}
              <div className="relative z-10 flex items-start justify-between">
                <div key={`num-${activeStepIndex}`} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                    {activeStep.badge}
                  </div>
                  <div className={`text-8xl font-extrabold font-mono leading-none ${accent.text}`}>
                    {activeStep.stepNumber}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-0.5 pt-2">
                  {STEPS.map((s, i) => (
                    <button
                      key={s.stepNumber}
                      onClick={() => scrollToStep(i)}
                      aria-label={`Go to step ${s.stepNumber}`}
                      className="group/dot flex items-center justify-center p-2 cursor-pointer"
                    >
                      <span className={`block rounded-full transition-all duration-300 ${
                        i === activeStepIndex ? `${ACCENT[s.accent].dot} h-6 w-1.5` : 'bg-slate-700 group-hover/dot:bg-slate-500 h-1.5 w-1.5'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Center: Animated 3D illustration (re-mounts per step to replay motion) */}
              <div className="relative z-10 flex-1 flex items-center justify-center py-6">
                <div className="absolute inset-8 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
                <div
                  key={`viz-${activeStepIndex}`}
                  className="relative z-10 transform scale-125 animate-in fade-in zoom-in-95 duration-700"
                >
                  {activeStep.render3D()}
                </div>
              </div>

              {/* Footer: active step title + CTA */}
              <div className="relative z-10 flex items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
                <div>
                  <div className="text-sm font-bold text-white">{activeStep.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{activeStep.subtitle}</div>
                </div>
                <button
                  onClick={onOpenAccessRequest}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-blue-600/25 cursor-pointer whitespace-nowrap"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ---------- RIGHT: Scrolling Step Panels ---------- */}
          <div>
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const a = ACCENT[step.accent];
              const isActive = idx === activeStepIndex;
              return (
                <div
                  key={step.stepNumber}
                  data-index={idx}
                  ref={(el) => { panelRefs.current[idx] = el; }}
                  className={`relative min-h-[64vh] lg:min-h-[72vh] flex flex-col justify-center py-10 scroll-mt-24 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'lg:opacity-40'}`}
                >
                  {/* Giant faint watermark number */}
                  <div className={`pointer-events-none absolute -top-2 right-0 text-[130px] sm:text-[180px] font-extrabold font-mono leading-none select-none opacity-10 transition-colors duration-500 ${isActive ? a.text : 'text-slate-700'}`}>
                    {step.stepNumber}
                  </div>

                  <div className="relative z-10 space-y-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-colors duration-300 ${isActive ? `${a.bg} ${a.text} ${a.border}` : 'bg-slate-800/60 text-slate-400 border-slate-800'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs font-mono font-semibold uppercase tracking-wider transition-colors duration-300 ${isActive ? a.text : 'text-slate-500'}`}>
                        {step.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm font-mono text-slate-400 mt-1">{step.subtitle}</p>
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                      {step.desc}
                    </p>

                    {/* Mobile-only inline animated illustration */}
                    <div className="lg:hidden flex justify-center py-2">
                      <div className="scale-100">
                        {step.render3D()}
                      </div>
                    </div>

                    {/* Checklist items */}
                    <div className="space-y-2.5">
                      {step.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* 2D Vector Micro-Illustration */}
                    <div className="max-w-md pt-1">
                      {step.renderVector(isActive)}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Closing CTA after the final step */}
            <div className="py-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-slate-800/80">
              <button
                onClick={onOpenAccessRequest}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-600/25 cursor-pointer"
              >
                <span>Begin Onboarding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400 font-mono">Scroll back through any stage using the progress rail.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
