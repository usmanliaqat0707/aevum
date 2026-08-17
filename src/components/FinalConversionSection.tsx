import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Terminal, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Cpu, 
  Coins, 
  Server,
  Zap
} from 'lucide-react';

interface FinalConversionSectionProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenAccessRequest: () => void;
}

export const FinalConversionSection: React.FC<FinalConversionSectionProps> = ({
  onOpenAuth,
  onOpenAccessRequest
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven: the network slowly expands behind the headline as it enters.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const networkScale = useTransform(scrollYProgress, [0, 0.6], [0.82, 1.12]);
  const networkOpacity = useTransform(scrollYProgress, [0, 0.25], [0.4, 1]);

  const scrollToPlatform = () => {
    const el = document.getElementById('platform-overview-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Slowly moving institutional network / ledger visualization background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Network Node particles
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      pulse: number;
      type: 'ledger' | 'enclave' | 'validator';
    }

    const nodeCount = Math.min(36, Math.floor(width / 35));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25, // Slow, calm movement
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2 + 1.5,
        alpha: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        type: i % 3 === 0 ? 'enclave' : i % 3 === 1 ? 'ledger' : 'validator'
      });
    }

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Deep dark gradient backdrop
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#03050a');
      grad.addColorStop(0.5, '#060a15');
      grad.addColorStop(1, '#020408');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle isometric grid lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw connections between proximate nodes (Ledger mesh)
      const maxDistance = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.15;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Occasional traveling cryptographic packet
            if ((i + j) % 5 === 0) {
              const packetPos = (Math.sin(time * 2 + i) + 1) / 2;
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * packetPos;
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * packetPos;
              ctx.fillStyle = 'rgba(96, 165, 250, 0.6)';
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Bounce gently off borders
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        node.pulse += 0.02;
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.8;

        // Node aura glow
        const auraGrad = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, currentRadius * 4
        );
        if (node.type === 'enclave') {
          auraGrad.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
          auraGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = '#60a5fa';
        } else if (node.type === 'ledger') {
          auraGrad.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
          auraGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
          ctx.fillStyle = '#34d399';
        } else {
          auraGrad.addColorStop(0, 'rgba(147, 51, 234, 0.3)');
          auraGrad.addColorStop(1, 'rgba(147, 51, 234, 0)');
          ctx.fillStyle = '#a78bfa';
        }

        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Node core point
        ctx.fillStyle = node.type === 'enclave' ? '#93c5fd' : node.type === 'ledger' ? '#6ee7b7' : '#c4b5fd';
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={sectionRef} id="final-conversion-section" className="relative py-28 sm:py-36 bg-[#03050a] overflow-hidden border-t border-slate-800">
      
      {/* Interactive / Animated Moving Network & Ledger Canvas (scroll-driven expansion) */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: networkScale, opacity: networkOpacity }}>
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </motion.div>

      {/* Subtle Radial Vignette overlay to keep text ultra crisp */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#03050a]/80 via-transparent to-[#03050a] pointer-events-none z-[1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-[1]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">
        
        {/* Subtle Institutional Assurance Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold tracking-wider uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          ENTERPRISE DIGITAL ASSET INFRASTRUCTURE
        </div>

        {/* Large Statement mandated by user */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Know where you stand. <br className="hidden sm:inline" />
            <span className="text-slate-100">Understand what happens next.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Eliminate single-point failure risks with mathematical threshold MPC custody, 
            verifiable on-chain solvency proofs, and deterministic sub-millisecond execution.
          </p>
        </div>

        {/* Action Buttons: Create Account & Explore the Platform */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          
          {/* Create Account Button */}
          <button
            id="conversion-create-account-btn"
            onClick={() => onOpenAuth('signup')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Explore the Platform Button */}
          <button
            id="conversion-explore-platform-btn"
            onClick={scrollToPlatform}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#090d18] hover:bg-[#0e1424] text-white border border-slate-700 hover:border-blue-500/60 font-semibold text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Explore the Platform</span>
          </button>

        </div>

        {/* Institutional Trust & Verification Badges */}
        <div className="pt-8 border-t border-slate-800/80 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="p-3 rounded-xl bg-[#070a14]/80 border border-slate-800/60 space-y-1 backdrop-blur-sm">
            <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              CUSTODY SECURITY
            </div>
            <div className="text-xs font-bold text-white font-mono">FIPS 140-3 Level 3</div>
          </div>

          <div className="p-3 rounded-xl bg-[#070a14]/80 border border-slate-800/60 space-y-1 backdrop-blur-sm">
            <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              INDEPENDENT AUDIT
            </div>
            <div className="text-xs font-bold text-white font-mono">SOC 2 Type II Certified</div>
          </div>

          <div className="p-3 rounded-xl bg-[#070a14]/80 border border-slate-800/60 space-y-1 backdrop-blur-sm">
            <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              SOLVENCY PROOF
            </div>
            <div className="text-xs font-bold text-white font-mono">100% 1:1 Merkle Tree</div>
          </div>

          <div className="p-3 rounded-xl bg-[#070a14]/80 border border-slate-800/60 space-y-1 backdrop-blur-sm">
            <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              LEGAL CHARTER
            </div>
            <div className="text-xs font-bold text-white font-mono">Swiss FISA Segregated</div>
          </div>
        </div>

      </div>
    </section>
  );
};
