import { AssetMetrics, SecurityProofItem, PillarFeature, ApiCodeExample, ClientCaseStudy } from '../types';

export const LIVE_ASSETS: AssetMetrics[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin Prime Custody',
    priceUsd: 97420.50,
    change24h: 2.34,
    marketCap: '$1.92T',
    volume24h: '$41.8B',
    stakingApy: 1.85,
    custodyTier: 'Cold Multi-Sig',
    jurisdiction: 'Zurich / New York (Regulated Trust)'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum Liquidity & Staking',
    priceUsd: 3410.80,
    change24h: 3.82,
    marketCap: '$410.2B',
    volume24h: '$22.4B',
    stakingApy: 3.92,
    custodyTier: 'Prime Staked',
    jurisdiction: 'London / Singapore'
  },
  {
    symbol: 'USDC',
    name: 'Circle USD Treasury Yield',
    priceUsd: 1.00,
    change24h: 0.01,
    marketCap: '$44.5B',
    volume24h: '$12.9B',
    stakingApy: 4.85,
    custodyTier: 'Warm MPC',
    jurisdiction: 'US Qualified Custodian (100% Cash/T-Bills)'
  },
  {
    symbol: 'SOL',
    name: 'Solana High-Speed Settlement',
    priceUsd: 218.40,
    change24h: 5.12,
    marketCap: '$104.1B',
    volume24h: '$8.6B',
    stakingApy: 6.80,
    custodyTier: 'Warm MPC',
    jurisdiction: 'Frankfurt / Singapore'
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche Subnet Liquidity',
    priceUsd: 38.60,
    change24h: -0.45,
    marketCap: '$15.8B',
    volume24h: '$1.4B',
    stakingApy: 5.25,
    custodyTier: 'Warm MPC',
    jurisdiction: 'Zurich (FINMA Compliant)'
  }
];

export const SECURITY_PROOF_ITEMS: SecurityProofItem[] = [
  {
    id: 'soc2',
    title: 'SOC 2 Type II Certified',
    standard: 'AICPA Trust Services Criteria',
    auditor: 'Deloitte & Touche LLP',
    verifiedDate: 'Q1 2026',
    badge: 'SOC 2 TYPE II',
    description: 'Continuous real-time observability across security, availability, confidential data processing, and privacy.',
    status: 'Compliant'
  },
  {
    id: 'iso27001',
    title: 'ISO/IEC 27001:2022',
    standard: 'Information Security Management',
    auditor: 'BSI Global Assurance',
    verifiedDate: 'Renewed Jan 2026',
    badge: 'ISO 27001',
    description: 'International benchmark for cryptographic key management, employee segregation, and hardware security.',
    status: 'Audited'
  },
  {
    id: 'mpc-crypto',
    title: 'MPC-CMP Cryptographic Verification',
    standard: 'Threshold Signature Protocol',
    auditor: 'Trail of Bits & NCC Group',
    verifiedDate: 'Dec 2025',
    badge: 'FORMALLY VERIFIED',
    description: 'Mathematical zero-knowledge proofs ensuring private keys are never assembled in memory, disk, or network.',
    status: 'Active'
  },
  {
    id: 'insurance',
    title: '$750,000,000 Specie Policy',
    standard: 'Custody Cold & Warm Insurance',
    auditor: "Lloyd's of London Underwritten",
    verifiedDate: 'Active 2026',
    badge: '$750M COVERAGE',
    description: 'Direct Lloyd’s syndicate insurance safeguarding digital assets against internal collusion, hardware destruction, or key theft.',
    status: 'Insured'
  }
];

export const PLATFORM_PILLARS: PillarFeature[] = [
  {
    id: 'custody',
    title: 'Institutional MPC Custody',
    shortTag: 'Zero Single Point of Failure',
    headline: 'Provably secure multi-party computation with zero private key reconstitution',
    description: 'Deploy flexible quorum policies (m-of-n) across isolated hardware enclaves, biometric authenticators, and geographical trust zones. Authorize multi-million dollar transfers with customizable timelocks and compliance gates.',
    bullets: [
      'MPC-CMP key sharding across AWS Nitro Enclaves and Intel SGX',
      'Programmable governance workflows with multi-role hierarchy',
      'Hardware security module (HSM) FIPS 140-3 Level 4 backing',
      'Instant policy revocation & zero-downtime key resharing'
    ],
    metrics: [
      { label: 'Custody Assets Under Tech', value: '$48.2B+', sub: 'Zero security breaches since inception' },
      { label: 'Signing Latency', value: '< 42ms', sub: 'Sub-second multi-region quorum' },
      { label: 'Policy Engines', value: '100% On-Chain & Off-Chain', sub: 'Granular address whitelisting' }
    ],
    accent: 'blue'
  },
  {
    id: 'liquidity',
    title: 'Algorithmic Smart Liquidity & Prime Execution',
    shortTag: 'Smart Order Routing (SOR)',
    headline: 'Single-API gateway to $30B+ aggregated depth across 45+ spot & derivative venues',
    description: 'Minimize market impact with proprietary execution algorithms including TWAP, VWAP, POV, and Dark Liquidity pools. Settle trades seamlessly without pre-funding fragmented exchange accounts.',
    bullets: [
      'Aggregated Tier-1 liquidity with deep orderbook integration',
      'Zero-gas atomic relayer network with smart mempool protection',
      'Cross-margin collateral optimization across global venues',
      'Sub-millisecond FIX protocol and high-throughput WebSockets'
    ],
    metrics: [
      { label: 'Daily Settled Volume', value: '$1.4B+', sub: 'Average daily clearing' },
      { label: 'Slippage Reduction', value: '38.4 bps', sub: 'Versus direct market orders' },
      { label: 'Venues Connected', value: '45+', sub: 'CEX, DEX, and Dark Pools' }
    ],
    accent: 'emerald'
  },
  {
    id: 'yield',
    title: 'Prime Treasury & Institutional Yield',
    shortTag: 'Enterprise Staking & Delta-Neutral',
    headline: 'Generate verifiable, risk-adjusted returns on idle digital reserves with non-custodial staking',
    description: 'Access institutional validator infrastructure with 99.99% uptime guarantees, slashing insurance, and daily automated rewards compounding directly into your qualified custody accounts.',
    bullets: [
      'Slashing-protected validator clusters across 12+ tier-1 networks',
      'Delta-neutral basis trading and tokenized US Treasury bill vaults',
      'Automated daily accounting reports mapped directly to GAAP/IFRS',
      'Real-time tax lot tracking and portfolio stress-testing'
    ],
    metrics: [
      { label: 'Avg Staking Yield', value: '4.85% APY', sub: 'Native rewards with 0% slashing history' },
      { label: 'Validator Uptime', value: '99.998%', sub: 'SLA backed by financial guarantee' },
      { label: 'Automated Tax Exports', value: '1-Click', sub: 'ERP sync with NetSuite, SAP, Bloomberg' }
    ],
    accent: 'cyan'
  },
  {
    id: 'api',
    title: 'Enterprise Infrastructure & Developer APIs',
    shortTag: 'Composable FinTech Primitive',
    headline: 'Build wallets, trading desks, or automated treasuries with our unified REST, gRPC & Webhook SDKs',
    description: 'Designed for engineering and quantitative teams. Access programmatic vault creation, batch transaction dispatching, continuous webhook events, and sandbox testing environments.',
    bullets: [
      'REST, gRPC, and FIX 4.4 / 5.0 institutional protocols',
      'Comprehensive SDKs in TypeScript, Python, Go, Rust, and Java',
      'Pre-built compliance webhooks with Chainalysis & Elliptic integration',
      'Sub-second deterministic test sandbox with faucet assets'
    ],
    metrics: [
      { label: 'API Availability', value: '99.995%', sub: 'Global multi-cloud failover' },
      { label: 'Max Request Rate', value: '50,000 req/s', sub: 'Zero rate-limiting bottlenecks' },
      { label: 'Webhook Latency', value: '< 18ms', sub: 'Deterministic event delivery' }
    ],
    accent: 'amber'
  }
];

export const CODE_EXAMPLES: ApiCodeExample[] = [
  {
    language: 'typescript',
    label: 'TypeScript / Node',
    filename: 'vault_transfer.ts',
    code: `import { AevumClient, QuorumPolicy } from '@aevum/sdk';

// Initialize authenticated client with hardware-backed credentials
const aevum = new AevumClient({
  apiKey: process.env.AEVUM_API_KEY,
  apiSecret: process.env.AEVUM_API_SECRET,
  environment: 'production', // or 'sandbox'
});

async function executeInstitutionalSettlement() {
  // 1. Create programmable batch transfer from Cold Vault to Warm Liquidity
  const transfer = await aevum.transfers.create({
    sourceVaultId: 'vlt_sec_8923a10',
    destinationAddress: '0x71C...8B3A',
    asset: 'USDC',
    amount: '5000000.00', // $5,000,000 USDC
    memo: 'Prime Liquidity Allocation Q3',
    quorum: {
      requiredApprovals: 2,
      signers: ['usr_cfo_81', 'usr_risk_director_04'],
      timelockSeconds: 0, // Instant execution upon 2/2 MPC threshold
    },
    compliance: {
      travelRuleCheck: true,
      sanctionScreening: 'realtime_strict',
    }
  });

  console.log('Transaction Initiated:', transfer.id);
  console.log('MPC Quorum Status:', transfer.status); // 'AWAITING_MPC_SIGNING'
  return transfer;
}

executeInstitutionalSettlement();`
  },
  {
    language: 'python',
    label: 'Python 3.11+',
    filename: 'algorithmic_execution.py',
    code: `from aevum import AevumPrimeClient, ExecutionAlgorithm

client = AevumPrimeClient(
    api_key="aev_live_9481940182",
    private_key_path="/etc/aevum/keys/institutional.pem",
    region="us-east-financial"
)

# Dispatch a $20M BTC liquidity TWAP order across 45 venues
order = client.orders.create_algorithmic(
    pair="BTC/USD",
    side="BUY",
    total_notional=20_000_000.00,
    algorithm=ExecutionAlgorithm.TWAP(
        duration_minutes=120,
        max_slippage_bps=5.0,
        stealth_routing=True, # Dark pool order splitting
        urgency="LOW_IMPACT"
    ),
    settlement_target="VAULT_COLD_MPC_01"
)

print(f"Algorithm Active: Order #{order.order_id} | Dispatched to {len(order.routed_exchanges)} venues")
`
  },
  {
    language: 'go',
    label: 'Go (Golang)',
    filename: 'mpc_quorum.go',
    code: `package main

import (
	"context"
	"fmt"
	"github.com/aevum-labs/aevum-go-sdk/client"
	"github.com/aevum-labs/aevum-go-sdk/models"
)

func main() {
	ctx := context.Background()
	aevumClient, err := client.NewClientFromEnv()
	if err != nil {
		panic(err)
	}

	// Stream live cryptographic MPC signing events over secure gRPC channel
	eventStream, err := aevumClient.StreamSigningQuorum(ctx, "vlt_live_enterprise_99")
	if err != nil {
		panic(err)
	}

	for event := range eventStream {
		fmt.Printf("[MPC Event] Node: %s | ShardState: %s | Round: %d/3\\n",
			event.NodeID, event.State, event.Round)
	}
}
`
  },
  {
    language: 'curl',
    label: 'cURL / REST',
    filename: 'merkle_verify.sh',
    code: `curl -X POST https://api.aevum.io/v2/reserves/verify \\
  -H "Authorization: Bearer aev_sec_994827184" \\
  -H "Content-Type: application/json" \\
  -d '{
    "vault_id": "vlt_treasury_master_001",
    "block_height": 21849102,
    "include_merkle_path": true
  }'

# Response 200 OK:
# {
#   "merkle_root": "0x98f41e9ab031...",
#   "total_audited_usd": "48,291,480,192.40",
#   "auditor_signature": "0x448a...Deloitte_Attestation",
#   "proof_valid": true
# }`
  }
];

export const CLIENT_CASE_STUDIES: ClientCaseStudy[] = [
  {
    clientName: 'Vanguard Alpha Digital Fund',
    type: 'Multi-Strategy Hedge Fund',
    aum: '$4.2B AUM',
    quote: 'Aevum replaced our fragmented custody and prime broker accounts with one unified MPC terminal. We cut execution slippage by 42% and automated our end-of-day audit compliance completely.',
    author: 'Marcus Vance',
    role: 'Chief Investment Officer',
    results: [
      { metric: '42%', label: 'Slippage Reduction' },
      { metric: 'Zero', label: 'Security Vulnerabilities' },
      { metric: '< 50ms', label: 'Average Quorum Execution' }
    ]
  },
  {
    clientName: 'Helios FinTech Bank & Pay',
    type: 'Licensed Neo-Bank (EU / UK)',
    aum: '2.8M Active Accounts',
    quote: 'Integrating Aevum’s developer APIs allowed us to roll out regulated crypto custody and yield to 2.8 million users in just 6 weeks. The compliance screening and SOC 2 controls satisfied all Tier-1 regulators.',
    author: 'Elena Rostova',
    role: 'Head of Core Banking Infrastructure',
    results: [
      { metric: '6 Weeks', label: 'Time-to-Market' },
      { metric: '99.998%', label: 'API SLA Uptime' },
      { metric: '100%', label: 'Automated Travel Rule Passes' }
    ]
  },
  {
    clientName: 'Cobalt Sovereign Treasury',
    type: 'Family Office & Corporate Balance Sheet',
    aum: '$850M Treasury Reserves',
    quote: 'For our institutional board, uncompromised custody was the #1 priority. Aevum’s multi-region MPC keyless architecture and $750M Lloyd’s specie policy gave our risk committee full confidence.',
    author: 'David Chen, CFA',
    role: 'Managing Partner & Treasurer',
    results: [
      { metric: '$750M', label: 'Lloyds Direct Coverage' },
      { metric: '4.85%', label: 'Risk-Adjusted Yield Generated' },
      { metric: '1-Click', label: 'GAAP Accounting Sync' }
    ]
  }
];
