
import { Helmet } from 'react-helmet-async';
import { SalesHero } from '@/components/sales/SalesHero';
import { ProblemSolution } from '@/components/sales/ProblemSolution';
import { FeaturesShowcase } from '@/components/sales/FeaturesShowcase';
import { DemoSection } from '@/components/sales/DemoSection';
import { PricingSection } from '@/components/sales/PricingSection';
import { TestimonialsSection } from '@/components/sales/TestimonialsSection';
import { FinalCTA } from '@/components/sales/FinalCTA';
import { SalesChatWidget } from '@/components/sales/SalesChatWidget';

const SalesPage = () => {
  return (
    <>
      <Helmet>
        <title>Home Listing AI - Turn Every Property Into a 24/7 Sales Agent | Real Estate AI Chat</title>
        <meta name="description" content="Transform your real estate listings with AI-powered chat that captures leads 24/7. Voice chat, auto-scheduling, and 300% more leads. 15-day money back guarantee. Start at $39/month." />
        <meta name="keywords" content="real estate AI, property chat bot, real estate lead generation, AI listing agent, real estate automation, property marketing AI, real estate chatbot, lead capture software" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homelistingai.com/sales" />
        <meta property="og:title" content="Home Listing AI - 24/7 AI Sales Agent for Real Estate" />
        <meta property="og:description" content="AI-powered chat system that answers buyer questions instantly, schedules appointments, and captures leads while you sleep. 300% more leads guaranteed." />
        <meta property="og:image" content="/lovable-uploads/8fee2013-89fc-47e0-ba14-1795e366cdc3.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://homelistingai.com/sales" />
        <meta property="twitter:title" content="Home Listing AI - 24/7 AI Sales Agent for Real Estate" />
        <meta property="twitter:description" content="Transform your listings with AI chat. 300% more leads, voice interactions, auto-scheduling. Start in 5 minutes." />
        <meta property="twitter:image" content="/lovable-uploads/8fee2013-89fc-47e0-ba14-1795e366cdc3.png" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Home Listing AI",
            "applicationCategory": "Real Estate Software",
            "operatingSystem": "Web Browser",
            "description": "AI-powered real estate listing chat system that captures leads 24/7 with voice chat and auto-scheduling",
            "offers": [
              {
                "@type": "Offer",
                "name": "Starter Plan",
                "price": "39",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "39",
                  "priceCurrency": "USD",
                  "unitText": "MONTH"
                }
              },
              {
                "@type": "Offer",
                "name": "Professional Plan",
                "price": "49",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "49",
                  "priceCurrency": "USD",
                  "unitText": "MONTH"
                }
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "3"
            }
          })}
        </script>

        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Home Listing AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://homelistingai.com/sales" />
      </Helmet>

      <div className="min-h-screen bg-white w-screen overflow-x-hidden" style={{ margin: 0, padding: 0 }}>
        <SalesHero />
        <ProblemSolution />
        <FeaturesShowcase />
        <DemoSection />
        <PricingSection />
        <TestimonialsSection />
        <FinalCTA />
        <SalesChatWidget />
      </div>
    </>
  );
};

export default SalesPage;
