import React, { useState } from 'react';
import { 
  Coins, 
  ShieldAlert, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeftRight, 
  Sliders, 
  Percent, 
  AlertTriangle, 
  Lock, 
  FileText, 
  Layers, 
  Cpu, 
  Zap, 
  Scale, 
  Building2, 
  WalletCards,
  Info,
  ChevronRight
} from 'lucide-react';

interface AppCoinUtilityProps {
  onOpenAccessRequest?: () => void;
}

type TabType = 'purpose' | 'utility' | 'fees' | 'limitations' | 'acquisition' | 'redemption' | 'risks';

export const AppCoinUtility: React.FC<AppCoinUtilityProps> = ({ onOpenAccessRequest }) => {
  const [activeTab, setActiveTab] = useState<TabType>('purpose');

  const TABS: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'purpose', label: '01 Purpose & Function', icon: Cpu },
    { id: 'utility', label: '02 Where It Can Be Used', icon: Layers },
    { id: 'fees', label: '03 Fee Offsets & Costs', icon: Percent },
    { id: 'limitations', label: '04 Structural Limitations', icon: Lock },
    { id: 'acquisition', label: '05 Acquisition Rails', icon: WalletCards },
    { id: 'redemption', label: '06 Redemption & Transfer', icon: ArrowLeftRight },
    { id: 'risks', label: '07 Risk Disclosures', icon: ShieldAlert },
  ];

  return (
    <section id="app-coin-section" className="py-20 sm:py-28 bg-[#06080e] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-blue-600/05 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Coins className="w-3.5 h-3.5" />
            PROTOCOL UTILITY SPECIFICATION
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Institutional App Coin (APEX-UTL)
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            A non-speculative, technical coordination token designed solely for programmatic gas relaying, fee discounting tiers, API rate metering, and governance attestations.
          </p>
        </div>

        {/* Regulatory & Utility Mandate Banner */}
        <div className="p-4 rounded-2xl bg-[#0a0e1a] border border-blue-500/30 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase font-bold text-white tracking-wider">
                Strict Technical Utility Framework
              </div>
              <div className="text-xs text-slate-400">
                Not an investment product. Contains zero equity rights, dividend entitlements, or speculative price appreciation mechanisms.
              </div>
            </div>
          </div>
          <div className="px-3 py-1 rounded-lg bg-[#070910] border border-slate-800 text-[11px] font-mono text-emerald-400 font-semibold flex-shrink-0">
            FINMA / Q-Utility Compliant
          </div>
        </div>

        {/* Interactive Specification Navigator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: TAB NAVIGATION LIST ================= */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
              Specification Sections
            </div>

            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#0f1424] border-blue-500 shadow-lg shadow-blue-500/10 text-white ring-1 ring-blue-500/30'
                      : 'bg-[#080b13] border-slate-800/80 hover:border-slate-700 hover:bg-[#0c101c] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl transition-colors ${
                      isSelected ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800/60 text-slate-400 group-hover:text-slate-200'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold tracking-wide">
                      {tab.label}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    isSelected ? 'text-blue-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                  }`} />
                </button>
              );
            })}

            {/* Quick Metrics Badge */}
            <div className="mt-6 p-4 rounded-2xl bg-[#090c16] border border-slate-800 text-xs font-mono space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Token Standard:</span>
                <span className="text-white font-bold">ERC-20 / Native Shard</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Circulating Utility:</span>
                <span className="text-blue-400 font-bold">Fixed Supply Engine</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Contract Audit:</span>
                <span className="text-emerald-400 font-bold">Trail of Bits (Verified)</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: DETAILED CONTENT VIEW ================= */}
          <div className="lg:col-span-8 rounded-3xl bg-[#0b0f1b] border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* TAB 1: PURPOSE */}
            {activeTab === 'purpose' && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">SECTION 01</span>
                    <h3 className="text-2xl font-extrabold text-white">Functional Purpose</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  The App Coin (APEX-UTL) serves as an internal cryptographic coordination mechanism engineered strictly for system accounting, transaction authorization metering, and infrastructure gas settlement.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#070911] border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-400" />
                      Atomic Relayer Fuel
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Powers sub-second atomic cross-chain routing across 45+ liquidity venues without requiring users to hold distinct volatile native gas tokens (e.g., SOL, ETH, AVAX) across multiple balance sheets.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#070911] border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Deterministic Accounting
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Provides institutional treasuries with unified denomination for enterprise API consumption, multi-signer governance logging, and audit trail generation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: UTILITY */}
            {activeTab === 'utility' && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">SECTION 02</span>
                    <h3 className="text-2xl font-extrabold text-white">Where It Can Be Used</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  The token is accepted strictly within the enterprise operating environment for four concrete technical operations:
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#070911] border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 font-mono text-xs flex items-center justify-center flex-shrink-0 font-bold">1</span>
                    <div>
                      <div className="text-xs font-bold text-white">Smart Order Routing (SOR) Relayer Costs</div>
                      <div className="text-xs text-slate-400 mt-0.5">Offsets execution slippage calculations and dark pool connection hops.</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#070911] border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 font-mono text-xs flex items-center justify-center flex-shrink-0 font-bold">2</span>
                    <div>
                      <div className="text-xs font-bold text-white">FIPS 140-3 Hardware Enclave Attestation Fees</div>
                      <div className="text-xs text-slate-400 mt-0.5">Covers cryptographic proof generation from Swiss and US physical hardware security modules.</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#070911] border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 font-mono text-xs flex items-center justify-center flex-shrink-0 font-bold">3</span>
                    <div>
                      <div className="text-xs font-bold text-white">High-Throughput WebSocket API Rate Allocations</div>
                      <div className="text-xs text-slate-400 mt-0.5">Unlocks enterprise dedicated endpoints capable of 100,000+ telemetry queries/sec.</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#070911] border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 font-mono text-xs flex items-center justify-center flex-shrink-0 font-bold">4</span>
                    <div>
                      <div className="text-xs font-bold text-white">FATF Travel Rule Digital Certificate Generation</div>
                      <div className="text-xs text-slate-400 mt-0.5">Programmatic issuance of zero-knowledge compliance attestations between regulated VASPs.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: FEES */}
            {activeTab === 'fees' && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">SECTION 03</span>
                    <h3 className="text-2xl font-extrabold text-white">Fee Offsets & Programmatic Costs</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  Institutions utilizing the utility token receive transparent, fixed mathematical reductions on execution overhead:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-4 rounded-2xl bg-[#070911] border border-slate-800">
                    <div className="text-2xl font-extrabold text-amber-400 font-mono">-35%</div>
                    <div className="text-xs font-bold text-white mt-1">SOR Relayer Discount</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">On high-frequency block fills</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#070911] border border-slate-800">
                    <div className="text-2xl font-extrabold text-blue-400 font-mono">Zero</div>
                    <div className="text-xs font-bold text-white mt-1">Gas Overhead Spread</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Raw on-chain cost pass-through</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#070911] border border-slate-800">
                    <div className="text-2xl font-extrabold text-emerald-400 font-mono">100%</div>
                    <div className="text-xs font-bold text-white mt-1">Itemized Receipts</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Verifiable on-chain logs</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#070911] border border-slate-800 text-xs text-slate-300 flex items-center gap-2.5">
                  <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Fee discounts apply solely to infrastructure operational costs and never modify third-party protocol staking rewards or raw exchange spreads.</span>
                </div>
              </div>
            )}

            {/* TAB 4: LIMITATIONS */}
            {activeTab === 'limitations' && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400">SECTION 04</span>
                    <h3 className="text-2xl font-extrabold text-white">Structural Limitations</h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="p-3.5 rounded-xl bg-[#070911] border border-slate-800 space-y-1">
                    <strong className="text-white block font-bold">No Governance Over Financial Capital</strong>
                    <p className="text-slate-400 leading-relaxed">
                      Holding the token grants zero voting power over client segregated assets, corporate treasury allocations, or smart contract liquidity balances.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#070911] border border-slate-800 space-y-1">
                    <strong className="text-white block font-bold">No Guaranteed Secondary Market Liquidity</strong>
                    <p className="text-slate-400 leading-relaxed">
                      The token is designed solely for in-platform utility and does not represent an agreement to maintain market-making or exchange listings.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#070911] border border-slate-800 space-y-1">
                    <strong className="text-white block font-bold">Velocity Caps & Anti-Hoarding Limits</strong>
                    <p className="text-slate-400 leading-relaxed">
                      Entity balances are capped relative to projected annual API and relayer volume to prevent artificial speculative accumulation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: ACQUISITION */}
            {activeTab === 'acquisition' && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400">
                    <WalletCards className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">SECTION 05</span>
                    <h3 className="text-2xl font-extrabold text-white">Acquisition Methods</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  Qualified institutional entities can acquire utility balances through three authorized, strictly audited channels:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 rounded-2xl bg-[#070911] border border-slate-800 space-y-2">
                    <Building2 className="w-5 h-5 text-cyan-400" />
                    <div className="font-bold text-white">Direct Enterprise Billing</div>
                    <p className="text-slate-400 leading-relaxed">
                      Acquired at a fixed rate via monthly corporate invoicing or automated fiat wire settlement.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#070911] border border-slate-800 space-y-2">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <div className="font-bold text-white">Real-Time Auto-Conversion</div>
                    <p className="text-slate-400 leading-relaxed">
                      Programmatically converted from USDC or EURC balances precisely at the moment of API execution.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#070911] border border-slate-800 space-y-2">
                    <Layers className="w-5 h-5 text-emerald-400" />
                    <div className="font-bold text-white">Node Operation Grants</div>
                    <p className="text-slate-400 leading-relaxed">
                      Allocated to qualified enterprise infrastructure partners hosting FIPS physical hardware signer pods.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: REDEMPTION */}
            {activeTab === 'redemption' && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-400">
                    <ArrowLeftRight className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">SECTION 06</span>
                    <h3 className="text-2xl font-extrabold text-white">Redemption & Transfer Mechanics</h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="p-4 rounded-2xl bg-[#070911] border border-slate-800 space-y-1.5">
                    <div className="font-bold text-white flex items-center justify-between">
                      <span>Internal Relayer Burn & Sweep</span>
                      <span className="text-[10px] font-mono text-emerald-400">Deterministic</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Tokens utilized for gas offsets and attestation fees are programmatically burned by smart contract relayers, permanently removing them from internal circulation.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#070911] border border-slate-800 space-y-1.5">
                    <div className="font-bold text-white flex items-center justify-between">
                      <span>Unused Credit Redemption</span>
                      <span className="text-[10px] font-mono text-blue-400">1:1 Refund</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Unconsumed utility tokens purchased via enterprise billing can be refunded back to fiat bank wires at nominal acquisition cost upon contract closeout, minus raw third-party gas consumed.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: RISKS */}
            {activeTab === 'risks' && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400">SECTION 07</span>
                    <h3 className="text-2xl font-extrabold text-white">Mandatory Risk Disclosures</h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-rose-200 space-y-1.5">
                    <strong className="text-white block font-bold">1. Technical & Smart Contract Vulnerability</strong>
                    <p className="text-slate-300 leading-relaxed">
                      Despite formal mathematical verification and multiple independent audits by Trail of Bits and OpenZeppelin, software bugs, blockchain hard forks, or network congestion may delay relayer settlement.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-rose-200 space-y-1.5">
                    <strong className="text-white block font-bold">2. Regulatory & Jurisdictional Treatment</strong>
                    <p className="text-slate-300 leading-relaxed">
                      Changes in global regulatory guidelines regarding digital utility tokens may restrict transferability or require modifications to the underlying relayer architecture.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-rose-200 space-y-1.5">
                    <strong className="text-white block font-bold">3. No Capital Appreciation Guarantee</strong>
                    <p className="text-slate-300 leading-relaxed">
                      This token is strictly an operating expense optimization instrument. Users should never acquire tokens under an expectation of financial return or price inflation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Action / Audit Verification Link */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Full Technical Whitepaper & Smart Contract Specification v2.6 Available</span>
              </div>

              <button
                onClick={onOpenAccessRequest}
                className="px-5 py-2 rounded-xl bg-[#121727] hover:bg-[#182035] text-blue-300 hover:text-white font-semibold text-xs transition-all border border-blue-500/30 flex items-center gap-1.5"
              >
                <span>Request Enterprise SLA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
