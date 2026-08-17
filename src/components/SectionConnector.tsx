import React from 'react';

/**
 * Visual connective tissue between major sections. Each variant morphs the
 * previous section's concept into the next, so the page reads as one continuous
 * system:  flow → liquidity stream → branching nodes → APX token → ledger blocks.
 */
export type ConnectorVariant = 'flow' | 'stream' | 'branch' | 'token' | 'ledger';

interface SectionConnectorProps {
  variant: ConnectorVariant;
}

const Dots: React.FC<{ pathId: string; count: number; dur: number; color: string; r?: number }> = ({
  pathId,
  count,
  dur,
  color,
  r = 3,
}) => (
  <>
    {Array.from({ length: count }).map((_, k) => (
      <circle key={k} r={r} fill={color}>
        <animateMotion dur={`${dur}s`} begin={`${(dur / count) * k}s`} repeatCount="indefinite">
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
    ))}
  </>
);

const renderVariant = (variant: ConnectorVariant): React.ReactNode => {
  switch (variant) {
    // Platform → How It Works: a single flowing line moving downward.
    case 'flow':
      return (
        <>
          <defs>
            <linearGradient id="conn-flow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path d="M120 4 L120 196" fill="none" stroke="#60A5FA" strokeOpacity="0.1" strokeWidth="9" strokeLinecap="round" />
          <path id="p-flow" d="M120 4 L120 196" fill="none" stroke="url(#conn-flow)" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 9" />
          <Dots pathId="p-flow" count={3} dur={2.6} color="#93C5FD" r={3.4} />
        </>
      );

    // How It Works → Liquidity: the line becomes a flowing liquidity stream.
    case 'stream':
      return (
        <>
          <defs>
            <linearGradient id="conn-stream" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Wide translucent body (pronounced double-wave so it reads as a liquid stream) */}
          <path d="M120 4 C 78 44, 78 78, 120 100 C 162 122, 162 156, 120 196" fill="none" stroke="#22D3EE" strokeOpacity="0.14" strokeWidth="14" strokeLinecap="round" />
          {/* Bright core */}
          <path id="p-stream" d="M120 4 C 78 44, 78 78, 120 100 C 162 122, 162 156, 120 196" fill="none" stroke="url(#conn-stream)" strokeWidth="3" strokeLinecap="round" />
          <Dots pathId="p-stream" count={4} dur={2.2} color="#67E8F9" r={3} />
        </>
      );

    // Liquidity → Network: the stream branches into connected nodes.
    case 'branch':
      return (
        <>
          <defs>
            <linearGradient id="conn-branch" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path id="pb-main" d="M120 4 L120 92" fill="none" stroke="url(#conn-branch)" strokeWidth="2.5" strokeLinecap="round" />
          <path id="pb-l" d="M120 92 L58 176" fill="none" stroke="#3B82F6" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
          <path id="pb-c" d="M120 92 L120 178" fill="none" stroke="#3B82F6" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
          <path id="pb-r" d="M120 92 L182 176" fill="none" stroke="#3B82F6" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />

          {/* Terminal nodes */}
          {[
            { cx: 58, cy: 178 },
            { cx: 120, cy: 180 },
            { cx: 182, cy: 178 },
          ].map((n, i) => (
            <g key={i}>
              <circle cx={n.cx} cy={n.cy} r="7" fill="#0a0e1a" stroke="#60A5FA" strokeWidth="1.5" />
              <circle cx={n.cx} cy={n.cy} r="3" fill="#60A5FA" />
              <circle cx={n.cx} cy={n.cy} r="7" fill="none" stroke="#60A5FA" strokeWidth="1">
                <animate attributeName="r" values="7;12;7" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}

          <Dots pathId="pb-main" count={1} dur={1.6} color="#67E8F9" r={3} />
          <Dots pathId="pb-l" count={1} dur={1.8} color="#93C5FD" r={2.6} />
          <Dots pathId="pb-c" count={1} dur={1.8} color="#93C5FD" r={2.6} />
          <Dots pathId="pb-r" count={1} dur={1.8} color="#93C5FD" r={2.6} />
        </>
      );

    // Network → App Coin: one branch resolves into the APX token structure.
    case 'token':
      return (
        <>
          <defs>
            <linearGradient id="conn-token" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* Top nodes converging inward */}
          {[60, 120, 180].map((x, i) => (
            <circle key={i} cx={x} cy="8" r="4" fill="#0a0e1a" stroke="#60A5FA" strokeWidth="1.5" />
          ))}
          <path id="pt-l" d="M60 8 L120 100" fill="none" stroke="url(#conn-token)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
          <path id="pt-c" d="M120 8 L120 100" fill="none" stroke="url(#conn-token)" strokeWidth="2.2" strokeLinecap="round" />
          <path id="pt-r" d="M180 8 L120 100" fill="none" stroke="url(#conn-token)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
          {/* Stem: branches converge and flow into the token */}
          <path id="pt-stem" d="M120 100 L120 123" fill="none" stroke="url(#conn-token)" strokeWidth="2.6" strokeLinecap="round" />

          <Dots pathId="pt-l" count={1} dur={1.9} color="#93C5FD" r={2.6} />
          <Dots pathId="pt-c" count={1} dur={1.6} color="#FBBF24" r={2.8} />
          <Dots pathId="pt-r" count={1} dur={1.9} color="#93C5FD" r={2.6} />
          <Dots pathId="pt-stem" count={1} dur={1.4} color="#FCD34D" r={2.8} />

          {/* APX hexagonal token */}
          <g transform="translate(120 150)">
            <polygon points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14" fill="none" stroke="#F59E0B" strokeOpacity="0.25" strokeWidth="6" />
            <polygon points="0,-26 22,-13 22,13 0,26 -22,13 -22,-13" fill="#161206" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="0" cy="0" r="26" fill="none" stroke="#F59E0B" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 4">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="14s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="5" textAnchor="middle" fill="#FCD34D" fontSize="13" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
              APX
            </text>
          </g>
        </>
      );

    // App Coin → Transparency: the structure settles into stacked ledger blocks.
    case 'ledger':
      return (
        <>
          <defs>
            <linearGradient id="conn-ledger" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="conn-ledger-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#083344" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path id="pl-stem" d="M120 4 L120 62" fill="none" stroke="url(#conn-ledger)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 8" />
          <Dots pathId="pl-stem" count={2} dur={2.2} color="#67E8F9" r={3} />

          {/* Two stacked isometric ledger blocks */}
          {[92, 138].map((cy, i) => (
            <g key={i} transform={`translate(120 ${cy})`}>
              <polygon points="0,-16 42,6 0,28 -42,6" fill="url(#conn-ledger-face)" stroke={i === 0 ? '#67E8F9' : '#06B6D4'} strokeWidth={i === 0 ? 1.8 : 1.4} strokeOpacity="0.85" />
              <polygon points="-42,6 0,28 0,46 -42,24" fill="#082033" stroke="#0891B2" strokeWidth="1" strokeOpacity="0.7" />
              <polygon points="0,28 42,6 42,24 0,46" fill="#0a2a3d" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.7" />
              {i === 0 && (
                <>
                  <circle cx="0" cy="6" r="3.5" fill="#FFFFFF" />
                  <circle cx="0" cy="6" r="7" fill="#67E8F9" fillOpacity="0.35">
                    <animate attributeName="r" values="7;11;7" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                </>
              )}
            </g>
          ))}
        </>
      );

    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
};

export const SectionConnector: React.FC<SectionConnectorProps> = ({ variant }) => {
  return (
    <div
      aria-hidden="true"
      className="relative w-full h-28 sm:h-40 flex items-center justify-center overflow-hidden pointer-events-none select-none -my-4 sm:-my-6 z-10"
    >
      {/* Soft focal glow so the motif reads as light, not a hard divider */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 bg-blue-600/08 blur-[70px] rounded-full pointer-events-none" />
      <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid meet" className="h-full w-auto overflow-visible">
        {renderVariant(variant)}
      </svg>
    </div>
  );
};
