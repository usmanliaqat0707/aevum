import React from 'react';
import { 
  Server, 
  ShieldCheck, 
  Eye, 
  Sliders, 
  FileCheck2, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

interface TrustProofBarProps {
  onOpenSecurity: () => void;
}

export const TrustProofBar: React.FC<TrustProofBarProps> = ({ onOpenSecurity }) => {
  const trustItems = [
    {
      id: 'secure-infrastructure',
      title: 'Secure Infrastructure',
      explanation: 'FIPS 140-3 Level 3 hardware security modules with threshold MPC-CMP keyless signing.',
      icon: Server,
      accentColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'account-protection',
      title: 'Account Protection',
      explanation: 'Bankruptcy-remote asset custody with 2-of-3 quorum governance and Lloyd’s specie coverage.',
      icon: ShieldCheck,
      accentColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    {
      id: 'transparent-activity',
      title: 'Transparent Activity',
      explanation: 'Real-time on-chain Merkle tree solvency proofs and immutable cryptographic audit trails.',
      icon: Eye,
      accentColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    },
    {
      id: 'risk-controls',
      title: 'Risk Controls',
      explanation: 'Granular spending thresholds, whitelisted destination addresses, and instant multi-tier kill switches.',
      icon: Sliders,
      accentColor: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10'
    },
    {
      id: 'compliance-information',
      title: 'Compliance Information',
      explanation: 'SOC 2 Type II audited protocols, automated FATF Travel Rule messaging, and strict KYB verification.',
      icon: FileCheck2,
      accentColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10'
    },
  ];

  return (
    <section id="trust-strip-section" className="py-8 sm:py-10 border-y border-slate-800/80 bg-[#07090f] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Substantiation Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              INSTITUTIONAL ASSURANCE & VERIFIABLE CONTROLS
            </h2>
          </div>
          
          <button
            onClick={onOpenSecurity}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors self-start sm:self-auto"
          >
            <span>View Verified Audit Reports & Policies</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Core Trust Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={onOpenSecurity}
                className="group p-4 rounded-xl bg-[#0b0e17] border border-slate-800/80 hover:border-slate-700 hover:bg-[#0e121e] transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${item.bgColor} ${item.accentColor} transition-transform group-hover:scale-105`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300 opacity-70 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Verified</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                    {item.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
