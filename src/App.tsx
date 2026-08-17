import React, { useState } from 'react';
import { LiquidityBackgroundCanvas } from './components/Canvas/LiquidityBackgroundCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustProofBar } from './components/TrustProofBar';
import { PlatformOverview } from './components/PlatformOverview';
import { HowItWorksTimeline } from './components/HowItWorksTimeline';
import { LiquidityMechanicsVisualizer } from './components/LiquidityMechanicsVisualizer';
import { MatrixExplanationVisualizer } from './components/MatrixExplanationVisualizer';
import { AppCoinUtility } from './components/AppCoinUtility';
import { TransparencyCenter } from './components/TransparencyCenter';
import { EducationCenter } from './components/EducationCenter';
import { PublicFaq } from './components/PublicFaq';
import { FinalConversionSection } from './components/FinalConversionSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/Modals/AuthModal';
import { RequestAccessModal } from './components/Modals/RequestAccessModal';
import { SecurityAuditModal } from './components/Modals/SecurityAuditModal';
import { ScreenshotExportModal } from './components/ScreenshotExportModal';
import { FloatingScreenshotWidget } from './components/FloatingScreenshotWidget';
import { Reveal } from './components/Reveal';

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [accessRequestModalOpen, setAccessRequestModalOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [screenshotModalOpen, setScreenshotModalOpen] = useState(false);

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div id="full-page-container" className="min-h-screen bg-[#080a0f] text-slate-100 selection:bg-blue-500 selection:text-white relative">
      
      {/* Background Interactive Ambient Canvas */}
      <LiquidityBackgroundCanvas interactive={true} />

      {/* Global Persistent Sticky Navbar */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenAccessRequest={() => setAccessRequestModalOpen(true)}
        onOpenScreenshot={() => setScreenshotModalOpen(true)}
      />

      {/* Main Website Flow */}
      <main className="relative z-10">
        {/* 1. Hero Section: Explain -> Build Trust -> Reduce Uncertainty -> Convert */}
        <HeroSection
          onOpenAccessRequest={() => setAccessRequestModalOpen(true)}
          onOpenSecurityModal={() => setSecurityModalOpen(true)}
        />

        {/* 2. Trust Proof & Auditor Credentials */}
        <TrustProofBar
          onOpenSecurity={() => setSecurityModalOpen(true)}
        />

        {/* 2.5 Platform Overview: Wallet, Network, Analytics */}
        <PlatformOverview
          onOpenAccessRequest={() => setAccessRequestModalOpen(true)}
        />

        {/* 2.6 How It Works: Animated Timeline */}
        <Reveal>
          <HowItWorksTimeline
            onOpenAccessRequest={() => setAccessRequestModalOpen(true)}
          />
        </Reveal>

        {/* 2.7 Liquidity Explanation: Interactive Mechanics Visualizer */}
        <Reveal>
          <LiquidityMechanicsVisualizer />
        </Reveal>

        {/* 2.8 Matrix Explanation: 2x6 Interactive Network Structure */}
        <Reveal>
          <MatrixExplanationVisualizer />
        </Reveal>

        {/* 2.9 App Coin: Protocol Utility Specification */}
        <Reveal>
          <AppCoinUtility
            onOpenAccessRequest={() => setAccessRequestModalOpen(true)}
          />
        </Reveal>

        {/* 2.11 Transparency Center: Verifiable Evidence & Public Repository */}
        <TransparencyCenter />

        {/* 2.12 Education Center: Editorial Knowledge Repository */}
        <EducationCenter />

        {/* 2.13 Public FAQ: Search-First Institutional Knowledge Base */}
        <Reveal>
          <PublicFaq />
        </Reveal>

        {/* Final Conversion Section: Dark Immersive CTA */}
        <FinalConversionSection
          onOpenAuth={handleOpenAuth}
          onOpenAccessRequest={() => setAccessRequestModalOpen(true)}
        />

        {/* Footer with Regulatory Disclosures and Status */}
        <Footer
          onOpenAccessRequest={() => setAccessRequestModalOpen(true)}
          onOpenSecurityModal={() => setSecurityModalOpen(true)}
          onOpenScreenshot={() => setScreenshotModalOpen(true)}
        />
      </main>

      {/* Floating Action Widget */}
      <FloatingScreenshotWidget
        onCapture={() => setScreenshotModalOpen(true)}
      />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      <RequestAccessModal
        isOpen={accessRequestModalOpen}
        onClose={() => setAccessRequestModalOpen(false)}
      />

      <SecurityAuditModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
      />

      <ScreenshotExportModal
        isOpen={screenshotModalOpen}
        onClose={() => setScreenshotModalOpen(false)}
      />
    </div>
  );
}
