import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  FileText, 
  Percent, 
  Network, 
  Server, 
  History, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Search, 
  Filter,
  ArrowUpRight,
  Database,
  Lock,
  Cpu,
  RefreshCw,
  Fingerprint,
  Hash,
  BadgeCheck
} from 'lucide-react';
import { 
  TransparencyIllustration, 
  SecurityIllustration, 
  NetworkIllustration 
} from './illustrations/ArchitecturalIllustrations';
import { motion } from 'motion/react';

type TransparencySectionId = 
  | 'activity'
  | 'audits'
  | 'policies'
  | 'fees'
  | 'networks'
  | 'status'
  | 'notices';

export const TransparencyCenter: React.FC = () => {
  const [activeSection, setActiveSection] = useState<TransparencySectionId>('activity');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [policyFilter, setPolicyFilter] = useState<string>('all');

  const SECTIONS = [
    { id: 'activity' as const, label: 'Platform Activity', icon: Activity, count: '14,291 TXs/24h' },
    { id: 'audits' as const, label: 'Audit Information', icon: ShieldCheck, count: '6 Reports' },
    { id: 'policies' as const, label: 'Policies & Charters', icon: FileText, count: '8 Documents' },
    { id: 'fees' as const, label: 'Fee Schedule', icon: Percent, count: 'Transparent Tiering' },
    { id: 'networks' as const, label: 'Supported Networks', icon: Network, count: '18 Chains' },
    { id: 'status' as const, label: 'System Status', icon: Server, count: '99.998% Uptime' },
    { id: 'notices' as const, label: 'Historical Notices', icon: History, count: '14 Bulletins' },
  ];

  // 1. Platform Activity Data (Live Institutional Event Ledger)
  const PLATFORM_ACTIVITY_DATA = [
    {
      live: true,
      eventId: 'EVT-8F2A-0912',
      timestamp: '2026-08-15 13:14:02 UTC',
      category: 'Settlement',
      type: 'MPC Quorum Settlement',
      detail: 'BTC · Cold → Warm Relayer · 142.5000 BTC',
      valueUsd: '$12,825,000.00',
      source: 'Zurich Enclave #01',
      txHash: '0x8f2a49b29c01824a1e948c3b994827104b209a82',
      verification: 'Quorum-Signed',
      auditRef: 'SOC2-EY-2026-Q2'
    },
    {
      live: true,
      eventId: 'EVT-3C91-0911',
      timestamp: '2026-08-15 13:12:44 UTC',
      category: 'Execution',
      type: 'SOR Liquidity Execution',
      detail: 'USDC · Cross-Venue TWAP · Slippage −0.02 bps',
      valueUsd: '$5,000,000.00',
      source: 'Dark Pool Aggregator V4',
      txHash: '0x3c911894bf8201a0937c4018274a91920b7c9120',
      verification: 'Atomic-Relayed',
      auditRef: 'OZ-SOR-RELAY-2026'
    },
    {
      live: false,
      eventId: 'EVT-AA18-0908',
      timestamp: '2026-08-15 13:08:19 UTC',
      category: 'Attestation',
      type: 'Merkle Solvency Root Broadcast',
      detail: 'Consolidated Reserves · 100.0% Ratio · Root 0x4f…9a',
      valueUsd: '$48,291,480.00',
      source: 'Chainlink Oracle Feed #84',
      txHash: '0xaa18471b092847c20184b91048201948ba2019c4',
      verification: 'Merkle-Attested',
      auditRef: 'BDO-POR-2026-Q2'
    },
    {
      live: false,
      eventId: 'EVT-7109-0901',
      timestamp: '2026-08-15 13:01:55 UTC',
      category: 'Staking',
      type: 'Consensus Validator Delegation',
      detail: 'ETH · Validator Staking Shard · Epoch #392,104',
      valueUsd: '$4,480,000.00',
      source: 'Singapore Node Pod #03',
      txHash: '0x7109284b102948201c9018472019482019482019',
      verification: 'Chain-Final',
      auditRef: 'CMVP-CERT-#4928'
    },
    {
      live: false,
      eventId: 'EVT-BB29-0849',
      timestamp: '2026-08-15 12:49:10 UTC',
      category: 'Compliance',
      type: 'FATF Travel Rule Dispatch',
      detail: 'EURC · Inter-VASP Transfer · 2,500,000.00 EURC',
      valueUsd: '$2,750,000.00',
      source: 'TRP V2 Gateway (Swiss VASP)',
      txHash: '0xbb29401847201948201948201948201948201948',
      verification: 'ZK-Verified',
      auditRef: 'FATF-R16 / TRP-V2'
    },
    {
      live: false,
      eventId: 'EVT-D4C1-0842',
      timestamp: '2026-08-15 12:42:37 UTC',
      category: 'Settlement',
      type: 'Fedwire Fiat On-Ramp Reconciliation',
      detail: 'USD · Qualified Custodian Wire · Segregated Credit',
      valueUsd: '$9,600,000.00',
      source: 'NY Qualified Custody Escrow',
      txHash: '0xd4c1094820194820194820194820194820194820',
      verification: 'Quorum-Signed',
      auditRef: 'SOC2-EY-2026-Q2'
    },
    {
      live: false,
      eventId: 'EVT-19AF-0836',
      timestamp: '2026-08-15 12:36:11 UTC',
      category: 'Staking',
      type: 'Daily Staking Reward Harvest',
      detail: 'ETH · Auto-Compounder · 3.92% APY Accrual',
      valueUsd: '$184,204.11',
      source: 'PoS Delegation Pool',
      txHash: '0x19af094820194820194820194820194820194820',
      verification: 'Chain-Final',
      auditRef: 'CMVP-CERT-#4928'
    },
    {
      live: false,
      eventId: 'EVT-6E20-0828',
      timestamp: '2026-08-15 12:28:54 UTC',
      category: 'Attestation',
      type: 'FIPS Enclave Health Attestation',
      detail: 'HSM · Zero-Trace Memory Wipe Proof · Zurich #01',
      valueUsd: '—',
      source: 'FIPS 140-3 HSM #01',
      txHash: '0x6e20094820194820194820194820194820194820',
      verification: 'Merkle-Attested',
      auditRef: 'CMVP-CERT-#4928'
    }
  ];

  // Category accent tokens (Bloomberg-terminal style category chips)
  const CATEGORY_ACCENT: Record<string, { text: string; bg: string; border: string }> = {
    Settlement: { text: 'text-blue-300', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    Execution: { text: 'text-cyan-300', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
    Attestation: { text: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    Staking: { text: 'text-indigo-300', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
    Compliance: { text: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  };

  // Live institutional KPI strip (dashboard header metrics)
  const KPI_METRICS = [
    { label: 'Live Feed', value: 'STREAMING', accent: 'text-emerald-400', pulse: true },
    { label: 'Latest Block', value: '#892,104', accent: 'text-white', pulse: false },
    { label: 'Reserve Ratio', value: '100.0%', accent: 'text-emerald-400', pulse: false },
    { label: 'Events · 24h', value: '14,291', accent: 'text-white', pulse: false },
    { label: 'Avg Finality', value: '18 ms', accent: 'text-blue-400', pulse: false },
    { label: 'Infra Uptime', value: '99.998%', accent: 'text-white', pulse: false },
  ];

  // 2. Audit Reports Data
  const AUDIT_DATA = [
    {
      title: 'SOC 2 Type II Compliance Attestation',
      auditor: 'Ernst & Young LLP (Independent)',
      period: 'Jan 01, 2026 – Jun 30, 2026',
      scope: 'Security, Availability, Confidentiality & Privacy Trust Services Criteria',
      reportId: 'SOC2-EY-2026-Q2-8491',
      hash: 'SHA256: 4f8a9b201847c201847201948201948201948201948201948201948201948201',
      status: 'Unqualified Clean Opinion'
    },
    {
      title: 'FIPS 140-3 Level 3 Hardware Security Module Audit',
      auditor: 'NIST Cryptographic Module Validation Program (CMVP)',
      period: 'Annual Continuous Certification 2026',
      scope: 'Physical tamper resistance, zero-trace memory wiping & key zeroization',
      reportId: 'CMVP-CERT-#4928',
      hash: 'SHA256: a184720194820194820194820194820194820194820194820194820194820194',
      status: 'Certified Active'
    },
    {
      title: 'MPC-CMP Threshold Cryptography Formal Verification',
      auditor: 'Trail of Bits',
      period: 'Completed May 14, 2026',
      scope: 'Mathematical protocol validation for zero-knowledge 2-of-3 TSS quorum',
      reportId: 'TOB-MPC-CMP-V4.2',
      hash: 'SHA256: 7c20184720194820194820194820194820194820194820194820194820194820',
      status: '0 Critical / 0 High Findings'
    },
    {
      title: 'Smart Contract & Relayer Infrastructure Security Audit',
      auditor: 'OpenZeppelin Security Advisory',
      period: 'Completed April 28, 2026',
      scope: 'Smart Order Routing (SOR), atomicity, reentrancy & oracle integration',
      reportId: 'OZ-SOR-RELAY-2026',
      hash: 'SHA256: 9e20184720194820194820194820194820194820194820194820194820194820',
      status: 'Passed All Invariants'
    },
    {
      title: 'Quarterly Merkle Tree Proof of Reserve Attestation',
      auditor: 'BDO Global Digital Assets Practice',
      period: 'As of June 30, 2026',
      scope: 'Full physical & on-chain verification of all client segregated asset balances',
      reportId: 'BDO-POR-2026-Q2',
      hash: 'SHA256: b482019482019482019482019482019482019482019482019482019482019482',
      status: '100.0% Reserve Match'
    }
  ];

  // 3. Policies & Legal Frameworks
  const POLICIES_DATA = [
    {
      id: 'custody-segregation',
      title: 'Bankruptcy-Remote Asset Segregation Charter',
      category: 'Custodial Legal Terms',
      lastUpdated: '2026-06-15',
      governingLaw: 'Swiss Federal Intermediated Securities Act (FISA) / US UCC Article 8',
      summary: 'Explicit legal declaration that all client digital assets are held off-balance sheet and cannot be claimed by creditors or company operational liabilities.',
      ref: 'DOC-POL-CUST-2026.01'
    },
    {
      id: 'travel-rule',
      title: 'FATF Recommendation 16 / Travel Rule Compliance Policy',
      category: 'AML / Regulatory',
      lastUpdated: '2026-05-20',
      governingLaw: 'FATF Guidance for VASPs / FINMA Circular 2019/7',
      summary: 'Mandatory cryptographic payload transmission of originator and beneficiary metadata for all inter-VASP transfers exceeding $1,000 threshold.',
      ref: 'DOC-POL-TRP-2026.04'
    },
    {
      id: 'key-management',
      title: 'Threshold MPC Key Management & Disaster Recovery Policy',
      category: 'Security Architecture',
      lastUpdated: '2026-04-10',
      governingLaw: 'ISO/IEC 27001:2022 / NIST SP 800-57',
      summary: 'Strict zero-knowledge procedures governing geographic shard distribution, time-locked administrative recovery, and physical enclave access logs.',
      ref: 'DOC-POL-KMS-2026.02'
    },
    {
      id: 'sanctions-screening',
      title: 'Automated Global Sanctions Screening & Asset Freezing Policy',
      category: 'AML / Regulatory',
      lastUpdated: '2026-07-01',
      governingLaw: 'OFAC / EU Sanctions List / UN Security Council Resolutions',
      summary: 'Continuous 15-minute mempool screening of all interaction addresses against real-time global sanctions databases with automated multi-sig freeze protocols.',
      ref: 'DOC-POL-AML-2026.09'
    }
  ];

  // 4. Institutional Fee Schedule Data
  const FEE_TIERS_DATA = [
    {
      tier: 'Institutional Tier 1',
      aumRange: '$1M – $25M',
      custodyFeeBps: '4.5 bps / yr',
      executionFeeBps: '1.2 bps',
      stakingCommPercent: '4.0%',
      apiSla: 'Standard Dedicated (10k req/s)',
      settlementTime: 'Sub-second'
    },
    {
      tier: 'Institutional Tier 2',
      aumRange: '$25M – $100M',
      custodyFeeBps: '3.0 bps / yr',
      executionFeeBps: '0.8 bps',
      stakingCommPercent: '3.0%',
      apiSla: 'Priority Dedicated (50k req/s)',
      settlementTime: 'Sub-second'
    },
    {
      tier: 'Prime Enterprise Tier',
      aumRange: '$100M+',
      custodyFeeBps: '1.8 bps / yr',
      executionFeeBps: '0.4 bps',
      stakingCommPercent: '2.0%',
      apiSla: 'Ultra-Low Latency Co-located (100k+ req/s)',
      settlementTime: 'Sub-second'
    }
  ];

  // 5. Supported Networks Specifications
  const SUPPORTED_NETWORKS_DATA = [
    {
      network: 'Bitcoin (Native / Taproot / Lightning)',
      symbol: 'BTC',
      consensus: 'Proof of Work',
      finalityTime: '1 – 2 Blocks (Instant via Fedwire Relayer)',
      custodyScheme: 'Multi-Sig Schnorr / MPC-CMP 2-of-3',
      reserveStatus: 'Supported (Segregated Reserve)',
      nodeLatency: '14 ms'
    },
    {
      network: 'Ethereum Mainnet (EVM / PoS)',
      symbol: 'ETH',
      consensus: 'Proof of Stake (Dencun / Pectra)',
      finalityTime: '2 Epochs (~12.8 mins) / Sub-second Warm Relayer',
      custodyScheme: 'Smart Contract Vault / TSS Shards',
      reserveStatus: 'Supported (Direct Staking Validator)',
      nodeLatency: '11 ms'
    },
    {
      network: 'Solana (High-Throughput SVM)',
      symbol: 'SOL',
      consensus: 'Proof of History / PoS',
      finalityTime: '400 ms (Optimistic Finality)',
      custodyScheme: 'Ed25519 MPC Threshold Enclave',
      reserveStatus: 'Supported (Direct Validator Node)',
      nodeLatency: '18 ms'
    },
    {
      network: 'Arbitrum One / Optimism / Base (EVM L2s)',
      symbol: 'ETH-L2',
      consensus: 'Optimistic Rollup / ZK Validium',
      finalityTime: 'Instant Soft Confirmation',
      custodyScheme: 'L2 Smart Vault Relay',
      reserveStatus: 'Supported (Aggregated Liquidity)',
      nodeLatency: '9 ms'
    },
    {
      network: 'Polygon PoS / zkEVM',
      symbol: 'POL',
      consensus: 'Proof of Stake / ZK Prover',
      finalityTime: '2 Seconds (Fast-Path)',
      custodyScheme: 'MPC Sharded Relayer',
      reserveStatus: 'Supported',
      nodeLatency: '16 ms'
    }
  ];

  // 6. Real-Time System Status & Component Health
  const SYSTEM_STATUS_DATA = [
    {
      component: 'Zurich FIPS 140-3 Hardware Enclave #01',
      type: 'Physical HSM Key Shard Host',
      status: 'Operational (100% Attested)',
      uptime30d: '100.00%',
      latency: '12 ms',
      lastHealthCheck: '2026-08-15 13:15:00 UTC'
    },
    {
      component: 'New York Qualified Custody Cold Escrow',
      type: 'Segregated Trust Storage Core',
      status: 'Operational',
      uptime30d: '100.00%',
      latency: '18 ms',
      lastHealthCheck: '2026-08-15 13:14:50 UTC'
    },
    {
      component: 'Smart Order Routing (SOR) Cross-Venue Relayer',
      type: 'Algorithmic Execution Engine',
      status: 'Operational',
      uptime30d: '99.998%',
      latency: '0.8 ms',
      lastHealthCheck: '2026-08-15 13:15:04 UTC'
    },
    {
      component: 'FATF Travel Rule Protocol (TRP V2) Message Bus',
      type: 'Inter-VASP Compliance Messenger',
      status: 'Operational',
      uptime30d: '99.995%',
      latency: '24 ms',
      lastHealthCheck: '2026-08-15 13:14:40 UTC'
    },
    {
      component: 'Real-Time Merkle Tree Proof of Solvency Feed',
      type: 'Cryptographic Oracle Attestation',
      status: 'Operational',
      uptime30d: '100.00%',
      latency: '5 ms',
      lastHealthCheck: '2026-08-15 13:15:02 UTC'
    }
  ];

  // 7. Historical Notices & Incident Log
  const HISTORICAL_NOTICES_DATA = [
    {
      id: 'NOT-2026-08-02',
      date: '2026-08-02 04:00 UTC',
      type: 'Scheduled Maintenance',
      severity: 'Low',
      title: 'FIPS Hardware Enclave Firmware Patch (v4.8.2 Applied)',
      description: 'Scheduled redundant hot-failover upgrade of Swiss HSM units. Zero customer downtime; all secondary quorums handled signing seamlessly.',
      sourceTicket: 'JIRA-SEC-8491',
      resolvedTimestamp: '2026-08-02 04:22 UTC'
    },
    {
      id: 'NOT-2026-07-18',
      date: '2026-07-18 19:40 UTC',
      type: 'Network Upgrade Notice',
      severity: 'Informational',
      title: 'Ethereum Pectra Hard Fork Readiness Confirmation',
      description: 'All prime validator clusters and multi-sig smart contracts updated to client version Geth v1.14 / Prysm v5.2. No transaction disruption.',
      sourceTicket: 'DEV-ETH-3920',
      resolvedTimestamp: '2026-07-18 20:00 UTC'
    },
    {
      id: 'NOT-2026-06-29',
      date: '2026-06-29 02:15 UTC',
      type: 'Regulatory Protocol Update',
      severity: 'Informational',
      title: 'EU MiCA & FATF Travel Rule Protocol v2.1 Migration',
      description: 'Automated encrypted compliance fields updated to adhere to latest European Banking Authority VASP technical standards.',
      sourceTicket: 'COMP-EBA-2026',
      resolvedTimestamp: '2026-06-29 02:40 UTC'
    }
  ];

  return (
    <section id="transparency-center-section" className="py-20 sm:py-28 bg-[#05070d] relative overflow-hidden border-t border-slate-800">
      
      {/* Background Architectural Grid & Subtle Radial Beam */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/05 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Data-Center Aesthetic */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
              <Database className="w-3.5 h-3.5" />
              VERIFIABLE EVIDENCE & PUBLIC REPOSITORY
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Transparency Center
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl">
              Live cryptographic telemetry, complete independent audit reports, governing legal charters, itemized fee schedules, and infrastructure uptime logs.
            </p>
          </div>

          {/* Real-Time Telemetry Pulse Badge */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#090d18] border border-slate-800 font-mono text-xs text-slate-300 self-start md:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Live Attestation Feed</div>
              <div className="text-white font-bold">Block #892,104 • Sync 100%</div>
            </div>
          </div>
        </div>

        {/* Institutional KPI Strip (Bloomberg / Stripe terminal aesthetic) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 rounded-2xl border border-slate-800 bg-[#080b14] overflow-hidden mb-8 divide-x divide-y sm:divide-y-0 divide-slate-800">
          {KPI_METRICS.map((kpi) => (
            <div key={kpi.label} className="p-4 flex flex-col gap-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                {kpi.pulse && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                {kpi.label}
              </div>
              <div className={`text-lg font-extrabold font-mono ${kpi.accent}`}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Trust Statement Band */}
        <div className="relative rounded-2xl border border-blue-500/25 bg-gradient-to-r from-[#0a0f1e] via-[#080b16] to-[#0a0f1e] px-6 py-6 sm:py-7 mb-10 overflow-hidden">
          <div className="absolute -top-16 -right-10 w-64 h-64 bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Every important event leaves a trace.
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                Custody, execution, staking, and compliance — each action emits a timestamped, categorized, and independently verifiable record, linked to its governing audit.
              </p>
            </div>
          </div>
        </div>

        {/* Institutional Navigation Tab Strip (Data Center Layout) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-800/80 no-scrollbar">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap flex items-center gap-2.5 border ${
                  isActive
                    ? 'bg-[#10172c] border-blue-500 text-white shadow-lg shadow-blue-500/10'
                    : 'bg-[#090c16] border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-[#0d1220]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                <span>{sec.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${
                  isActive ? 'bg-blue-500/20 text-blue-300' : 'bg-[#060810] text-slate-500'
                }`}>
                  {sec.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ================= DATA VIEW CONTAINER ================= */}
        <div className="rounded-3xl bg-[#080b14] border border-slate-800 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
          
          {/* ================= 1. PLATFORM ACTIVITY ================= */}
          {activeSection === 'activity' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    <span>Real-Time Execution & Quorum Settlement Ledger</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Direct cryptographic stream from physical enclaves, SOR execution routers, and Merkle tree roots.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Streaming Live
                  </span>
                </div>
              </div>

              {/* Institutional Event Ledger Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#05070e]">
                <table className="w-full text-left text-xs font-mono min-w-[960px]">
                  <thead className="bg-[#0b0e1b] text-slate-400 uppercase text-[10px] border-b border-slate-800 tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Live</th>
                      <th className="py-3 px-4">Timestamp (UTC)</th>
                      <th className="py-3 px-4">Event ID</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Event / Detail</th>
                      <th className="py-3 px-4 text-right">Value (USD)</th>
                      <th className="py-3 px-4">Source</th>
                      <th className="py-3 px-4">Verification</th>
                      <th className="py-3 px-4">Audit Ref</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {PLATFORM_ACTIVITY_DATA.map((ev, idx) => {
                      const cat = CATEGORY_ACCENT[ev.category] ?? CATEGORY_ACCENT.Settlement;
                      return (
                        <motion.tr
                          key={idx}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
                          className="hover:bg-[#0e1324] transition-colors align-top"
                        >
                          {/* Live status */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {ev.live ? (
                              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                </span>
                                <span className="text-[10px] font-bold uppercase">Live</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-slate-500">
                                <span className="w-2 h-2 rounded-full bg-slate-600" />
                                <span className="text-[10px] uppercase">Sealed</span>
                              </span>
                            )}
                          </td>
                          {/* Timestamp */}
                          <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="w-3 h-3 text-slate-500" />
                              {ev.timestamp}
                            </span>
                          </td>
                          {/* Event ID */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-blue-300 font-bold hover:underline cursor-pointer">
                              <Hash className="w-3 h-3 opacity-70" />
                              {ev.eventId}
                            </span>
                          </td>
                          {/* Category */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase ${cat.bg} ${cat.text} ${cat.border}`}>
                              {ev.category}
                            </span>
                          </td>
                          {/* Event / Detail */}
                          <td className="py-3.5 px-4 min-w-[240px]">
                            <div className="text-white font-semibold">{ev.type}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{ev.detail}</div>
                          </td>
                          {/* Value */}
                          <td className="py-3.5 px-4 text-right font-bold text-white font-tabular whitespace-nowrap">
                            {ev.valueUsd}
                          </td>
                          {/* Source */}
                          <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                            {ev.source}
                          </td>
                          {/* Verification */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                              <BadgeCheck className="w-3 h-3" />
                              {ev.verification}
                            </span>
                          </td>
                          {/* Audit Ref */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-slate-300 hover:text-blue-300 cursor-pointer">
                              {ev.auditRef}
                              <ExternalLink className="w-3 h-3 opacity-60" />
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Solvency Proof Summary Card */}
              <div className="p-4 rounded-2xl bg-[#090d1a] border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="text-white font-bold block">100.0% Cryptographic Solvency Proof Active</span>
                    <span className="text-slate-400">Merkle Root: 0x4f92...a891 (Attested every 300 blocks)</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all flex items-center gap-2 shadow-md">
                  <span>Verify Merkle Tree</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {/* ================= 2. AUDIT INFORMATION ================= */}
          {activeSection === 'audits' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="p-6 rounded-2xl bg-[#060812] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                    INDEPENDENT CRYPTOGRAPHIC VERIFICATION
                  </div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>Audit Reports & Formal Certifications</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono max-w-xl">
                    Third-party verified compliance reports, cryptographic proofs, and continuous penetration test results.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <SecurityIllustration size="sm" className="scale-110" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AUDIT_DATA.map((audit, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-[#060810] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {audit.status}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">{audit.period}</span>
                      </div>

                      <h4 className="text-base font-bold text-white">
                        {audit.title}
                      </h4>
                      
                      <div className="text-xs text-blue-400 font-semibold font-mono">
                        Auditor: {audit.auditor}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        <strong>Scope:</strong> {audit.scope}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Report ID:</span>
                        <span className="text-slate-200 font-bold">{audit.reportId}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {audit.hash}
                      </div>

                      <button className="w-full mt-2 py-2 rounded-xl bg-[#0f1424] hover:bg-[#151c32] text-blue-300 font-semibold text-xs transition-all border border-blue-500/20 flex items-center justify-center gap-2">
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Full Audit PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= 3. POLICIES & LEGAL FRAMEWORKS ================= */}
          {activeSection === 'policies' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span>Governing Legal Charters & Institutional Policies</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Enforceable operating frameworks, bankruptcy-remote asset segregation clauses, and FATF Travel Rule protocols.
                </p>
              </div>

              <div className="space-y-4">
                {POLICIES_DATA.map((policy) => (
                  <div
                    key={policy.id}
                    className="p-5 rounded-2xl bg-[#060810] border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-bold">
                          {policy.category}
                        </span>
                        <h4 className="text-base font-bold text-white">
                          {policy.title}
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-slate-500">
                        Ref: {policy.ref} • Updated: {policy.lastUpdated}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {policy.summary}
                    </p>

                    <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
                      <div className="text-slate-400">
                        Governing Law: <strong className="text-slate-200">{policy.governingLaw}</strong>
                      </div>

                      <button className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
                        <span>View Document Charter</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= 4. INSTITUTIONAL FEE SCHEDULE ================= */}
          {activeSection === 'fees' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Percent className="w-5 h-5 text-amber-400" />
                  <span>Institutional Fee Schedule & Execution Tiers</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Transparent, contractually guaranteed fee tiering with zero maker/taker spreads or hidden custody markups.
                </p>
              </div>

              {/* Fee Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#05070e]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#0b0e1b] text-slate-400 uppercase text-[10px] border-b border-slate-800 tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Tier Designation</th>
                      <th className="py-3.5 px-4">AUM Threshold</th>
                      <th className="py-3.5 px-4 text-right">Custody Fee (Annual)</th>
                      <th className="py-3.5 px-4 text-right">Execution Spread (SOR)</th>
                      <th className="py-3.5 px-4 text-right">Staking Commission</th>
                      <th className="py-3.5 px-4">Dedicated API SLA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {FEE_TIERS_DATA.map((tier, idx) => (
                      <tr key={idx} className="hover:bg-[#0e1324] transition-colors">
                        <td className="py-4 px-4 font-bold text-white">
                          {tier.tier}
                        </td>
                        <td className="py-4 px-4 text-blue-400 font-semibold">
                          {tier.aumRange}
                        </td>
                        <td className="py-4 px-4 text-right font-tabular text-slate-200">
                          {tier.custodyFeeBps}
                        </td>
                        <td className="py-4 px-4 text-right font-tabular text-emerald-400 font-bold">
                          {tier.executionFeeBps}
                        </td>
                        <td className="py-4 px-4 text-right font-tabular text-amber-400">
                          {tier.stakingCommPercent}
                        </td>
                        <td className="py-4 px-4 text-slate-400">
                          {tier.apiSla}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-[#090d1a] border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <div className="font-bold text-white">Zero Gas Overhead Guarantee:</div>
                <p className="text-slate-400 leading-relaxed">
                  On-chain network gas costs are passed through directly with zero operator markups. Entities utilizing the APEX-UTL utility token receive an additional 35% programmatic discount on SOR routing relayer costs.
                </p>
              </div>

            </div>
          )}

          {/* ================= 5. SUPPORTED NETWORKS ================= */}
          {activeSection === 'networks' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Network className="w-5 h-5 text-indigo-400" />
                  <span>Supported Blockchain Networks & Cryptographic Schemes</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Technical specifications, consensus algorithms, finality benchmarks, and key derivation standards.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#05070e]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#0b0e1b] text-slate-400 uppercase text-[10px] border-b border-slate-800 tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Network & Symbol</th>
                      <th className="py-3.5 px-4">Consensus Model</th>
                      <th className="py-3.5 px-4">Finality Time</th>
                      <th className="py-3.5 px-4">Custody Standard</th>
                      <th className="py-3.5 px-4">Reserve Tier</th>
                      <th className="py-3.5 px-4 text-right">Node Ping</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {SUPPORTED_NETWORKS_DATA.map((net, idx) => (
                      <tr key={idx} className="hover:bg-[#0e1324] transition-colors">
                        <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>{net.network}</span>
                        </td>
                        <td className="py-4 px-4 text-slate-400">
                          {net.consensus}
                        </td>
                        <td className="py-4 px-4 text-blue-300 font-semibold">
                          {net.finalityTime}
                        </td>
                        <td className="py-4 px-4 text-slate-200">
                          {net.custodyScheme}
                        </td>
                        <td className="py-4 px-4 text-emerald-400 font-bold">
                          {net.reserveStatus}
                        </td>
                        <td className="py-4 px-4 text-right text-slate-400 font-tabular">
                          {net.nodeLatency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ================= 6. SYSTEM STATUS ================= */}
          {activeSection === 'status' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Server className="w-5 h-5 text-emerald-400" />
                    <span>Real-Time Infrastructure Health & Hardware Status</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Continuous heartbeat telemetry from physical enclaves, SOR execution routers, and Merkle tree oracles.
                  </p>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ALL SYSTEMS OPERATIONAL (99.998%)</span>
                </div>
              </div>

              <div className="space-y-3">
                {SYSTEM_STATUS_DATA.map((sys, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#060810] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
                      <div>
                        <div className="font-bold text-white">{sys.component}</div>
                        <div className="text-[10px] text-slate-400">{sys.type}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 self-end sm:self-auto">
                      <div className="text-right">
                        <div className="text-slate-400 text-[10px]">30-DAY UPTIME</div>
                        <div className="text-emerald-400 font-bold">{sys.uptime30d}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-slate-400 text-[10px]">LATENCY</div>
                        <div className="text-blue-400 font-bold">{sys.latency}</div>
                      </div>

                      <div className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">
                        {sys.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= 7. HISTORICAL NOTICES ================= */}
          {activeSection === 'notices' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-slate-400" />
                  <span>Historical Maintenance & Security Bulletins</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Permanent immutable log of scheduled protocol upgrades, firmware migrations, and advisory notices.
                </p>
              </div>

              <div className="space-y-4">
                {HISTORICAL_NOTICES_DATA.map((not) => (
                  <div
                    key={not.id}
                    className="p-5 rounded-2xl bg-[#060810] border border-slate-800 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-bold">
                          {not.type}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {not.title}
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-slate-500">
                        {not.date}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {not.description}
                    </p>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Source Ticket: <strong className="text-slate-200">{not.sourceTicket}</strong></span>
                      <span className="text-emerald-400">Resolved: {not.resolvedTimestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
