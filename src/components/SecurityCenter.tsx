import React from 'react';
import {
  ShieldCheck,
  Lock,
  Fingerprint,
  Server,
  CheckCircle2,
  ArrowRight,
  BadgeCheck
} from 'lucide-react';
import { SECURITY_PROOF_ITEMS } from '../data/mockData';
import { SecurityIllustration } from './illustrations/ArchitecturalIllustrations';

interface SecurityCenterProps {
  onOpenSecurityModal: () => void;
}

const POSTURE_STATS = [
  { label: 'Custody Standard', value: 'FIPS 140-3 L3', icon: Lock },
  { label: 'Specie Insurance', value: '$750M', icon: ShieldCheck },
  { label: 'Security Breaches', value: 'Zero', icon: Fingerprint },
  { label: 'Infra Uptime SLA', value: '99.998%', icon: Server },
];

export const SecurityCenter: React.FC<SecurityCenterProps> = ({ onOpenSecurityModal }) => {
  return (
    <section id="security-center-section" className="py-20 sm:py-28 bg-[#06080f] relative overflow-hidden border-t border-slate-800/80">

      {/* Ambient depth */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[480px] bg-emerald-500/06 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            INSTITUTIONAL SECURITY POSTURE
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Security Center
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            Independent certifications, formally-verified cryptography, and underwritten insurance — the controls behind every custody and settlement decision.
          </p>
        </div>

        {/* Posture stat strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-slate-800 bg-[#080b14] overflow-hidden mb-10 divide-x divide-y lg:divide-y-0 divide-slate-800">
          {POSTURE_STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="p-5 flex flex-col gap-1.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-emerald-400" />
                  {s.label}
                </div>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-white">{s.value}</div>
              </div>
            );
          })}
        </div>

        {/* Main grid: illustration + certification cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: security emblem + CTA */}
          <div className="lg:col-span-4 rounded-3xl bg-[#0a0d16] border border-slate-800 shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center">
            <SecurityIllustration size="lg" className="scale-95" />
            <h3 className="text-xl font-bold text-white mt-4">Zero single point of failure</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Keyless MPC-CMP threshold signing across geographically isolated FIPS 140-3 hardware enclaves — private keys are never assembled.
            </p>
            <button
              onClick={onOpenSecurityModal}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              View Full Audit Package
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: certification cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SECURITY_PROOF_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={onOpenSecurityModal}
                className="text-left p-5 rounded-2xl bg-[#0a0d16] border border-slate-800 hover:border-emerald-500/40 hover:bg-[#0c1016] transition-all space-y-3 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {item.title}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/25 whitespace-nowrap">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                  <span className="inline-flex items-center gap-1.5">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {item.auditor}
                  </span>
                  <span>{item.verifiedDate}</span>
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
