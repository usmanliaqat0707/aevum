import React from 'react';
import { ArrowUpRight, Camera } from 'lucide-react';

interface FooterProps {
  onOpenAccessRequest: () => void;
  onOpenSecurityModal: () => void;
  onOpenScreenshot?: () => void;
}

// lucide-react no longer ships brand marks, so the socials are small inline SVGs.
const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const DiscordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M20.317 4.369a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.009c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.893.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({
  onOpenAccessRequest,
  onOpenSecurityModal,
  onOpenScreenshot,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const COLUMNS: Array<{ title: string; links: Array<{ label: string; onClick: () => void; external?: boolean }> }> = [
    {
      title: 'Platform',
      links: [
        { label: 'How It Works', onClick: () => scrollTo('how-it-works-section') },
        { label: 'Security', onClick: onOpenSecurityModal, external: true },
        { label: 'Transparency', onClick: () => scrollTo('transparency-center-section') },
        { label: 'Network', onClick: () => scrollTo('matrix-explanation-section') },
        { label: 'App Coin', onClick: () => scrollTo('app-coin-section') },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Education', onClick: () => scrollTo('education-center-section') },
        { label: 'FAQ', onClick: () => scrollTo('public-faq-section') },
        { label: 'Glossary', onClick: () => scrollTo('public-faq-section') },
        { label: 'Help Center', onClick: onOpenAccessRequest },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', onClick: () => scrollTo('platform-overview-section') },
        { label: 'Contact', onClick: onOpenAccessRequest },
        { label: 'Careers', onClick: onOpenAccessRequest },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms', onClick: () => scrollTo('transparency-center-section') },
        { label: 'Privacy', onClick: () => scrollTo('transparency-center-section') },
        { label: 'Risk Disclosure', onClick: () => scrollTo('transparency-center-section') },
        { label: 'AML/KYC', onClick: () => scrollTo('transparency-center-section') },
      ],
    },
  ];

  const SOCIALS: Array<{ label: string; Icon: React.FC<{ className?: string }> }> = [
    { label: 'Aevum on X', Icon: XIcon },
    { label: 'Aevum on LinkedIn', Icon: LinkedInIcon },
    { label: 'Aevum on Discord', Icon: DiscordIcon },
  ];

  return (
    <footer className="bg-[#05070c] border-t border-slate-800 text-slate-400 text-sm">

      {/* Slim system status bar */}
      <div className="border-b border-slate-800/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-slate-300 text-xs">
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

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">

          {/* Brand + mission */}
          <div className="col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center p-1 shadow-md shadow-blue-600/30">
                <div className="w-full h-full bg-[#0b0d14] rounded-md flex items-center justify-center">
                  <div className="w-3 h-3 border border-blue-400 rotate-45" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">AEVUM PRIME</span>
            </div>

            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              A modern financial technology platform built around transparency, security and user control.
            </p>

            <button
              onClick={onOpenAccessRequest}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md shadow-blue-600/20"
            >
              Request Access
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title} className="space-y-3.5">
              <div className="text-xs font-bold uppercase tracking-wider text-white">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={link.onClick}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-sm"
                    >
                      <span>{link.label}</span>
                      {link.external && <ArrowUpRight className="w-3 h-3 text-slate-600" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Social row */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            Follow the network
          </div>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, Icon }) => (
              <button
                key={label}
                aria-label={label}
                className="w-10 h-10 rounded-xl bg-[#0b0f1a] border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-[#101728] transition-all flex items-center justify-center cursor-pointer"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
            {onOpenScreenshot && (
              <button
                onClick={onOpenScreenshot}
                aria-label="Download full page snapshot"
                className="w-10 h-10 rounded-xl bg-[#0b0f1a] border border-slate-800 text-slate-400 hover:text-blue-300 hover:border-blue-500/50 transition-all flex items-center justify-center cursor-pointer"
              >
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Legal / risk disclosures */}
        <div className="mt-8 pt-8 border-t border-slate-800/80 space-y-4 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong className="text-slate-400">Risk Disclosure:</strong> Digital assets are volatile and involve significant risk, including the potential loss of principal. Nothing herein constitutes investment, legal, or tax advice. Aevum Prime provides technology infrastructure and multi-party computation software; custodial services are delivered through licensed, qualified trust companies where applicable, with client assets held bankruptcy-remote and segregated 1:1 from company operating capital.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-slate-500">
              © 2026 Aevum Prime, Inc. All rights reserved. Registered in Zurich, Switzerland and New York, USA.
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => scrollTo('transparency-center-section')} className="hover:text-slate-300 cursor-pointer">Terms</button>
              <span className="text-slate-700">•</span>
              <button onClick={() => scrollTo('transparency-center-section')} className="hover:text-slate-300 cursor-pointer">Privacy</button>
              <span className="text-slate-700">•</span>
              <button onClick={onOpenSecurityModal} className="hover:text-slate-300 cursor-pointer">Security</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
