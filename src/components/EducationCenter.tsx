import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Layers, 
  ShieldCheck, 
  AlertTriangle, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  ChevronRight, 
  X,
  FileText,
  Lock,
  Coins,
  Network,
  Scale,
  Zap,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import {
  LiquidityIllustration,
  SecurityIllustration,
  NetworkIllustration,
  WalletIllustration,
  TransparencyIllustration,
  GrowthIllustration,
  EmptyStateIllustration
} from './illustrations/ArchitecturalIllustrations';

export type EducationCategory = 
  | 'All'
  | 'Beginner' 
  | 'Crypto Basics' 
  | 'Platform' 
  | 'Security' 
  | 'Risk' 
  | 'Advanced';

interface ArticleItem {
  id: string;
  title: string;
  category: 'Beginner' | 'Crypto Basics' | 'Platform' | 'Security' | 'Risk' | 'Advanced';
  difficulty: 'Introductory' | 'Intermediate' | 'Advanced' | 'Expert';
  readingTime: string;
  excerpt: string;
  publishedDate: string;
  tags: string[];
  illustrationTheme: 'mpc' | 'vault' | 'staking' | 'sor' | 'risk' | 'compliance' | 'zkp' | 'growth';
  contentSummary: string[];
}

export const EducationCenter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<EducationCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleModal, setActiveArticleModal] = useState<ArticleItem | null>(null);

  const CATEGORIES: EducationCategory[] = [
    'All',
    'Beginner',
    'Crypto Basics',
    'Platform',
    'Security',
    'Risk',
    'Advanced'
  ];

  const ARTICLES: ArticleItem[] = [
    {
      id: 'art-01',
      title: 'Introduction to Keyless Threshold MPC Custody',
      category: 'Security',
      difficulty: 'Intermediate',
      readingTime: '6 min read',
      excerpt: 'How multi-party computation eliminates the single point of failure in private key storage through zero-knowledge mathematical shards.',
      publishedDate: 'August 2026',
      tags: ['MPC-CMP', 'Custody', 'Zero-Knowledge'],
      illustrationTheme: 'mpc',
      contentSummary: [
        'Traditional private keys present a fatal single point of failure if intercepted.',
        'MPC-CMP generates mathematical key shares distributed across isolated hardware enclaves.',
        '2-of-3 quorum threshold signing enables transaction broadcast without ever assembling a complete private key in memory.',
        'Eliminates insider threat vectors and physical server compromise vulnerabilities.'
      ]
    },
    {
      id: 'art-02',
      title: 'Understanding Bankruptcy-Remote Asset Segregation',
      category: 'Platform',
      difficulty: 'Introductory',
      readingTime: '4 min read',
      excerpt: 'Why off-balance sheet legal structures and audited trust segregation protect institutional client assets from custodian insolvency.',
      publishedDate: 'July 2026',
      tags: ['Legal Charter', 'Segregation', 'UCC Art. 8'],
      illustrationTheme: 'vault',
      contentSummary: [
        'Client digital assets are titled under legal bailment rather than custodial balance sheet debt.',
        'Governed under Swiss FISA and US Uniform Commercial Code Article 8.',
        'In the event of custodian insolvency, assets remain unclaimable by general corporate creditors.',
        'Continuous Merkle tree attestations mathematically substantiate segregated 1:1 holdings.'
      ]
    },
    {
      id: 'art-03',
      title: 'Crypto Basics: Proof of Stake & Validator Consensus',
      category: 'Crypto Basics',
      difficulty: 'Introductory',
      readingTime: '5 min read',
      excerpt: 'The fundamental mechanics of blockchain consensus, block validation rewards, and non-custodial staking delegation.',
      publishedDate: 'August 2026',
      tags: ['Consensus', 'PoS', 'Staking'],
      illustrationTheme: 'staking',
      contentSummary: [
        'Proof-of-Stake replaces energy-intensive mining with capital delegation to cryptographic validators.',
        'Validators propose and attest to transaction blocks, earning protocol-native rewards.',
        'Non-custodial delegation ensures validator nodes never take ownership of your underlying capital.',
        'Slashing shields and multi-region failovers mitigate node downtime risks.'
      ]
    },
    {
      id: 'art-04',
      title: 'Smart Order Routing: Minimizing Execution Slippage',
      category: 'Advanced',
      difficulty: 'Advanced',
      readingTime: '8 min read',
      excerpt: 'Algorithmic breakdown of TWAP and VWAP block trade routing across 45+ spot venues, dark pools, and decentralized automated market makers.',
      publishedDate: 'June 2026',
      tags: ['SOR', 'Algorithms', 'Market Microstructure'],
      illustrationTheme: 'sor',
      contentSummary: [
        'Large block orders can cause significant market impact if sent to a single exchange order book.',
        'Smart Order Routing (SOR) models liquidity depth across 45+ venues in sub-millisecond intervals.',
        'Deconstructs parent orders into algorithmic micro-slices (TWAP / VWAP).',
        'Results in verifiable price improvement and reduced execution fees.'
      ]
    },
    {
      id: 'art-05',
      title: 'Institutional Risk Controls & Velocity Limits',
      category: 'Risk',
      difficulty: 'Intermediate',
      readingTime: '5 min read',
      excerpt: 'Configuring multi-tier organizational policies, whitelisted destination registries, and instant emergency freeze triggers.',
      publishedDate: 'July 2026',
      tags: ['Risk Architecture', 'Whitelisting', 'Velocity Controls'],
      illustrationTheme: 'risk',
      contentSummary: [
        'Hierarchical spending thresholds prevent rogue administrative unauthorized withdrawals.',
        'Time-locked policy gates mandate 4-hour co-signer authorization for transfers exceeding $5M.',
        'Strict whitelisted address books prevent destination address poisoning.',
        'Multi-tiered kill switches allow instantaneous freezing of specific sub-accounts.'
      ]
    },
    {
      id: 'art-06',
      title: 'Beginner Guide: Institutional Onboarding & KYB',
      category: 'Beginner',
      difficulty: 'Introductory',
      readingTime: '4 min read',
      excerpt: 'A clear walkthrough of corporate entity registration, beneficial ownership verification, and SSO/SAML integration.',
      publishedDate: 'August 2026',
      tags: ['Onboarding', 'KYB', 'Entity Setup'],
      illustrationTheme: 'compliance',
      contentSummary: [
        'Preparation of corporate formation documents and authorized signatory charters.',
        'Digital intake for Ultimate Beneficial Owner (UBO) sanctions screening.',
        'Integration of enterprise SSO / SAML 2.0 with hardware FIDO2 WebAuthn keys.',
        'First test transaction through segregated testnet sandbox.'
      ]
    },
    {
      id: 'art-07',
      title: 'FATF Travel Rule: Protocol Compliance & Attestation',
      category: 'Security',
      difficulty: 'Advanced',
      readingTime: '7 min read',
      excerpt: 'How zero-knowledge payload exchange protocols transmit originator and beneficiary metadata between regulated VASPs.',
      publishedDate: 'May 2026',
      tags: ['Travel Rule', 'ZKP', 'Compliance'],
      illustrationTheme: 'zkp',
      contentSummary: [
        'FATF Recommendation 16 mandates metadata transmission for inter-custodian transfers.',
        'Zero-knowledge compliance proofs verify regulatory criteria without broadcasting private corporate data to public chains.',
        'Inter-VASP communication bus (TRP V2) automates message authentication.',
        'Passes global cross-border audit standards across Switzerland, the US, and the EU.'
      ]
    },
    {
      id: 'art-08',
      title: 'Evaluating Digital Asset Market Liquidity & Reserves',
      category: 'Risk',
      difficulty: 'Advanced',
      readingTime: '9 min read',
      excerpt: 'Comprehensive risk frameworks for evaluating liquidity pool depth, custodian financial health, and oracle failure modes.',
      publishedDate: 'June 2026',
      tags: ['Risk Management', 'Counterparty Risk', 'Oracles'],
      illustrationTheme: 'growth',
      contentSummary: [
        'Assessing venue solvency and credit risk before capital routing.',
        'Redundant oracle consensus architectures to prevent single-feed pricing manipulation.',
        'Stress testing liquidity absorption during volatile market stress events.',
        'Insurance coverage scope and Lloyd\'s specie policy limits.'
      ]
    }
  ];

  // Filtered Articles
  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Render Unified Architectural Illustration Visuals for Article Cards
  const renderIllustrationHeader = (theme: ArticleItem['illustrationTheme']) => {
    switch (theme) {
      case 'mpc':
        return (
          <div className="w-full h-44 bg-[#080b14] flex items-center justify-center relative overflow-hidden border-b border-slate-800 group-hover:border-slate-700 transition-colors">
            <SecurityIllustration size="sm" className="scale-125" />
            <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-emerald-400 font-bold bg-[#0a151b] px-2 py-0.5 rounded border border-emerald-500/30">
              MPC-CMP 2/3
            </div>
          </div>
        );
      case 'vault':
        return (
          <div className="w-full h-44 bg-[#080b14] flex items-center justify-center relative overflow-hidden border-b border-slate-800 group-hover:border-slate-700 transition-colors">
            <WalletIllustration size="sm" className="scale-125" />
            <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-amber-400 font-bold bg-[#141006] px-2 py-0.5 rounded border border-amber-500/30">
              FISA TRUST
            </div>
          </div>
        );
      case 'staking':
        return (
          <div className="w-full h-44 bg-[#080b14] flex items-center justify-center relative overflow-hidden border-b border-slate-800 group-hover:border-slate-700 transition-colors">
            <GrowthIllustration size="sm" className="scale-125" />
            <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-blue-400 font-bold bg-[#091224] px-2 py-0.5 rounded border border-blue-500/30">
              PoS VALIDATOR
            </div>
          </div>
        );
      case 'sor':
        return (
          <div className="w-full h-44 bg-[#080b14] flex items-center justify-center relative overflow-hidden border-b border-slate-800 group-hover:border-slate-700 transition-colors">
            <LiquidityIllustration size="sm" className="scale-125" />
            <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-cyan-400 font-bold bg-[#061520] px-2 py-0.5 rounded border border-cyan-500/30">
              SOR ALGORITHM
            </div>
          </div>
        );
      case 'risk':
        return (
          <div className="w-full h-44 bg-[#080b14] flex items-center justify-center relative overflow-hidden border-b border-slate-800 group-hover:border-slate-700 transition-colors">
            <SecurityIllustration size="sm" className="scale-125" />
            <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-amber-400 font-bold bg-[#171106] px-2 py-0.5 rounded border border-amber-500/30">
              VELOCITY GATE
            </div>
          </div>
        );
      case 'compliance':
        return (
          <div className="w-full h-44 bg-[#080b14] flex items-center justify-center relative overflow-hidden border-b border-slate-800 group-hover:border-slate-700 transition-colors">
            <NetworkIllustration size="sm" className="scale-125" />
            <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-blue-400 font-bold bg-[#091224] px-2 py-0.5 rounded border border-blue-500/30">
              ENTITY KYB
            </div>
          </div>
        );
      case 'zkp':
        return (
          <div className="w-full h-44 bg-[#080b14] flex items-center justify-center relative overflow-hidden border-b border-slate-800 group-hover:border-slate-700 transition-colors">
            <TransparencyIllustration size="sm" className="scale-125" />
            <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-cyan-400 font-bold bg-[#041a22] px-2 py-0.5 rounded border border-cyan-500/30">
              ZKP MERKLE
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-44 bg-[#080b14] flex items-center justify-center relative overflow-hidden border-b border-slate-800 group-hover:border-slate-700 transition-colors">
            <GrowthIllustration size="sm" className="scale-125" />
            <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-blue-400 font-bold bg-[#091224] px-2 py-0.5 rounded border border-blue-500/30">
              RESERVE FRAMEWORK
            </div>
          </div>
        );
    }
  };

  return (
    <section id="education-center-section" className="py-24 sm:py-32 bg-[#070911] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background Architectural Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/05 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modern Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              INSTITUTIONAL KNOWLEDGE REPOSITORY
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Education Center
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl leading-relaxed">
              Curated technical briefings, architectural breakdowns, risk management principles, and operational guides for institutional treasury leaders.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, tags, papers..."
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-[#0b0e18] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-slate-800/80 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap border cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/20'
                    : 'bg-[#090c16] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Modern Editorial Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticleModal(article)}
              className="group rounded-2xl bg-[#0b0e18] border border-slate-800 hover:border-slate-700 hover:bg-[#0e1220] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl"
            >
              <div>
                {/* 3D Geometric Architectural Illustration */}
                {renderIllustrationHeader(article.illustrationTheme)}

                {/* Card Content Body */}
                <div className="p-5 space-y-3">
                  
                  {/* Category & Difficulty Badge Strip */}
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold uppercase tracking-wider border border-blue-500/20">
                      {article.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded ${
                      article.difficulty === 'Introductory' ? 'bg-emerald-500/10 text-emerald-400' :
                      article.difficulty === 'Intermediate' ? 'bg-blue-500/10 text-blue-300' :
                      'bg-amber-500/10 text-amber-400'
                    }`}>
                      {article.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 font-normal">
                    {article.excerpt}
                  </p>

                </div>
              </div>

              {/* Card Footer: Reading Time & Action */}
              <div className="px-5 py-3.5 border-t border-slate-800/80 bg-[#080b13] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{article.readingTime}</span>
                </div>

                <div className="text-blue-400 font-semibold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty Search Fallback with Architectural DNA */}
        {filteredArticles.length === 0 && (
          <div className="py-12">
            <EmptyStateIllustration 
              message="No Research Articles Found" 
              subtext="Try adjusting your keyword query or selecting 'All' categories to view the complete institutional knowledge repository." 
            />
            <div className="text-center mt-4">
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-lg transition-all"
              >
                Reset Search Filters
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ================= ARTICLE DETAIL MODAL ================= */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0b0e18] border border-slate-800 shadow-2xl p-6 sm:p-8 relative space-y-6 animate-in zoom-in-95 duration-200">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveArticleModal(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-[#121626] text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Strip */}
            <div className="space-y-2 pr-10">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold uppercase">
                  {activeArticleModal.category}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{activeArticleModal.difficulty}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {activeArticleModal.readingTime}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white">
                {activeArticleModal.title}
              </h3>
            </div>

            {/* Excerpt */}
            <p className="text-sm text-slate-300 leading-relaxed font-normal bg-[#070910] p-4 rounded-2xl border border-slate-800">
              {activeArticleModal.excerpt}
            </p>

            {/* Key Technical Takeaways */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Core Architectural Takeaways:
              </div>
              <div className="space-y-2">
                {activeArticleModal.contentSummary.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Strip */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
              {activeArticleModal.tags.map((tag, tIdx) => (
                <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070910] text-slate-400 border border-slate-800">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Footer */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                Published: {activeArticleModal.publishedDate} • Peer-Reviewed
              </span>

              <button
                onClick={() => setActiveArticleModal(null)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all cursor-pointer"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
