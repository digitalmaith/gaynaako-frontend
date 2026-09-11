import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { ProblemSection } from "@/features/landing/components/ProblemSection";
import { HowItWorksSection } from "@/features/landing/components/HowItWorksSection";
import { AudienceSection } from "@/features/landing/components/AudienceSection";
import { FeaturesSection } from "@/features/landing/components/FeaturesSection";
import { ChatbotPreviewSection } from "@/features/landing/components/ChatbotPreviewSection";
import { CtaSection } from "@/features/landing/components/CtaSection";
import { LandingFooter } from "@/features/landing/components/LandingFooter";

export default function LandingPage() {
  return (
    <div className="font-body">
      <LandingNavbar />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <AudienceSection />
      <FeaturesSection />
      <ChatbotPreviewSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}