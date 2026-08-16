import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  KeyRound, 
  ShieldCheck, 
  ArrowRight, 
  Fingerprint, 
  CheckCircle2,
  Building2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
  onLoginSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'credentials' | 'fido2' | 'success'>('credentials');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('fido2');
    }, 700);
  };

  const handleFido2Auth = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('success');
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      setTimeout(() => {
        onClose();
        setStep('credentials');
      }, 1600);
    }, 900);
  };

  const handleDemoLogin = () => {
    setEmail('chief.risk.officer@vanguard-alpha.com');
    setPassword('••••••••••••');
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('fido2');
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0a0d16] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {mode === 'login' ? 'Institutional Console Login' : 'Create Qualified Account'}
          </h3>
          <p className="text-xs text-slate-400">
            Hardware-enforced FIDO2 / WebAuthn authentication required.
          </p>
        </div>

        {/* Quick Demo Access Trigger */}
        <div className="mb-6 p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-white">Test Institutional Sandbox?</div>
            <div className="text-[11px] text-blue-300">Prefill verified CIO credentials</div>
          </div>
          <button
            onClick={handleDemoLogin}
            className="px-2.5 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shrink-0"
          >
            1-Click Demo
          </button>
        </div>

        {step === 'credentials' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Institutional Work Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@institution.com"
                className="w-full bg-[#07090f] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-medium text-slate-300">Password</label>
                <span className="text-blue-400 hover:underline cursor-pointer">Forgot?</span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#07090f] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              {isVerifying ? 'Authenticating...' : 'Continue to Hardware Key / FIDO2'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {step === 'fido2' && (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 mx-auto flex items-center justify-center ring-8 ring-blue-500/05 animate-pulse">
              <Fingerprint className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Hardware Key / Bio-Auth Touch</h4>
              <p className="text-xs text-slate-400">
                Insert your YubiKey or touch TouchID/Windows Hello to release cryptographic session key.
              </p>
            </div>

            <button
              onClick={handleFido2Auth}
              disabled={isVerifying}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 cursor-pointer"
            >
              {isVerifying ? 'Verifying Hardware Attestation...' : 'Simulate FIDO2 Touch Signature'}
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-4 text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center ring-8 ring-emerald-500/10">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">Session Authenticated</h4>
              <p className="text-xs text-slate-300">
                Hardware token signature validated. Secure institutional session established.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Attestation ID: #FIDO2-0941A</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
