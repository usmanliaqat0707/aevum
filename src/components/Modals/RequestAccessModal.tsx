import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck,
  Globe2,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NetworkIllustration, SecurityIllustration } from '../illustrations/ArchitecturalIllustrations';

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestAccessModal: React.FC<RequestAccessModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    entityName: '',
    workEmail: '',
    fullName: '',
    role: 'Chief Investment Officer / Portfolio Manager',
    jurisdiction: 'United States (SEC / NYDFS Regulated)',
    estimatedAum: '$25M - $100M',
    primaryInterest: 'MPC Cold & Warm Custody'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#10B981', '#60A5FA']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-lg bg-[#0a0d16] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8 overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="space-y-6 text-center py-4">
            <div className="flex justify-center">
              <SecurityIllustration size="sm" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white">
                Institutional Application Received
              </h3>
              <p className="text-sm text-slate-300">
                Thank you, <strong>{formData.fullName || 'Partner'}</strong>. Your dedicated Institutional Relationship Director has been assigned and will reach out within 2 hours to initiate KYB verification and sandbox provisioning.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0e1320] border border-slate-800 text-left text-xs font-mono space-y-1.5 text-slate-300">
              <div className="text-slate-400 uppercase text-[10px]">Reference Ticket ID:</div>
              <div className="text-blue-400 font-bold">AEV-INST-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div className="text-slate-400">Jurisdiction: {formData.jurisdiction}</div>
              <div className="text-slate-400">Assigned Escrow Custodian: Zurich Trust & NY Qualified</div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              Return to Platform Overview
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase font-mono mb-1">
                  INSTITUTIONAL ONBOARDING
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  Apply for Institutional Access
                </h3>
                <p className="text-xs text-slate-400 font-normal">
                  Dedicated MPC hardware enclaves, wholesale liquidity routing, and bankruptcy-remote trust custody.
                </p>
              </div>
              {/* Shared Architectural Illustration Language (KYB / Network Onboarding) */}
              <div className="hidden sm:block flex-shrink-0 -mt-3 -mr-1">
                <NetworkIllustration size="sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Legal Entity Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Alpha Capital LLC"
                  value={formData.entityName}
                  onChange={(e) => setFormData({ ...formData, entityName: e.target.value })}
                  className="w-full bg-[#07090f] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#07090f] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Work Email (Corporate Domain)</label>
              <input
                type="email"
                required
                placeholder="name@fund.com"
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                className="w-full bg-[#07090f] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Target Digital AUM</label>
                <select
                  value={formData.estimatedAum}
                  onChange={(e) => setFormData({ ...formData, estimatedAum: e.target.value })}
                  className="w-full bg-[#07090f] border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option>$5M - $25M</option>
                  <option>$25M - $100M</option>
                  <option>$100M - $500M</option>
                  <option>$500M+</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Primary Product</label>
                <select
                  value={formData.primaryInterest}
                  onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
                  className="w-full bg-[#07090f] border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option>MPC Cold & Warm Custody</option>
                  <option>Algorithmic Liquidity (SOR)</option>
                  <option>Prime Treasury Staking & Yield</option>
                  <option>Developer API & FIX Infrastructure</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 border border-blue-400/30 cursor-pointer"
              >
                <span>Submit Institutional Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center text-[10px] text-slate-400 pt-1 font-mono">
              Encrypted with TLS 1.3 • Handled strictly according to Swiss FISA & SOC 2 compliance.
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
