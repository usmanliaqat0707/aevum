import React from 'react';

interface IllustrationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'amber' | 'blue' | 'emerald' | 'cyan' | 'slate';
  interactive?: boolean;
}

/**
 * Shared architectural color tokens and gradients for the unified illustration family.
 * Top-left illumination angle (315°), translucent layered geometric volumes,
 * precision stroke weights (1px / 1.5px / 2px), and crisp dark-mode contrast.
 */

// ============================================================================
// 1. LIQUIDITY ILLUSTRATION (Flowing Translucent Sphere & Ring System)
// ============================================================================
export const LiquidityIllustration: React.FC<IllustrationProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'blue'
}) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-72 h-72',
    xl: 'w-96 h-96'
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className} group select-none`}>
      {/* Volumetric Radial Glow */}
      <div className="absolute inset-4 rounded-full bg-blue-500/15 blur-2xl group-hover:bg-blue-400/25 transition-all duration-700" />
      
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="liqGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1E40AF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="liqRingGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="liqCoreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.1" />
          </linearGradient>

          <filter id="liqBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Outer Orbit Calibration Coordinates */}
        <ellipse cx="100" cy="100" rx="88" ry="42" fill="none" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 5" />
        <ellipse cx="100" cy="100" rx="88" ry="42" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.3" transform="rotate(-25 100 100)" />
        
        {/* Back Half of Primary Translucent Ring */}
        <path
          d="M 20 100 A 80 34 0 0 1 180 100"
          fill="none"
          stroke="url(#liqRingGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeOpacity="0.3"
          transform="rotate(35 100 100)"
        />

        {/* Central Layered Glass-like Sphere (Rear Volume) */}
        <circle cx="100" cy="100" r="46" fill="url(#liqGrad1)" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.6" />

        {/* Inner Refractive Isometric Core */}
        <g transform="translate(100 100) scale(0.9) translate(-100 -100)">
          {/* Inner Floating Fluid Torus */}
          <ellipse cx="100" cy="100" rx="32" ry="16" fill="none" stroke="#60A5FA" strokeWidth="2" strokeOpacity="0.7" transform="rotate(-15 100 100)" />
          
          {/* Central Prismatic Light Core */}
          <circle cx="92" cy="90" r="12" fill="url(#liqCoreGlow)" />
          <circle cx="86" cy="84" r="3" fill="#FFFFFF" fillOpacity="0.9" />
        </g>

        {/* Front Half of Primary Translucent Fluid Ring (Passing in Front) */}
        <path
          d="M 180 100 A 80 34 0 0 1 20 100"
          fill="none"
          stroke="url(#liqRingGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          transform="rotate(35 100 100)"
          filter="drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))"
        />

        {/* Flowing Floating Data Particles along Ring */}
        <circle cx="160" cy="80" r="3" fill="#93C5FD" className="animate-ping" style={{ animationDuration: '3s' }} />
        <circle cx="40" cy="120" r="2.5" fill="#60A5FA" />
        <circle cx="120" cy="145" r="2" fill="#38BDF8" />
        <circle cx="75" cy="55" r="2" fill="#FFFFFF" />

        {/* Precision Coordinate Markers */}
        <line x1="100" y1="10" x2="100" y2="18" stroke="#38BDF8" strokeWidth="1.5" />
        <line x1="100" y1="182" x2="100" y2="190" stroke="#38BDF8" strokeWidth="1.5" />
        <line x1="10" y1="100" x2="18" y2="100" stroke="#38BDF8" strokeWidth="1.5" />
        <line x1="182" y1="100" x2="190" y2="100" stroke="#38BDF8" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

// ============================================================================
// 2. SECURITY ILLUSTRATION (Geometric Vault & Shield with Segmented Rings)
// ============================================================================
export const SecurityIllustration: React.FC<IllustrationProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-72 h-72',
    xl: 'w-96 h-96'
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className} group select-none`}>
      {/* Volumetric Green/Teal Security Aura */}
      <div className="absolute inset-4 rounded-full bg-emerald-500/15 blur-2xl group-hover:bg-emerald-400/25 transition-all duration-700" />
      
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="secShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#064E3B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#022C22" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="secSteelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="secLockCore" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Outer Rotational Perimeter Hash Marks */}
        <circle cx="100" cy="100" r="88" fill="none" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="100" cy="100" r="76" fill="none" stroke="#10B981" strokeWidth="1" strokeOpacity="0.2" />

        {/* Geometric Hexagonal Vault Boundary (FIPS 140-3 Shield) */}
        <polygon 
          points="100,22 165,58 165,138 100,174 35,138 35,58" 
          fill="url(#secShieldGrad)" 
          stroke="url(#secSteelGrad)" 
          strokeWidth="2"
        />

        {/* Inner Segmented Security Rings */}
        <circle cx="100" cy="98" r="44" fill="#06131C" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />
        <circle cx="100" cy="98" r="34" fill="none" stroke="#34D399" strokeWidth="2" strokeDasharray="14 6" strokeOpacity="0.8" />
        
        {/* Central Geometric Vault Lock Quorum */}
        <g transform="translate(100 98)">
          {/* Shackle */}
          <path d="M -12 -2 A 12 12 0 0 1 12 -2 L 12 8 L -12 8 Z" fill="none" stroke="#6EE7B7" strokeWidth="3" strokeLinecap="round" />
          {/* Lock Body */}
          <rect x="-16" y="6" width="32" height="24" rx="6" fill="url(#secLockCore)" stroke="#34D399" strokeWidth="1.5" />
          {/* Keyway */}
          <circle cx="0" cy="16" r="3" fill="#041E15" />
          <path d="M -1.5 16 L 1.5 16 L 2.5 24 L -2.5 24 Z" fill="#041E15" />
        </g>

        {/* 3-Point Quorum Satellite Shards */}
        <g>
          {/* Shard 1 (Top) */}
          <circle cx="100" cy="38" r="4" fill="#34D399" />
          <line x1="100" y1="42" x2="100" y2="54" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 2" />

          {/* Shard 2 (Bottom Left) */}
          <circle cx="50" cy="126" r="4" fill="#34D399" />
          <line x1="53" y1="123" x2="65" y2="114" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 2" />

          {/* Shard 3 (Bottom Right) */}
          <circle cx="150" cy="126" r="4" fill="#34D399" />
          <line x1="147" y1="123" x2="135" y2="114" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 2" />
        </g>

        {/* Monospace Seal Badge */}
        <rect x="72" y="162" width="56" height="16" rx="4" fill="#06181A" stroke="#10B981" strokeWidth="1" />
        <text x="100" y="173" textAnchor="middle" fill="#6EE7B7" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
          FIPS 140-3
        </text>
      </svg>
    </div>
  );
};

// ============================================================================
// 3. NETWORK ILLUSTRATION (Connected Node Lattice & Radial Routing Grid)
// ============================================================================
export const NetworkIllustration: React.FC<IllustrationProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-72 h-72',
    xl: 'w-96 h-96'
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className} group select-none`}>
      {/* Volumetric Blue/Indigo Aura */}
      <div className="absolute inset-4 rounded-full bg-blue-600/15 blur-2xl group-hover:bg-blue-500/25 transition-all duration-700" />
      
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="netLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="netCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Concentric Isometric Grid Latitudes */}
        <circle cx="100" cy="100" r="82" fill="none" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="100" cy="100" r="54" fill="none" stroke="#1E293B" strokeWidth="1" />
        <circle cx="100" cy="100" r="26" fill="none" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.4" />

        {/* Diagonal Cross Matrix Lines */}
        <line x1="30" y1="30" x2="170" y2="170" stroke="#1E293B" strokeWidth="1" strokeDasharray="2 4" />
        <line x1="170" y1="30" x2="30" y2="170" stroke="#1E293B" strokeWidth="1" strokeDasharray="2 4" />

        {/* Primary Mesh Connection Vectors */}
        <g stroke="url(#netLineGrad)" strokeWidth="1.5">
          {/* Center to Satellites */}
          <line x1="100" y1="100" x2="100" y2="28" />
          <line x1="100" y1="100" x2="168" y2="65" />
          <line x1="100" y1="100" x2="152" y2="152" />
          <line x1="100" y1="100" x2="48" y2="152" />
          <line x1="100" y1="100" x2="32" y2="65" />

          {/* Satellite to Satellite Perimeter Routing Conduits */}
          <line x1="100" y1="28" x2="168" y2="65" strokeOpacity="0.4" />
          <line x1="168" y1="65" x2="152" y2="152" strokeOpacity="0.4" />
          <line x1="152" y1="152" x2="48" y2="152" strokeOpacity="0.4" />
          <line x1="48" y1="152" x2="32" y2="65" strokeOpacity="0.4" />
          <line x1="32" y1="65" x2="100" y2="28" strokeOpacity="0.4" />
        </g>

        {/* Central Master Router Node */}
        <g transform="translate(100 100)">
          <circle cx="0" cy="0" r="16" fill="url(#netCoreGrad)" stroke="#93C5FD" strokeWidth="2" />
          <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
        </g>

        {/* Satellite Nodes with Status Halos */}
        {/* Node 1: Zurich Signer (Top) */}
        <g transform="translate(100 28)">
          <circle cx="0" cy="0" r="8" fill="#0A1020" stroke="#60A5FA" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3.5" fill="#3B82F6" />
        </g>

        {/* Node 2: SOR Venue (Top Right) */}
        <g transform="translate(168 65)">
          <circle cx="0" cy="0" r="7" fill="#0A1020" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3" fill="#38BDF8" />
        </g>

        {/* Node 3: NY Custody (Bottom Right) */}
        <g transform="translate(152 152)">
          <circle cx="0" cy="0" r="7" fill="#0A1020" stroke="#60A5FA" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3" fill="#60A5FA" />
        </g>

        {/* Node 4: Travel Rule Gateway (Bottom Left) */}
        <g transform="translate(48 152)">
          <circle cx="0" cy="0" r="7" fill="#0A1020" stroke="#34D399" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3" fill="#34D399" />
        </g>

        {/* Node 5: Treasury Operations (Top Left) */}
        <g transform="translate(32 65)">
          <circle cx="0" cy="0" r="7" fill="#0A1020" stroke="#F59E0B" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3" fill="#F59E0B" />
        </g>

        {/* Live Traveling Signal Packets */}
        <circle cx="100" cy="56" r="2.5" fill="#93C5FD" className="animate-ping" />
        <circle cx="134" cy="82" r="2" fill="#38BDF8" />
        <circle cx="74" cy="126" r="2" fill="#6EE7B7" />
      </svg>
    </div>
  );
};

// ============================================================================
// 4. WALLET ILLUSTRATION (Floating Keyless Digital Vault with MPC Shards)
// ============================================================================
export const WalletIllustration: React.FC<IllustrationProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-72 h-72',
    xl: 'w-96 h-96'
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className} group select-none`}>
      {/* Volumetric Amber/Gold Aura */}
      <div className="absolute inset-4 rounded-full bg-amber-500/15 blur-2xl group-hover:bg-amber-400/25 transition-all duration-700" />
      
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="walBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#291F08" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#171206" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#080602" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="walAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="walGlassPlate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Ambient Isometric Horizon Grid */}
        <ellipse cx="100" cy="160" rx="75" ry="24" fill="none" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 4" />

        {/* Layer 1: Back Segregated Vault Enclave */}
        <rect 
          x="35" 
          y="42" 
          width="130" 
          height="88" 
          rx="18" 
          fill="#0C0E18" 
          stroke="#334155" 
          strokeWidth="1.5"
          transform="rotate(-5 100 86)" 
        />

        {/* Layer 2: Main Floating Vault Body */}
        <rect 
          x="32" 
          y="56" 
          width="136" 
          height="92" 
          rx="20" 
          fill="url(#walBodyGrad)" 
          stroke="url(#walAccentGrad)" 
          strokeWidth="2"
        />

        {/* Top Vault Luminous Stripe */}
        <path d="M 34 76 L 166 76" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.4" />

        {/* Biometric / MPC Keyless Core Glyph */}
        <g transform="translate(100 102)">
          <circle cx="0" cy="0" r="20" fill="#0A0802" stroke="#F59E0B" strokeWidth="1.5" />
          
          {/* Segmented Concentric MPC Glyphs */}
          <path d="M -10 -4 A 11 11 0 0 1 10 -4" fill="none" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M -13 4 A 14 14 0 0 0 13 4" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="0" cy="0" r="3" fill="#FDE68A" />
        </g>

        {/* Front Layer: Translucent Shield Overlay */}
        <rect 
          x="44" 
          y="68" 
          width="112" 
          height="68" 
          rx="12" 
          fill="url(#walGlassPlate)" 
          stroke="#FCD34D" 
          strokeWidth="1" 
          strokeOpacity="0.4"
        />

        {/* Floating Satellite MPC Shard 1 (Top Right) */}
        <g transform="translate(156 38)">
          <rect x="-16" y="-10" width="32" height="20" rx="6" fill="#131B2E" stroke="#60A5FA" strokeWidth="1.5" />
          <text x="0" y="3" textAnchor="middle" fill="#93C5FD" fontSize="7" fontFamily="monospace" fontWeight="bold">
            SHARD 1
          </text>
        </g>

        {/* Floating Satellite MPC Shard 2 (Bottom Left) */}
        <g transform="translate(42 154)">
          <rect x="-16" y="-10" width="32" height="20" rx="6" fill="#0E231F" stroke="#34D399" strokeWidth="1.5" />
          <text x="0" y="3" textAnchor="middle" fill="#6EE7B7" fontSize="7" fontFamily="monospace" fontWeight="bold">
            SHARD 2
          </text>
        </g>
      </svg>
    </div>
  );
};

// ============================================================================
// 5. TRANSPARENCY ILLUSTRATION (Layered Cryptographic Ledger Blocks)
// ============================================================================
export const TransparencyIllustration: React.FC<IllustrationProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-72 h-72',
    xl: 'w-96 h-96'
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className} group select-none`}>
      {/* Volumetric Cyan/Teal Aura */}
      <div className="absolute inset-4 rounded-full bg-cyan-500/15 blur-2xl group-hover:bg-cyan-400/25 transition-all duration-700" />
      
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="blockTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#083344" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="blockSideGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0891B2" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#082F49" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="blockSideGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0C4A6E" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Concentric Proof Stream Verticals */}
        <line x1="100" y1="20" x2="100" y2="180" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="3 4" strokeOpacity="0.5" />
        
        {/* ================= STACKED ISOMETRIC LEDGER BLOCK 3 (BOTTOM) ================= */}
        <g transform="translate(100 135)">
          {/* Top Face */}
          <polygon points="0,-18 55,8 0,34 -55,8" fill="url(#blockTopGrad)" stroke="#06B6D4" strokeWidth="1.5" strokeOpacity="0.7" />
          {/* Left Face */}
          <polygon points="-55,8 0,34 0,54 -55,28" fill="url(#blockSideGrad1)" stroke="#0891B2" strokeWidth="1" />
          {/* Right Face */}
          <polygon points="0,34 55,8 55,28 0,54" fill="url(#blockSideGrad2)" stroke="#06B6D4" strokeWidth="1" />
        </g>

        {/* Attestation Proof Connection Beam */}
        <line x1="100" y1="130" x2="100" y2="100" stroke="#38BDF8" strokeWidth="2" strokeDasharray="2 3" />

        {/* ================= STACKED ISOMETRIC LEDGER BLOCK 2 (MID) ================= */}
        <g transform="translate(100 88)">
          {/* Top Face */}
          <polygon points="0,-18 55,8 0,34 -55,8" fill="url(#blockTopGrad)" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.8" />
          {/* Left Face */}
          <polygon points="-55,8 0,34 0,54 -55,28" fill="url(#blockSideGrad1)" stroke="#0891B2" strokeWidth="1" />
          {/* Right Face */}
          <polygon points="0,34 55,8 55,28 0,54" fill="url(#blockSideGrad2)" stroke="#38BDF8" strokeWidth="1" />
        </g>

        {/* Attestation Proof Connection Beam */}
        <line x1="100" y1="84" x2="100" y2="52" stroke="#67E8F9" strokeWidth="2" />

        {/* ================= STACKED ISOMETRIC LEDGER BLOCK 1 (TOP) ================= */}
        <g transform="translate(100 40)">
          {/* Top Face */}
          <polygon points="0,-18 55,8 0,34 -55,8" fill="url(#blockTopGrad)" stroke="#67E8F9" strokeWidth="2" />
          {/* Left Face */}
          <polygon points="-55,8 0,34 0,54 -55,28" fill="url(#blockSideGrad1)" stroke="#06B6D4" strokeWidth="1.5" />
          {/* Right Face */}
          <polygon points="0,34 55,8 55,28 0,54" fill="url(#blockSideGrad2)" stroke="#67E8F9" strokeWidth="1.5" />

          {/* Cryptographic Merkle Root Hash Indicator */}
          <circle cx="0" cy="8" r="4" fill="#FFFFFF" />
          <circle cx="0" cy="8" r="8" fill="#67E8F9" fillOpacity="0.4" />
        </g>

        {/* Merkle Proof Validation Tags */}
        <g transform="translate(162 76)">
          <rect x="-18" y="-9" width="36" height="18" rx="4" fill="#041E26" stroke="#06B6D4" strokeWidth="1" />
          <text x="0" y="3" textAnchor="middle" fill="#67E8F9" fontSize="7" fontFamily="monospace" fontWeight="bold">
            0x8F3A
          </text>
        </g>
      </svg>
    </div>
  );
};

// ============================================================================
// 6. GROWTH ILLUSTRATION (Ascending Geometric Architecture)
// ============================================================================
export const GrowthIllustration: React.FC<IllustrationProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-72 h-72',
    xl: 'w-96 h-96'
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className} group select-none`}>
      {/* Volumetric Royal Blue / Indigo Aura */}
      <div className="absolute inset-4 rounded-full bg-blue-600/15 blur-2xl group-hover:bg-blue-400/25 transition-all duration-700" />
      
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="growthPlatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0B132B" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="growthLineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Isometric Grid Floor */}
        <polygon points="100,165 170,130 100,95 30,130" fill="none" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 4" />

        {/* Step Platform 1 (Base Tier) */}
        <g transform="translate(58 140)">
          <polygon points="0,-10 24,2 0,14 -24,2" fill="url(#growthPlatGrad)" stroke="#3B82F6" strokeWidth="1" />
          <polygon points="-24,2 0,14 0,26 -24,14" fill="#0B1528" stroke="#1E3A8A" strokeWidth="1" />
          <polygon points="0,14 24,2 24,14 0,26" fill="#172554" stroke="#3B82F6" strokeWidth="1" />
        </g>

        {/* Step Platform 2 (Mid Tier) */}
        <g transform="translate(100 110)">
          <polygon points="0,-12 28,2 0,16 -28,2" fill="url(#growthPlatGrad)" stroke="#60A5FA" strokeWidth="1.5" />
          <polygon points="-28,2 0,16 0,32 -28,18" fill="#0B1528" stroke="#1E40AF" strokeWidth="1" />
          <polygon points="0,16 28,2 28,18 0,32" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="1" />
        </g>

        {/* Step Platform 3 (Apex Tier) */}
        <g transform="translate(142 75)">
          <polygon points="0,-14 32,2 0,18 -32,2" fill="url(#growthPlatGrad)" stroke="#93C5FD" strokeWidth="2" />
          <polygon points="-32,2 0,18 0,44 -32,28" fill="#0B1528" stroke="#2563EB" strokeWidth="1" />
          <polygon points="0,18 32,2 32,28 0,44" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5" />

          {/* Apex Glowing Beacon */}
          <circle cx="0" cy="-14" r="3.5" fill="#FFFFFF" />
          <circle cx="0" cy="-14" r="7" fill="#60A5FA" fillOpacity="0.4" />
        </g>

        {/* Ascending Vector Trajectory Curve */}
        <path
          d="M 40 148 Q 90 120 142 61"
          fill="none"
          stroke="url(#growthLineGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Rising Directional Arrowhead */}
        <polygon points="144,53 148,67 135,63" fill="#93C5FD" />
      </svg>
    </div>
  );
};

// ============================================================================
// 7. 2D VECTOR STEP / SECTION ILLUSTRATIONS (Consistent Geometry & Lighting)
// ============================================================================

/** Step 1: Corporate Entity Setup & Signers */
export const VectorEntitySetupIllustration: React.FC<{ active?: boolean }> = ({ active }) => (
  <div className="w-full h-36 sm:h-40 rounded-2xl bg-[#080b13] border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden group">
    <div className="flex items-center justify-between text-[11px] font-mono">
      <span className="text-blue-400 font-bold flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        ENTITY PROFILE // TIER 1
      </span>
      <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
        APPROVED
      </span>
    </div>

    {/* Architectural Node Structure */}
    <div className="my-auto flex items-center justify-between gap-2">
      <div className={`flex-1 p-2.5 rounded-xl border transition-all ${active ? 'bg-[#101728] border-blue-500/60 shadow-md' : 'bg-[#090c15] border-slate-800'}`}>
        <div className="text-xs font-bold text-white">Apex Holdings AG</div>
        <div className="text-[10px] text-slate-400 font-mono">UID: CHE-492.184.209</div>
      </div>
      
      <div className="flex items-center gap-1 font-mono text-xs text-blue-400 bg-blue-500/10 px-2.5 py-1.5 rounded-xl border border-blue-500/20 font-bold">
        <span>3 Signers</span>
      </div>
    </div>

    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-1.5">
      <span>Auth: SAML 2.0 / FIDO2</span>
      <span className="text-slate-300">Quorum: 2-of-3</span>
    </div>
  </div>
);

/** Step 2: MPC Keyless Enclave Partitioning */
export const VectorMpcSecurityIllustration: React.FC<{ active?: boolean }> = ({ active }) => (
  <div className="w-full h-36 sm:h-40 rounded-2xl bg-[#080b13] border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden group">
    <div className="flex items-center justify-between text-[11px] font-mono">
      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        MPC-CMP ENCLAVE // TSS
      </span>
      <span className="text-blue-400 font-semibold font-mono">
        3-of-4 QUORUM
      </span>
    </div>

    {/* Shard Satellites Vector */}
    <div className="my-auto flex items-center justify-between gap-2 text-center text-[10px] font-mono">
      <div className={`p-2 rounded-xl border flex-1 transition-all ${active ? 'bg-[#0a1c18] border-emerald-500/50' : 'bg-[#090c15] border-slate-800'}`}>
        <div className="text-emerald-400 font-bold">SHARD 1</div>
        <div className="text-[9px] text-slate-400 mt-0.5">Zurich HSM</div>
      </div>

      <div className="h-0.5 w-4 bg-emerald-500/40" />

      <div className={`p-2 rounded-xl border flex-1 transition-all ${active ? 'bg-[#0a1c18] border-emerald-500/50' : 'bg-[#090c15] border-slate-800'}`}>
        <div className="text-emerald-400 font-bold">SHARD 2</div>
        <div className="text-[9px] text-slate-400 mt-0.5">NY Qualified</div>
      </div>

      <div className="h-0.5 w-4 bg-emerald-500/40" />

      <div className={`p-2 rounded-xl border flex-1 transition-all ${active ? 'bg-[#0a1c18] border-emerald-500/50' : 'bg-[#090c15] border-slate-800'}`}>
        <div className="text-emerald-400 font-bold">SHARD 3</div>
        <div className="text-[9px] text-slate-400 mt-0.5">Sing. Enclave</div>
      </div>
    </div>

    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-1.5">
      <span>Private Keys: None (Zero Exposure)</span>
      <span className="text-emerald-400 font-semibold">Attested ✓</span>
    </div>
  </div>
);

/** Step 3: KYB Verification & Travel Rule */
export const VectorKycVerificationIllustration: React.FC<{ active?: boolean }> = ({ active }) => (
  <div className="w-full h-36 sm:h-40 rounded-2xl bg-[#080b13] border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden group">
    <div className="flex items-center justify-between text-[11px] font-mono">
      <span className="text-cyan-400 font-bold flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        KYB & TRAVEL RULE CLEARANCE
      </span>
      <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
        FATF COMPLIANT
      </span>
    </div>

    <div className="my-auto grid grid-cols-2 gap-2 text-[10px] font-mono">
      <div className="p-2 rounded-xl bg-[#090c15] border border-slate-800 flex items-center justify-between">
        <span className="text-slate-400">Sanctions Check:</span>
        <span className="text-emerald-400 font-bold">Passed</span>
      </div>
      <div className="p-2 rounded-xl bg-[#090c15] border border-slate-800 flex items-center justify-between">
        <span className="text-slate-400">UBO Attestation:</span>
        <span className="text-cyan-400 font-bold">100% Signed</span>
      </div>
    </div>

    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-1.5">
      <span>Standard: IVMS101 / TRP V2</span>
      <span className="text-cyan-400 font-semibold">Automated Clearance</span>
    </div>
  </div>
);

/** Step 4: Reserve Funding & Segregated Vaults */
export const VectorReserveFundingIllustration: React.FC<{ active?: boolean }> = ({ active }) => (
  <div className="w-full h-36 sm:h-40 rounded-2xl bg-[#080b13] border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden group">
    <div className="flex items-center justify-between text-[11px] font-mono">
      <span className="text-amber-400 font-bold flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        RESERVE ALLOCATION
      </span>
      <span className="text-white font-bold font-tabular">
        $48,291,480.00
      </span>
    </div>

    <div className="my-auto grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono">
      <div className="p-2 rounded-xl bg-[#120f07] border border-amber-500/40">
        <div className="text-amber-400 font-bold">BTC VAULT</div>
        <div className="text-[9px] text-slate-400 mt-0.5">50% Allocated</div>
      </div>
      <div className="p-2 rounded-xl bg-[#0a1020] border border-blue-500/40">
        <div className="text-blue-400 font-bold">ETH STAKE</div>
        <div className="text-[9px] text-slate-400 mt-0.5">30% Allocated</div>
      </div>
      <div className="p-2 rounded-xl bg-[#091a18] border border-emerald-500/40">
        <div className="text-emerald-400 font-bold">USDC LIQ</div>
        <div className="text-[9px] text-slate-400 mt-0.5">20% Allocated</div>
      </div>
    </div>

    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-1.5">
      <span>Custody: Bankruptcy Remote</span>
      <span className="text-amber-400 font-semibold">$750M Insurance</span>
    </div>
  </div>
);

/** Step 5: Execution & Continuous Telemetry */
export const VectorExecutionIllustration: React.FC<{ active?: boolean }> = ({ active }) => (
  <div className="w-full h-36 sm:h-40 rounded-2xl bg-[#080b13] border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden group">
    <div className="flex items-center justify-between text-[11px] font-mono">
      <span className="text-blue-400 font-bold flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        SMART ORDER ROUTING // LIVE
      </span>
      <span className="text-emerald-400 font-semibold">
        &lt; 0.8 bps SLIPPAGE
      </span>
    </div>

    <div className="my-auto flex items-center justify-between gap-2 text-[10px] font-mono">
      <div className="p-2 rounded-xl bg-[#090c15] border border-slate-800 flex-1">
        <div className="text-slate-400">Venues Active</div>
        <div className="text-white font-bold text-xs mt-0.5">45 Venues</div>
      </div>
      <div className="p-2 rounded-xl bg-[#090c15] border border-slate-800 flex-1">
        <div className="text-slate-400">Settlement Tick</div>
        <div className="text-cyan-400 font-bold text-xs mt-0.5">18 ms</div>
      </div>
      <div className="p-2 rounded-xl bg-[#090c15] border border-slate-800 flex-1">
        <div className="text-slate-400">Audit Status</div>
        <div className="text-emerald-400 font-bold text-xs mt-0.5">Merkle 100%</div>
      </div>
    </div>

    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-1.5">
      <span>Auto Rebalance: Active</span>
      <span className="text-blue-400 font-semibold">24/7 Operations</span>
    </div>
  </div>
);

/** Empty State Architectural Illustration */
export const EmptyStateIllustration: React.FC<{ message?: string; subtext?: string }> = ({ 
  message = "No Activity Recorded", 
  subtext = "System is initialized and awaiting cryptographic transaction pulse." 
}) => (
  <div className="p-8 sm:p-12 rounded-3xl bg-[#080b13] border border-slate-800 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
    <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center relative">
      <svg viewBox="0 0 48 48" className="w-10 h-10 stroke-blue-400" fill="none" strokeWidth="1.5">
        <polygon points="24,4 44,14 44,34 24,44 4,34 4,14" strokeDasharray="3 3" />
        <circle cx="24" cy="24" r="8" strokeOpacity="0.6" />
        <circle cx="24" cy="24" r="2" fill="#60A5FA" />
      </svg>
      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 animate-ping" />
    </div>

    <div className="space-y-1">
      <h4 className="text-base font-bold text-white">{message}</h4>
      <p className="text-xs text-slate-400 max-w-xs leading-relaxed">{subtext}</p>
    </div>
  </div>
);
