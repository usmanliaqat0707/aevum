import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Cpu,
  TrendingUp,
  Lock,
  FileCode,
  Building2,
  BookOpen,
  HelpCircle,
  Coins,
  Network,
  FileCheck2,
  AlertTriangle,
  Mail,
  Briefcase,
  Camera
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenAccessRequest: () => void;
  onOpenScreenshot?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenAccessRequest,
  onOpenScreenshot,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070912]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/50 py-3'
          : 'bg-[#070912]/40 backdrop-blur-md border-b border-slate-800/30 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Brand Identity & Logo */}
          <div className="flex items-center gap-6 xl:gap-8">
            <button
              onClick={() => scrollToSection('hero-section')}
              className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
              id="brand-logo-btn"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 flex items-center justify-center p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                <div className="w-full h-full bg-[#0b0d14] rounded-[10px] flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <div className="w-3.5 h-3.5 border-2 border-blue-400 rotate-45 rounded-[2px]" />
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full absolute" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  AEVUM
                  <span className="text-[9px] font-mono font-semibold uppercase px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/25 tracking-wider">
                    PRIME
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider font-mono uppercase">
                  Institutional Assets
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links (Clean & Conversion-Focused) */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[13.5px]">
              
              {/* 1. Platform Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('platform')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  id="nav-platform-btn"
                  onClick={() => scrollToSection('platform-overview-section')}
                  className={`px-3 py-2 font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                    activeDropdown === 'platform' ? 'text-white bg-slate-800/60' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  Platform
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'platform' ? 'rotate-180 text-blue-400' : ''}`} />
                </button>

                {activeDropdown === 'platform' && (
                  <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-3 bg-[#0a0d17] border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-2xl space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1 font-semibold">
                        Platform Architecture
                      </div>

                      <button
                        onClick={() => scrollToSection('platform-overview-section')}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5 group-hover:bg-blue-500/20">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-blue-300">Overview</div>
                          <div className="text-[11px] text-slate-400 leading-tight">Unified institutional infrastructure</div>
                        </div>
                      </button>

                      <button
                        onClick={() => scrollToSection('how-it-works-section')}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5 group-hover:bg-indigo-500/20">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-indigo-300">How It Works</div>
                          <div className="text-[11px] text-slate-400 leading-tight">Lifecycle of an institutional transaction</div>
                        </div>
                      </button>

                      <button
                        onClick={() => scrollToSection('liquidity-explanation-section')}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5 group-hover:bg-emerald-500/20">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-emerald-300">Liquidity</div>
                          <div className="text-[11px] text-slate-400 leading-tight">Smart order routing across 45+ venues</div>
                        </div>
                      </button>

                      <button
                        onClick={() => scrollToSection('app-coin-section')}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5 group-hover:bg-amber-500/20">
                          <Coins className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-amber-300">App Coin</div>
                          <div className="text-[11px] text-slate-400 leading-tight">APEX-UTL utility specification & offsets</div>
                        </div>
                      </button>

                      <button
                        onClick={() => scrollToSection('matrix-explanation-section')}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5 group-hover:bg-cyan-500/20">
                          <Network className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-cyan-300">Network</div>
                          <div className="text-[11px] text-slate-400 leading-tight">2×6 dual-branch expansion topology</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Direct High-Intent Top-Level Item: How It Works */}
              <button
                id="nav-how-it-works-btn"
                onClick={() => scrollToSection('how-it-works-section')}
                className="px-3 py-2 font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                How It Works
              </button>

              {/* 3. Security & Trust Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('security')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  id="nav-security-btn"
                  onClick={() => scrollToSection('transparency-center-section')}
                  className={`px-3 py-2 font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                    activeDropdown === 'security' ? 'text-white bg-slate-800/60' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <span>Security & Trust</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'security' ? 'rotate-180 text-blue-400' : ''}`} />
                </button>

                {activeDropdown === 'security' && (
                  <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-3 bg-[#0a0d17] border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-2xl space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1 font-semibold">
                        Institutional Governance
                      </div>

                      <button
                        onClick={() => scrollToSection('transparency-center-section')}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5 group-hover:bg-blue-500/20">
                          <Lock className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-blue-300">Security & Enclaves</div>
                          <div className="text-[11px] text-slate-400 leading-tight">Keyless MPC-CMP & FIPS 140-3 HSM enclaves</div>
                        </div>
                      </button>

                      <button
                        onClick={() => scrollToSection('transparency-center-section')}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5 group-hover:bg-emerald-500/20">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-emerald-300">Transparency</div>
                          <div className="text-[11px] text-slate-400 leading-tight">Verifiable public ledger & custody manifests</div>
                        </div>
                      </button>

                      <button
                        onClick={() => scrollToSection('transparency-center-section')}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5 group-hover:bg-cyan-500/20">
                          <FileCheck2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-cyan-300">Audit & Reports</div>
                          <div className="text-[11px] text-slate-400 leading-tight">SOC 2 Type II, ISO 27001 & audits</div>
                        </div>
                      </button>

                      <button
                        onClick={() => scrollToSection('app-coin-section')}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5 group-hover:bg-amber-500/20">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-amber-300">Risk Disclosure</div>
                          <div className="text-[11px] text-slate-400 leading-tight">Comprehensive systemic & operational policies</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  id="nav-resources-btn"
                  onClick={() => scrollToSection('education-center-section')}
                  className={`px-3 py-2 font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                    activeDropdown === 'resources' ? 'text-white bg-slate-800/60' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  Resources
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'resources' ? 'rotate-180 text-blue-400' : ''}`} />
                </button>

                {activeDropdown === 'resources' && (
                  <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-3 bg-[#0a0d17] border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-2xl space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1 font-semibold">
                        Knowledge Repository
                      </div>

                      <button
                        onClick={() => scrollToSection('education-center-section')}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5 group-hover:bg-blue-500/20">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-blue-300">Learning Center</div>
                          <div className="text-[11px] text-slate-400 leading-tight">Editorial briefings from Beginner to Advanced</div>
                        </div>
                      </button>

                      <button
                        onClick={() => scrollToSection('public-faq-section')}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5 group-hover:bg-cyan-500/20">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-cyan-300">Public FAQ</div>
                          <div className="text-[11px] text-slate-400 leading-tight">Search-first answers with flow diagrams</div>
                        </div>
                      </button>

                      <button
                        onClick={() => scrollToSection('public-faq-section')}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5 group-hover:bg-emerald-500/20">
                          <FileCheck2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-emerald-300">Glossary</div>
                          <div className="text-[11px] text-slate-400 leading-tight">MPC, FISA, TRP V2, and UCC Art. 8 definitions</div>
                        </div>
                      </button>

                      {onOpenScreenshot && (
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            onOpenScreenshot();
                          }}
                          className="w-full p-2.5 rounded-xl hover:bg-blue-600/10 text-left transition-colors flex items-start gap-3 group cursor-pointer border-t border-slate-800/80 pt-2"
                        >
                          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300 mt-0.5 group-hover:bg-blue-500/30">
                            <Camera className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                              <span>Full Page Screenshot</span>
                              <span className="text-[9px] font-mono uppercase bg-blue-500/20 text-blue-300 px-1.5 rounded">PNG</span>
                            </div>
                            <div className="text-[11px] text-slate-400 leading-tight">Download HD snapshot of full page</div>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Company Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('company')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  id="nav-company-btn"
                  onClick={() => scrollToSection('transparency-center-section')}
                  className={`px-3 py-2 font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                    activeDropdown === 'company' ? 'text-white bg-slate-800/60' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  Company
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'company' ? 'rotate-180 text-blue-400' : ''}`} />
                </button>

                {activeDropdown === 'company' && (
                  <div className="absolute top-full left-0 w-72 pt-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-3 bg-[#0a0d17] border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-2xl space-y-1">
                      <button
                        onClick={() => scrollToSection('transparency-center-section')}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5 group-hover:bg-blue-500/20">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-blue-300">About & Governance</div>
                          <div className="text-[11px] text-slate-400 leading-tight">Corporate structure & charters</div>
                        </div>
                      </button>

                      <button
                        onClick={onOpenAccessRequest}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5 group-hover:bg-emerald-500/20">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-emerald-300">Contact</div>
                          <div className="text-[11px] text-slate-400 leading-tight">Connect with institutional coverage desk</div>
                        </div>
                      </button>

                      <button
                        onClick={onOpenAccessRequest}
                        className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5 group-hover:bg-cyan-500/20">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-cyan-300">Careers</div>
                          <div className="text-[11px] text-slate-400 leading-tight">Join engineering & cryptography teams</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Pricing / Fees (Direct Link) */}
              <button
                id="nav-pricing-btn"
                onClick={() => scrollToSection('app-coin-section')}
                className="px-3 py-2 font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/40 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Pricing / Fees</span>
              </button>

            </nav>
          </div>

          {/* Right Action Controls: Log In + Create Account */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Log In Button */}
            <button
              id="desktop-login-btn"
              onClick={() => onOpenAuth('login')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-xl transition-colors cursor-pointer"
            >
              Log In
            </button>

            {/* Create Account — Primary CTA */}
            <button
              id="desktop-create-account-btn"
              onClick={() => onOpenAuth('signup')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/35 transition-all flex items-center gap-1.5 border border-blue-400/30 cursor-pointer group"
            >
              <span>Create Account</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Right Controls: Sign In + Get Started + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-signin-btn"
              onClick={() => onOpenAuth('login')}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
            >
              Log In
            </button>
            <button
              id="mobile-getstarted-btn"
              onClick={() => onOpenAuth('signup')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg cursor-pointer"
            >
              Create Account
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070912]/98 border-b border-slate-800 backdrop-blur-2xl px-4 pt-4 pb-6 space-y-4 animate-in fade-in duration-200">
          
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1 font-semibold">
              Navigation
            </div>
            
            <button
              onClick={() => scrollToSection('platform-overview-section')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-lg flex items-center justify-between cursor-pointer"
            >
              <span>Platform</span>
              <span className="text-xs text-slate-500 font-mono">Overview • Liquidity • Matrix</span>
            </button>

            <button
              onClick={() => scrollToSection('how-it-works-section')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-lg flex items-center justify-between cursor-pointer"
            >
              <span>How It Works</span>
              <span className="text-xs text-blue-400 font-mono">Lifecycle</span>
            </button>

            <button
              onClick={() => scrollToSection('transparency-center-section')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-lg flex items-center justify-between cursor-pointer"
            >
              <span>Security & Trust</span>
              <span className="text-xs text-slate-500 font-mono">MPC • Reserves • Audits</span>
            </button>

            <button
              onClick={() => scrollToSection('education-center-section')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-lg flex items-center justify-between cursor-pointer"
            >
              <span>Resources & FAQ</span>
              <span className="text-xs text-slate-500 font-mono">Editorial • Search FAQ</span>
            </button>

            <button
              onClick={() => scrollToSection('app-coin-section')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-lg flex items-center justify-between cursor-pointer"
            >
              <span>Pricing / Fees</span>
              <span className="text-xs text-slate-500 font-mono">Utility & Tiering</span>
            </button>

            <button
              onClick={() => scrollToSection('transparency-center-section')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-lg flex items-center justify-between cursor-pointer"
            >
              <span>Company</span>
              <span className="text-xs text-slate-500 font-mono">About • Charters</span>
            </button>

            {onOpenScreenshot && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenScreenshot();
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-blue-300 hover:text-white bg-blue-500/10 hover:bg-blue-500/20 rounded-lg flex items-center justify-between border border-blue-500/30 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-blue-400" />
                  <span>Full Page Screenshot</span>
                </span>
                <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">
                  Download PNG
                </span>
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('signup');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
