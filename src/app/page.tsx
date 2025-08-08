import Header from '@/components/ui/Header';
import HeroSection from '@/components/sections/HeroSection';
import LogoTicker from '@/components/sections/LogoTicker';
import HowItWorks from '@/components/sections/HowItWorks';
import IndustryModules from '@/components/sections/IndustryModules';
import ROICalculator from '@/components/sections/ROICalculator';
import Testimonials from '@/components/sections/Testimonials';
import DeveloperSection from '@/components/sections/DeveloperSection';
import Pricing from '@/components/sections/Pricing';
import Footer from '@/components/sections/Footer';
import MobileFooterCTA from '@/components/ui/MobileFooterCTA';

export default function HomePage() {
  return (
    <>
      {/* Pill-shaped Header - Fixed position */}
      <Header />
      
      <main className="min-h-screen">

        <HeroSection />
        <LogoTicker />
        <HowItWorks />
        <IndustryModules />
        <ROICalculator />
        <Testimonials />
        <DeveloperSection />
        <Pricing />
        <Footer />
        <MobileFooterCTA />
      </main>
    </>
  );
}
