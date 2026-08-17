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
import { SectionConnector } from './components/SectionConnector';
import { AmbientBackground } from './components/AmbientBackground';
import { Reveal } from './components/Reveal';
import { SecurityCenter } from './components/SecurityCenter';

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

      {/* Global ambient depth: subtle gradients, glow, grain, particles, grid, blurred forms */}
      <AmbientBackground />

      {/* Global Persistent Sticky Navbar */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenAccessRequest={() => setAccessRequestModalOpen(true)}
        onOpenScreenshot={() => setScreenshotModalOpen(true)}
      />

      {/* Main Website Flow */}
      <main className="relative z-10">
        {/* Narrative sequence: What → Why → How → Infrastructure → Network → Utility → Proof → Education → Conversion */}

        {/* 01 · Hero */}
        <HeroSection
          onOpenAccessRequest={() => setAccessRequestModalOpen(true)}
          onOpenSecurityModal={() => setSecurityModalOpen(true)}
        />

        {/* 02 · Trust / Security Strip */}
        <TrustProofBar
          onOpenSecurity={() => setSecurityModalOpen(true)}
        />

        {/* 03 · What the Platform Does  +  04 · Core Architecture (Platform Architecture & Core Capabilities) */}
        <PlatformOverview
          onOpenAccessRequest={() => setAccessRequestModalOpen(true)}
        />

        {/* 05 · How It Works — connective tissue: Platform → How It Works (flowing line) */}
        <SectionConnector variant="flow" />
        <Reveal>
          <HowItWorksTimeline
            onOpenAccessRequest={() => setAccessRequestModalOpen(true)}
          />
        </Reveal>

        {/* 06 · Liquidity Infrastructure — connective tissue: How It Works → Liquidity (stream) */}
        <SectionConnector variant="stream" />
        <Reveal>
          <LiquidityMechanicsVisualizer />
        </Reveal>

        {/* 07 · 2×6 Network — connective tissue: Liquidity → Network (branches into nodes) */}
        <SectionConnector variant="branch" />
        <Reveal>
          <MatrixExplanationVisualizer />
        </Reveal>

        {/* 08 · App Coin Utility — connective tissue: Network → App Coin (APX token) */}
        <SectionConnector variant="token" />
        <Reveal>
          <AppCoinUtility
            onOpenAccessRequest={() => setAccessRequestModalOpen(true)}
          />
        </Reveal>

        {/* Connective tissue: App Coin → Transparency (ledger blocks) */}
        <SectionConnector variant="ledger" />

        {/* 09 · Transparency Center */}
        <TransparencyCenter />

        {/* 10 · Security Center */}
        <SecurityCenter
          onOpenSecurityModal={() => setSecurityModalOpen(true)}
        />

        {/* 11 · Education Center */}
        <EducationCenter />

        {/* 12 · FAQ */}
        <Reveal>
          <PublicFaq />
        </Reveal>

        {/* 13 · Final CTA */}
        <FinalConversionSection
          onOpenAuth={handleOpenAuth}
          onOpenAccessRequest={() => setAccessRequestModalOpen(true)}
        />

        {/* 14 · Footer */}
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
