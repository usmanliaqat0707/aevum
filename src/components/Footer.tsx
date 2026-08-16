import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Activity, 
  FileCode, 
  Globe2, 
  Lock, 
  ArrowUpRight,
  ExternalLink,
  Camera
} from 'lucide-react';

interface FooterProps {
  onOpenAccessRequest: () => void;
  onOpenSecurityModal: () => void;
  onOpenScreenshot?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAccessRequest,
  onOpenSecurityModal,
  onOpenScreenshot,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070c] border-t border-slate-800 text-slate-400 text-xs">
      
      {/* Upper Status & SLA Bar */}
      <div className="border-b border-slate-800/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-slate-300">
              System Status: All Primary Nodes Operational (99.998% SLA)
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
            <span>Latency: 18ms</span>
            <span>•</span>
            <span>Zurich / New York / Singapore</span>
          </div>
        </div>
      </div>

      {/* Main Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand & Mission Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center p-1 shadow-md shadow-blue-600/30">
                <div className="w-full h-full bg-[#0b0d14] rounded-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 border border-blue-400 rotate-45" />
                </div>
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                AEVUM PRIME
              </span>
            </div>

            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Institutional-grade digital asset infrastructure combining MPC-CMP threshold custody, algorithmic smart liquidity, and transparent verifiability with zero single point of failure.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenAccessRequest}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Request Access
              </button>
              <button
                onClick={() => scrollTo('education-center-section')}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors border border-slate-700 cursor-pointer"
              >
                Learning Center
              </button>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Platform</div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollTo('platform-overview-section')} className="hover:text-white transition-colors cursor-pointer">
                  Platform Architecture
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('how-it-works-section')} className="hover:text-white transition-colors cursor-pointer">
                  How It Works Lifecycle
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('liquidity-explanation-section')} className="hover:text-white transition-colors cursor-pointer">
                  Smart Order Routing (SOR)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('app-coin-section')} className="hover:text-white transition-colors cursor-pointer">
                  APEX-UTL Utility & Offsets
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('matrix-explanation-section')} className="hover:text-white transition-colors cursor-pointer">
                  2×6 Network Topology
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Governance & Security */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Security & Audit</div>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenSecurityModal} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                  SOC 2 Type II Report
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </button>
              </li>
              <li>
                <button onClick={onOpenSecurityModal} className="hover:text-white transition-colors cursor-pointer">
                  ISO/IEC 27001 Certification
                </button>
              </li>
              <li>
                <button onClick={onOpenSecurityModal} className="hover:text-white transition-colors cursor-pointer">
                  MPC-CMP Formal Verification
                </button>
              </li>
              <li>
                <button onClick={onOpenSecurityModal} className="hover:text-white transition-colors cursor-pointer">
                  $750M Lloyd’s Specie Policy
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('transparency-center-section')} className="hover:text-white transition-colors cursor-pointer">
                  Transparency & Proof of Reserves
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & FAQ */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Resources</div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollTo('education-center-section')} className="hover:text-white transition-colors cursor-pointer">
                  Learning Center & Guides
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('public-faq-section')} className="hover:text-white transition-colors cursor-pointer">
                  Public FAQ Knowledge Base
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('public-faq-section')} className="hover:text-white transition-colors cursor-pointer">
                  Institutional Glossary
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('transparency-center-section')} className="hover:text-white transition-colors cursor-pointer">
                  Policies & Legal Charters
                </button>
              </li>
              <li>
                <button onClick={onOpenAccessRequest} className="hover:text-white transition-colors cursor-pointer">
                  Coverage Desk Contact
                </button>
              </li>
              {onOpenScreenshot && (
                <li>
                  <button 
                    onClick={onOpenScreenshot} 
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Download Full Page Snapshot</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Regulatory & Legal Disclosures */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 space-y-4 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong>Regulatory Disclosure:</strong> Aevum Prime provides technology infrastructure and multi-party computation software services. Custodial services are provided through licensed, qualified state-chartered trust companies and independent third-party custodians where applicable. Digital assets held within institutional vaults are bankruptcy-remote and segregated 1-to-1 from company operating capital.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
            <div>
              © 2026 Aevum Infrastructure AG. All rights reserved. Registered in Zurich, Switzerland and New York, USA.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span onClick={onOpenSecurityModal} className="hover:text-slate-300 cursor-pointer">Security Attestations</span>
              {onOpenScreenshot && (
                <>
                  <span>•</span>
                  <span onClick={onOpenScreenshot} className="text-blue-400 hover:text-blue-300 cursor-pointer font-mono flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    Capture Page PNG
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
