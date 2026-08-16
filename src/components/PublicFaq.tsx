import React, { useState, useMemo } from 'react';
import { 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  X, 
  Layers, 
  ArrowUpRight, 
  Database, 
  Coins, 
  AlertCircle 
} from 'lucide-react';
import { EmptyStateIllustration } from './illustrations/ArchitecturalIllustrations';

interface FaqItem {
  id: string;
  question: string;
  category: 'Withdrawals & Custody' | 'Security & Keys' | 'Legal & Solvency' | 'Trading & Liquidity' | 'Compliance & Travel Rule';
  keywords: string[];
  answerText: string;
  diagram: {
    title: string;
    steps: {
      num: string;
      label: string;
      sub: string;
      status: 'active' | 'success' | 'verified';
    }[];
  };
  example: {
    title: string;
    scenario: string;
    stepsDetail: string[];
  };
  relatedArticles: {
    title: string;
    category: string;
    readingTime: string;
  }[];
}

const FAQ_DATABASE: FaqItem[] = [
  {
    id: 'faq-withdrawal',
    question: 'How does withdrawal work?',
    category: 'Withdrawals & Custody',
    keywords: ['withdrawal', 'withdraw', 'transfer', 'mpc', 'settlement', 'payout', 'quorum', 'speed'],
    answerText: 'Institutional withdrawals execute through a deterministic multi-stage cryptographic pipeline: policy engine authorization, real-time sanctions/AML mempool screening, MPC-CMP 2-of-3 threshold signature computation across isolated hardware enclaves, and instant on-chain broadcast. Assets never pass through a single hot wallet or centralized private key.',
    diagram: {
      title: 'Deterministic Withdrawal Pipeline',
      steps: [
        { num: '01', label: 'Initiation & Auth', sub: 'SSO + WebAuthn FIDO2 Tier', status: 'verified' },
        { num: '02', label: 'Policy Engine', sub: 'Velocity & Whitelist Check', status: 'verified' },
        { num: '03', label: 'MPC Quorum', sub: '2-of-3 Enclave Key Shares', status: 'active' },
        { num: '04', label: 'On-Chain Broadcast', sub: 'Sub-second Node Dispatch', status: 'success' }
      ]
    },
    example: {
      title: 'Example: 50.00 BTC Treasury Withdrawal',
      scenario: 'Treasury Officer initiates a 50 BTC withdrawal to a cold custody counterparty reserve.',
      stepsDetail: [
        'Initiated via API with client Ed25519 signature payload.',
        'Policy Engine confirms destination is in pre-approved Whitelist Registry and within $5M hourly velocity cap.',
        'Secondary designated Signer receives time-locked push attestation on biometric hardware key.',
        'Zurich Enclave #01 and Singapore Enclave #03 compute joint zero-knowledge signature without exposing raw key.',
        'Transaction broadcast to Bitcoin mainnet in 320ms with verifiable raw TX hash.'
      ]
    },
    relatedArticles: [
      { title: 'Introduction to Keyless Threshold MPC Custody', category: 'Security', readingTime: '6 min read' },
      { title: 'Institutional Risk Controls & Velocity Limits', category: 'Risk', readingTime: '5 min read' }
    ]
  },
  {
    id: 'faq-mpc-keys',
    question: 'What is Keyless MPC and how does it prevent hacks?',
    category: 'Security & Keys',
    keywords: ['mpc', 'keyless', 'private keys', 'security', 'hack', 'shards', 'fips', 'threshold'],
    answerText: 'Unlike traditional custody where a single private key exists in memory, Multi-Party Computation (MPC-CMP) breaks cryptographic key generation into discrete mathematical shares. These shares remain permanently separated across FIPS 140-3 Level 3 hardware security modules in Zurich, New York, and Singapore, computing threshold signatures in zero-knowledge without ever assembling a complete private key.',
    diagram: {
      title: '2-of-3 Threshold Shard Topology',
      steps: [
        { num: 'S1', label: 'Client Enclave Share', sub: 'Customer Dedicated HSM', status: 'verified' },
        { num: 'S2', label: 'Swiss Custody Node', sub: 'FIPS 140-3 Zurich Vault', status: 'active' },
        { num: 'S3', label: 'Recovery Co-Signer', sub: 'Time-Locked Cold Shard', status: 'verified' },
        { num: 'SIG', label: 'Joint Proof Output', sub: 'Zero-Knowledge Signature', status: 'success' }
      ]
    },
    example: {
      title: 'Example: Compromised Server Mitigation',
      scenario: 'An attacker gains administrative root access to an internal infrastructure host.',
      stepsDetail: [
        'Attacker discovers only a single non-functional cryptographic polynomial share.',
        'A single share is mathematically impossible to reconstruct into a valid ECDSA/Schnorr private key.',
        'Enclave detects abnormal host telemetry and triggers instantaneous automated key share rotation.',
        'Zero client funds compromised; all balances remain fully secure.'
      ]
    },
    relatedArticles: [
      { title: 'Introduction to Keyless Threshold MPC Custody', category: 'Security', readingTime: '6 min read' },
      { title: 'MPC-CMP Threshold Cryptography Formal Verification', category: 'Platform', readingTime: '7 min read' }
    ]
  },
  {
    id: 'faq-bankruptcy-remote',
    question: 'Are client assets bankruptcy-remote and segregated?',
    category: 'Legal & Solvency',
    keywords: ['bankruptcy', 'segregation', 'insolvency', 'fisa', 'ucc', 'legal', 'solvency', 'creditors'],
    answerText: 'Yes. All client digital assets are titled under strict legal bailment and held completely off-balance sheet in segregated trust accounts governed by the Swiss Federal Intermediated Securities Act (FISA) and US Uniform Commercial Code (UCC) Article 8. In the event of corporate restructuring or insolvency, client assets cannot be pooled, lent, or claimed by general corporate creditors.',
    diagram: {
      title: 'Bankruptcy-Remote Asset Segregation Structure',
      steps: [
        { num: '01', label: 'Client Direct Bailment', sub: 'Off-Balance Sheet Asset', status: 'verified' },
        { num: '02', label: 'Segregated Trust Account', sub: 'Swiss FISA / UCC Art. 8', status: 'verified' },
        { num: '03', label: 'Merkle Solvency Feed', sub: 'Quarterly Independent Audit', status: 'active' },
        { num: '04', label: 'Immunity to Creditors', sub: 'Legally Unencumbered', status: 'success' }
      ]
    },
    example: {
      title: 'Example: Insolvency Isolation Guarantee',
      scenario: 'Platform operational expenses or counterparty dispute enters legal arbitration.',
      stepsDetail: [
        'Client digital assets remain segregated in designated on-chain escrow vaults.',
        'Court-appointed liquidators have zero legal title or claim to client escrow holdings.',
        'Clients can execute unilateral programmatic extraction using secondary recovery keys.',
        'Independent custodian trust status verified under Swiss FISA regulatory oversight.'
      ]
    },
    relatedArticles: [
      { title: 'Understanding Bankruptcy-Remote Asset Segregation', category: 'Platform', readingTime: '4 min read' },
      { title: 'Quarterly Merkle Tree Proof of Reserve Attestation', category: 'Platform', readingTime: '5 min read' }
    ]
  },
  {
    id: 'faq-travel-rule',
    question: 'How does FATF Travel Rule compliance operate?',
    category: 'Compliance & Travel Rule',
    keywords: ['travel rule', 'fatf', 'compliance', 'trp', 'vasp', 'originator', 'beneficiary', 'aml'],
    answerText: 'All cross-institution transfers exceeding statutory regulatory thresholds ($1,000 USD/EUR equivalent) automatically trigger encrypted peer-to-peer data payloads via Travel Rule Protocol (TRP V2). Originator and beneficiary identifiers are exchanged securely between verified VASPs using zero-knowledge compliance attestations without broadcasting private identifiable information to public blockchains.',
    diagram: {
      title: 'Automated TRP V2 Handshake Architecture',
      steps: [
        { num: '01', label: 'VASP Discovery', sub: 'Counterparty Address Registry', status: 'verified' },
        { num: '02', label: 'ZKP Metadata Exchange', sub: 'Encrypted PII Transmission', status: 'active' },
        { num: '03', label: 'Compliance Clearance', sub: 'Automated Sanctions Match', status: 'verified' },
        { num: '04', label: 'Settlement Dispatch', sub: 'Instant On-Chain Transfer', status: 'success' }
      ]
    },
    example: {
      title: 'Example: $2,500,000 Transfer Between Regulated VASPs',
      scenario: 'Hedge Fund client transfers 2,500,000 USDC to an institutional prime broker.',
      stepsDetail: [
        'Platform detects counterparty destination belongs to a Swiss FINMA-licensed VASP.',
        'TRP V2 message bus transmits encrypted legal entity identifiers and LEI codes.',
        'Counterparty VASP acknowledges receipt and signs cryptographic clearance token in <1.2 seconds.',
        'On-chain USDC transaction executes with zero manual compliance delay.'
      ]
    },
    relatedArticles: [
      { title: 'FATF Travel Rule: Protocol Compliance & Cryptographic Attestation', category: 'Security', readingTime: '7 min read' },
      { title: 'Automated Global Sanctions Screening & Asset Freezing Policy', category: 'Risk', readingTime: '5 min read' }
    ]
  },
  {
    id: 'faq-sor-fees',
    question: 'What are the fees for Smart Order Routing (SOR)?',
    category: 'Trading & Liquidity',
    keywords: ['fees', 'sor', 'trading', 'costs', 'pricing', 'slippage', 'gas', 'spread', 'commission'],
    answerText: 'We operate on a transparent basis-point tier structure ranging from 0.4 bps to 1.2 bps per execution with zero maker/taker spread markups. Network blockchain gas costs are passed through directly at raw protocol rates. Institutional entities holding the APEX-UTL utility component receive an automatic 35% discount on relayer settlement gas.',
    diagram: {
      title: 'Fee Decomposition & Relayer Pass-Through',
      steps: [
        { num: '01', label: 'Raw Market Liquidity', sub: '45+ Venues (No Spread Markup)', status: 'verified' },
        { num: '02', label: 'Transparent Tier', sub: '0.4 – 1.2 bps Execution Fee', status: 'active' },
        { num: '03', label: 'Raw Gas Pass-Through', sub: 'Zero Operator Overhead', status: 'verified' },
        { num: '04', label: 'APEX-UTL Offset', sub: '35% Gas Relayer Reduction', status: 'success' }
      ]
    },
    example: {
      title: 'Example: $10,000,000 Block Trade Execution',
      scenario: 'Asset manager executes a $10M TWAP allocation across 12 connected liquidity venues.',
      stepsDetail: [
        'SOR algorithm breaks parent order into 45 micro-fills to minimize market impact.',
        'Execution spread achieves -0.02 bps price improvement over single-venue book.',
        'Base execution fee calculated at 0.8 bps ($800 total fee).',
        'Raw on-chain gas billed at exact transaction cost ($14.20) with itemized cryptographic receipt.'
      ]
    },
    relatedArticles: [
      { title: 'Smart Order Routing: Minimizing Execution Slippage', category: 'Advanced', readingTime: '8 min read' },
      { title: 'Institutional Fee Schedule & Execution Tiers', category: 'Platform', readingTime: '4 min read' }
    ]
  }
];

export const PublicFaq: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('faq-withdrawal'); // Default open withdrawal

  const POPULAR_SEARCHES = [
    'How does withdrawal work?',
    'What is Keyless MPC?',
    'Are client assets bankruptcy-remote?',
    'What are the execution fees?',
    'FATF Travel Rule'
  ];

  const CATEGORIES = [
    'All',
    'Withdrawals & Custody',
    'Security & Keys',
    'Legal & Solvency',
    'Trading & Liquidity',
    'Compliance & Travel Rule'
  ];

  // Search-First Filter Logic
  const filteredFaqs = useMemo(() => {
    return FAQ_DATABASE.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const questionMatch = item.question.toLowerCase().includes(query);
      const answerMatch = item.answerText.toLowerCase().includes(query);
      const keywordMatch = item.keywords.some((kw) => kw.toLowerCase().includes(query));
      const exampleMatch = item.example.scenario.toLowerCase().includes(query) || 
                           item.example.title.toLowerCase().includes(query);

      return questionMatch || answerMatch || keywordMatch || exampleMatch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="public-faq-section" className="py-20 sm:py-28 bg-[#05070e] relative overflow-hidden border-t border-slate-800">
      
      {/* Background Architectural Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/05 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header: Search-First Experience */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            INSTITUTIONAL KNOWLEDGE BASE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Instant answers with full architectural flowcharts, operational scenario examples, and linked technical publications.
          </p>

          {/* Large Search-First Bar */}
          <div className="pt-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="w-5 h-5 text-blue-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search queries, e.g., How does withdrawal work? or MPC keyless..."
                className="w-full pl-12 pr-10 py-4 rounded-2xl bg-[#090d18] border border-blue-500/30 focus:border-blue-500 text-sm text-white placeholder-slate-500 shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Popular Query Prompt Suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-mono">
              <span className="text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-400" />
                Suggested:
              </span>
              {POPULAR_SEARCHES.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(prompt)}
                  className="px-2.5 py-1 rounded-lg bg-[#0b0e1a] border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/40 transition-colors"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                  : 'bg-[#090c16] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Instant Search Results Summary */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
          <span>Showing {filteredFaqs.length} of {FAQ_DATABASE.length} questions</span>
          {searchQuery && (
            <span className="text-blue-400">Filtering by: "{searchQuery}"</span>
          )}
        </div>

        {/* FAQ Accordion List with 4 Required Sub-Sections (Text, Diagram, Example, Related Articles) */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded 
                    ? 'bg-[#090d19] border-blue-500/40 shadow-2xl' 
                    : 'bg-[#070912] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                      {faq.category}
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform ${
                    isExpanded ? 'bg-blue-500/20 text-blue-400 rotate-180' : 'bg-[#0f1424] text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Expanded Multi-Part Answer Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 space-y-6 border-t border-slate-800/80 animate-in fade-in duration-200">
                    
                    {/* 1. TEXT ANSWER */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-blue-400" />
                        <span>Institutional Summary</span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed font-normal bg-[#05070e] p-4 rounded-xl border border-slate-800">
                        {faq.answerText}
                      </p>
                    </div>

                    {/* 2. ARCHITECTURAL DIAGRAM */}
                    <div className="space-y-2.5">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Architectural Flow Diagram • {faq.diagram.title}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#05070f] border border-slate-800">
                        {faq.diagram.steps.map((step, sIdx) => (
                          <div key={sIdx} className="p-3 rounded-xl bg-[#090d18] border border-slate-800/80 space-y-1 relative">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {step.num}
                              </span>
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            </div>
                            <div className="text-xs font-bold text-white pt-1">
                              {step.label}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400 leading-tight">
                              {step.sub}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. OPERATIONAL SCENARIO EXAMPLE */}
                    <div className="space-y-2.5">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Execution Scenario Example</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-[#05070e] border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-emerald-400">{faq.example.title}</span>
                          <span className="text-slate-500">Live Simulation</span>
                        </div>
                        <p className="text-xs text-slate-300 italic">
                          "{faq.example.scenario}"
                        </p>
                        <div className="space-y-1.5 pt-1">
                          {faq.example.stepsDetail.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300 font-mono">
                              <span className="text-blue-400 font-bold">›</span>
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 4. RELATED ARTICLES */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-800">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Related Technical Briefings</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {faq.relatedArticles.map((rel, rIdx) => (
                          <div 
                            key={rIdx}
                            className="p-3 rounded-xl bg-[#060812] border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="space-y-0.5">
                              <div className="font-bold text-white truncate">{rel.title}</div>
                              <div className="text-[10px] font-mono text-slate-500">{rel.category} • {rel.readingTime}</div>
                            </div>
                            <button 
                              onClick={() => {
                                const target = document.getElementById('education-center-section');
                                if (target) target.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="p-1.5 rounded-lg bg-[#0f1424] text-blue-400 hover:text-white flex-shrink-0"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredFaqs.length === 0 && (
          <div className="py-12">
            <EmptyStateIllustration 
              message="No Questions Matched Your Query" 
              subtext="Try searching with general keywords such as 'withdrawal', 'MPC', 'fees', or 'segregation'." 
            />
            <div className="text-center mt-4">
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-lg transition-all"
              >
                Clear Search Query
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
