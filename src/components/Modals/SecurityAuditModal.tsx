import React from 'react';
import { X, ShieldCheck, FileCheck, Award, Lock, Download, CheckCircle2, ArrowRight } from 'lucide-react';
import { SECURITY_PROOF_ITEMS } from '../../data/mockData';
import { SecurityIllustration } from '../illustrations/ArchitecturalIllustrations';

export const SecurityAuditModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#0a0d16] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8 overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 relative z-10">
          <div className="flex-shrink-0">
            <SecurityIllustration size="sm" className="scale-110" />
          </div>
          
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase font-mono">
              FIPS 140-3 & SOC 2 ATTESTED
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              Security Certifications & Audit Package
            </h3>
            <p className="text-xs text-slate-300">
              Official cryptographic attestation, penetration test certifications, and insurance policy schedules.
            </p>
          </div>
        </div>

        <div className="space-y-3 relative z-10 max-h-[50vh] overflow-y-auto pr-1">
          {SECURITY_PROOF_ITEMS.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-[#0d101a] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {item.title}
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/25">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 font-mono">
                <span>Auditor: <strong className="text-slate-200">{item.auditor}</strong></span>
                <span>{item.verifiedDate}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-5 mt-5 border-t border-slate-800 flex justify-end relative z-10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-lg shadow-blue-600/25"
          >
            Close Security Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
