import React from 'react';

/**
 * Global ambient depth layer. A fixed, pointer-events-none, ultra-subtle wash
 * that sits above the page content (z-30) but below the navbar / floating widget
 * (z-40) and modals (z-50). The goal is depth the user feels before they notice:
 * radial gradients, atmospheric blue glow, grain/noise, tiny particles, grid
 * fragments, and blurred geometric forms — all held at very low opacity so they
 * never brighten or obscure the content.
 */

// Hard-coded so positions are stable across renders (no Math.random churn).
const PARTICLES: Array<{ left: string; top: string; size: number; delay: string; blue: boolean }> = [
  { left: '6%', top: '18%', size: 2, delay: '0s', blue: true },
  { left: '14%', top: '62%', size: 1.5, delay: '1.4s', blue: false },
  { left: '22%', top: '34%', size: 2.5, delay: '0.6s', blue: true },
  { left: '31%', top: '78%', size: 1.5, delay: '2.1s', blue: false },
  { left: '39%', top: '12%', size: 2, delay: '1.1s', blue: true },
  { left: '47%', top: '52%', size: 1.5, delay: '0.3s', blue: false },
  { left: '55%', top: '26%', size: 2, delay: '1.8s', blue: true },
  { left: '63%', top: '70%', size: 1.5, delay: '0.9s', blue: false },
  { left: '71%', top: '40%', size: 2.5, delay: '2.4s', blue: true },
  { left: '79%', top: '16%', size: 1.5, delay: '1.3s', blue: false },
  { left: '86%', top: '58%', size: 2, delay: '0.5s', blue: true },
  { left: '93%', top: '32%', size: 1.5, delay: '1.9s', blue: false },
  { left: '10%', top: '88%', size: 2, delay: '0.8s', blue: true },
  { left: '58%', top: '90%', size: 1.5, delay: '2.2s', blue: false },
  { left: '90%', top: '82%', size: 2, delay: '1.6s', blue: true },
];

const GRID_MASK =
  'radial-gradient(58% 48% at 28% 22%, black, transparent 76%), radial-gradient(48% 40% at 82% 78%, black, transparent 76%)';

export const AmbientBackground: React.FC = () => {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
      {/* 1. Radial gradients + atmospheric blue glow + edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(58% 44% at 16% 10%, rgba(59,130,246,0.055), transparent 70%)',
            'radial-gradient(52% 44% at 86% 90%, rgba(34,211,238,0.04), transparent 70%)',
            'radial-gradient(40% 38% at 62% 46%, rgba(99,102,241,0.03), transparent 72%)',
            'radial-gradient(130% 100% at 50% 50%, transparent 52%, rgba(2,4,8,0.55))',
          ].join(', '),
        }}
      />

      {/* 2. Blurred geometric forms */}
      <div className="absolute -top-24 left-[8%] w-72 h-72 rounded-[42%] border border-blue-400/10 blur-2xl opacity-40 rotate-12" />
      <div className="absolute top-[45%] right-[6%] w-80 h-80 rounded-full border border-cyan-400/10 blur-2xl opacity-30" />
      <div className="absolute bottom-[8%] left-[28%] w-64 h-64 rounded-3xl border border-indigo-400/10 blur-3xl opacity-25 rotate-45" />

      {/* 3. Grid fragments (revealed only in soft patches via mask) */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: GRID_MASK,
          WebkitMaskImage: GRID_MASK,
        }}
      />

      {/* 4. Tiny vector particles (subtle twinkle) */}
      <div className="absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`absolute rounded-full animate-pulse ${p.blue ? 'bg-blue-300/40' : 'bg-slate-400/30'}`}
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: '4s',
            }}
          />
        ))}
      </div>

      {/* 5. Grain / noise (fractal turbulence, soft blend so it never brightens) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.045] mix-blend-soft-light">
        <filter id="ambient-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ambient-grain)" />
      </svg>
    </div>
  );
};
