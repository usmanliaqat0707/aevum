import React, { useEffect, useRef } from 'react';

export const LiquidityBackgroundCanvas: React.FC<{ interactive?: boolean }> = ({ interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Node & particle system
    const numNodes = Math.min(Math.floor(width / 32), 45);
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      color: string;
      pulseSpeed: number;
      pulseAngle: number;
    }[] = [];

    const colors = [
      'rgba(59, 130, 246,',  // Electric Blue
      'rgba(16, 185, 129,',  // Emerald
      'rgba(56, 189, 248,',  // Sky Cyan
      'rgba(147, 197, 253,', // Soft Slate Blue
    ];

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.2,
        baseAlpha: Math.random() * 0.35 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseAngle: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseOver = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    // Floating volumetric rings
    let ringAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle background architectural grid
      const gridSize = 64;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.018)';
      ctx.lineWidth = 1;
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

      // Volumetric fluid ambient glow
      ringAngle += 0.004;
      const cx = width * 0.75;
      const cy = height * 0.35;

      const gradient1 = ctx.createRadialGradient(
        cx + Math.sin(ringAngle) * 60,
        cy + Math.cos(ringAngle) * 40,
        10,
        cx,
        cy,
        Math.min(width, height) * 0.45
      );
      gradient1.addColorStop(0, 'rgba(37, 99, 235, 0.09)');
      gradient1.addColorStop(0.5, 'rgba(16, 185, 129, 0.04)');
      gradient1.addColorStop(1, 'rgba(8, 10, 15, 0)');

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      // Connect nodes with proximity network lines
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Update position
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        // Bounce on boundaries
        if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
        if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

        // Mouse gravity / repulsion
        if (interactive && isMouseOver) {
          const dx = mouseX - nodeA.x;
          const dy = mouseY - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 1) {
            const force = (180 - dist) / 180;
            nodeA.x -= (dx / dist) * force * 0.8;
            nodeA.y -= (dy / dist) * force * 0.8;
          }
        }

        // Pulse
        nodeA.pulseAngle += nodeA.pulseSpeed;
        const currentAlpha = nodeA.baseAlpha + Math.sin(nodeA.pulseAngle) * 0.1;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 135;
          if (distance < maxDist) {
            const lineAlpha = (1 - distance / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${nodeA.color} ${Math.max(0.05, currentAlpha)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      id="liquidity-bg-canvas"
      className="absolute inset-0 pointer-events-none z-0 w-full h-full opacity-90"
      aria-hidden="true"
    />
  );
};
