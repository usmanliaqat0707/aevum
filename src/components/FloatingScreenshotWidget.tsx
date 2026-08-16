import React, { useState } from 'react';
import { Camera, Download, Sparkles } from 'lucide-react';

interface FloatingScreenshotWidgetProps {
  onCapture: () => void;
}

export const FloatingScreenshotWidget: React.FC<FloatingScreenshotWidgetProps> = ({
  onCapture
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id="screenshot-floating-widget"
      className="fixed bottom-6 right-6 z-40 flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onCapture}
        aria-label="Capture Full Page Screenshot"
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#0d1222]/95 hover:bg-[#131b33] border border-blue-500/40 hover:border-blue-400 text-white shadow-2xl shadow-black/80 hover:shadow-blue-500/20 backdrop-blur-xl transition-all duration-200 cursor-pointer"
      >
        <div className="relative flex items-center justify-center">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Camera className="w-4 h-4" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
        </div>

        <div className="flex flex-col text-left pr-1">
          <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5 leading-none">
            <span>Full Page Screenshot</span>
          </div>
          <div className="text-[10px] text-blue-400/90 font-mono mt-1 leading-none flex items-center gap-1">
            <Download className="w-2.5 h-2.5" />
            <span>Download PNG</span>
          </div>
        </div>
      </button>
    </div>
  );
};
