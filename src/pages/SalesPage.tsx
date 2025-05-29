
import { SalesHero } from '@/components/sales/SalesHero';
import { ProblemSolution } from '@/components/sales/ProblemSolution';
import { FeaturesShowcase } from '@/components/sales/FeaturesShowcase';
import { DemoSection } from '@/components/sales/DemoSection';
import { PricingSection } from '@/components/sales/PricingSection';
import { TestimonialsSection } from '@/components/sales/TestimonialsSection';
import { FinalCTA } from '@/components/sales/FinalCTA';

const SalesPage = () => {
  return (
    <div className="min-h-screen bg-white w-screen overflow-x-hidden">
      <SalesHero />
      <ProblemSolution />
      <FeaturesShowcase />
      <DemoSection />
      <PricingSection />
      <TestimonialsSection />
      <FinalCTA />
    </div>
  );
};

export default SalesPage;
