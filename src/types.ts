export interface AssetMetrics {
  symbol: string;
  name: string;
  priceUsd: number;
  change24h: number;
  marketCap: string;
  volume24h: string;
  stakingApy: number;
  custodyTier: 'Cold Multi-Sig' | 'Warm MPC' | 'Prime Staked';
  jurisdiction: string;
}

export interface SecurityProofItem {
  id: string;
  title: string;
  standard: string;
  auditor: string;
  verifiedDate: string;
  badge: string;
  description: string;
  status: 'Audited' | 'Compliant' | 'Active' | 'Insured';
}

export interface PillarFeature {
  id: string;
  title: string;
  shortTag: string;
  headline: string;
  description: string;
  bullets: string[];
  metrics: { label: string; value: string; sub?: string }[];
  accent: 'blue' | 'emerald' | 'cyan' | 'amber';
}

export interface ApiCodeExample {
  language: 'typescript' | 'python' | 'go' | 'rust' | 'curl';
  label: string;
  filename: string;
  code: string;
}

export interface ClientCaseStudy {
  clientName: string;
  type: string;
  aum: string;
  quote: string;
  author: string;
  role: string;
  results: { metric: string; label: string }[];
}

export interface MerkleNode {
  hash: string;
  balance: string;
  timestamp: string;
  auditorVerified: boolean;
}
