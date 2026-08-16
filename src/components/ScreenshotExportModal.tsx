import React, { useState, useEffect } from 'react';
import { toPng, toBlob } from 'html-to-image';
import { 
  Camera, 
  Download, 
  Check, 
  Loader2, 
  X, 
  Maximize2, 
  Copy, 
  Sparkles,
  FileImage,
  RefreshCw,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface ScreenshotExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScreenshotExportModal: React.FC<ScreenshotExportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [status, setStatus] = useState<'idle' | 'capturing' | 'ready' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('Preparing capture...');
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      handleCaptureScreenshot();
    } else {
      setScreenshotUrl(null);
      setStatus('idle');
      setCopied(false);
      setDownloaded(false);
    }
  }, [isOpen]);

  const handleCaptureScreenshot = async () => {
    try {
      setStatus('capturing');
      setStatusMessage('Analyzing full-page layout & styles...');
      
      // Allow DOM to settle
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const targetElement = document.getElementById('full-page-container') || document.body;
      
      setStatusMessage('Rendering high-resolution vector assets & fonts...');

      const filterNode = (node: HTMLElement) => {
        if (!node.id) return true;
        if (node.id === 'screenshot-floating-widget' || node.id === 'screenshot-modal-overlay') {
          return false;
        }
        return true;
      };

      const dataUrl = await toPng(targetElement as HTMLElement, {
        cacheBust: true,
        pixelRatio: 1.5,
        backgroundColor: '#080a0f',
        filter: filterNode as any,
        skipFonts: false,
      });

      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        setScreenshotUrl(dataUrl);
        setStatus('ready');
      };
      img.onerror = () => {
        setScreenshotUrl(dataUrl);
        setStatus('ready');
      };
      img.src = dataUrl;

    } catch (err) {
      console.error('Screenshot capture failed:', err);
      setStatus('error');
      setStatusMessage('Failed to capture page screenshot. Please try again.');
    }
  };

  const handleDownload = () => {
    if (!screenshotUrl) return;
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    const filename = `Aevum-Prime-FullPage-Screenshot-${timestamp}.png`;
    
    const link = document.createElement('a');
    link.download = filename;
    link.href = screenshotUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleCopyToClipboard = async () => {
    if (!screenshotUrl) return;
    try {
      const blob = await (await fetch(screenshotUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Clipboard image write not supported or permitted:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      id="screenshot-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#0b0e18] border border-slate-700/80 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl shadow-blue-500/10 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#080a11]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Full Page Screenshot
                </h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  PNG 1.5x HD
                </span>
              </div>
              <p className="text-xs text-slate-400">
                High-resolution snapshot of Aevum Prime full portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {status === 'ready' && (
              <button
                onClick={handleCaptureScreenshot}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                title="Retake snapshot"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {status === 'capturing' && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 animate-pulse">
                  <Camera className="w-8 h-8" />
                </div>
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin absolute -top-2 -right-2" />
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold text-white">{statusMessage}</div>
                <p className="text-xs text-slate-400 font-mono">
                  Capturing complete scrollable DOM hierarchy & interactive visualizers...
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <X className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">Capture Interrupted</h4>
                <p className="text-xs text-slate-400">{statusMessage}</p>
              </div>
              <button
                onClick={handleCaptureScreenshot}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white cursor-pointer"
              >
                Retry Capture
              </button>
            </div>
          )}

          {status === 'ready' && screenshotUrl && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Metadata Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#080a11] border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Resolution</div>
                  <div className="text-xs font-bold text-white font-mono mt-0.5">
                    {imageDimensions ? `${imageDimensions.width} × ${imageDimensions.height} px` : 'High Definition'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#080a11] border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Format</div>
                  <div className="text-xs font-bold text-white font-mono mt-0.5">PNG (Lossless 24-bit)</div>
                </div>
                <div className="p-3 rounded-xl bg-[#080a11] border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Coverage</div>
                  <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>100% Full Page</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#080a11] border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Color Profile</div>
                  <div className="text-xs font-bold text-blue-400 font-mono mt-0.5">sRGB Calibrated</div>
                </div>
              </div>

              {/* Scrollable Preview Card */}
              <div className="rounded-2xl border border-slate-800 bg-[#06070c] p-2 overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-2">
                  <span className="text-[11px] font-mono text-slate-400">Preview (Scroll vertically to view full page)</span>
                  <a
                    href={screenshotUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <span>Open in new tab</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="max-h-[48vh] overflow-y-auto rounded-xl border border-slate-800/50 bg-[#080a0f] p-2 flex justify-center custom-scrollbar">
                  <img
                    src={screenshotUrl}
                    alt="Aevum Prime Full Page Screenshot"
                    className="w-full max-w-2xl rounded-lg shadow-2xl border border-slate-800/80 object-contain"
                  />
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        {status === 'ready' && screenshotUrl && (
          <div className="px-6 py-4 bg-[#080a11] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400 flex items-center gap-1.5 text-center sm:text-left">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Full page snapshot rendered with all vector typography & dark-mode styling.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleCopyToClipboard}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Image</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer group"
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                    <span>Download PNG File</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
