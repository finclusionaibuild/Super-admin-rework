import { ArrowRightIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { FooterSubsection } from "./sections/FooterSubsection";
import { HeroSection } from "./sections/HeroSection";
import { WhyChooseSection } from "./sections/WhyChooseSection";
import { SmarterBankingSection } from "./sections/SmarterBankingSection";
import { BusinessSolutionSection } from "./sections/BusinessSolutionSection";
import { TrustSection } from "./sections/TrustSection";
import { TestimonialSection } from "./sections/TestimonialSection";
import { GetStartedSubsection } from "./sections/GetStartedSubsection";

export const LandingPageDesktop = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-white font-inter">
      {/* Navigation Header - Fully Responsive */}
      <div className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-[#e8e6ff] py-2 lg:py-4' 
          : 'bg-[#e8e6ff] pt-4 lg:pt-8 pb-2 lg:pb-4'
      }`}>
        {/* Desktop Layout - Different structure when scrolled vs not scrolled */}
        <div className="hidden lg:block">
          {isScrolled ? (
            // Scrolled state - Full width container with space-between
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between w-full">
                {/* Logo */}
                <div className="relative w-[140px] h-[51px] flex items-center">
                  <Link to="/">
                    <img 
                      src="/Logo Main Trans.png" 
                      alt="SureBanker" 
                      className="h-8 w-auto object-contain"
                    />
                  </Link>
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="px-6 py-4 rounded-xl h-[51px]" asChild>
                    <Link to="/signin">
                      <span className="font-semibold text-[#4340ff] text-sm">
                        Sign in
                      </span>
                    </Link>
                  </Button>

                  <Button className="h-[51px] px-6 py-4 bg-[#e9e8ff] rounded-xl hover:bg-[#d9d8ff]" asChild>
                    <Link to="/signup">
                      <span className="font-semibold text-[#4340ff] text-sm mr-2">
                        Sign Up
                      </span>
                      <ArrowRightIcon className="w-4 h-4 text-[#4340ff]" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Non-scrolled state - Centered card
            <div className="flex justify-center w-full">
              <Card className="inline-flex items-center gap-2.5 px-6 py-4 overflow-hidden border-none bg-[#f8f7ff] rounded-3xl">
                <div className="flex items-center justify-between gap-8">
                  {/* Logo */}
                  <div className="relative w-[140px] h-[51px] flex items-center flex-shrink-0">
                    <Link to="/">
                      <img 
                        src="/Logo Main Trans.png" 
                        alt="SureBanker" 
                        className="h-8 w-auto object-contain"
                      />
                    </Link>
                  </div>

                  {/* Desktop Navigation */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="ghost" className="px-6 py-4 rounded-xl h-[51px]" asChild>
                      <Link to="/signin">
                        <span className="font-semibold text-[#4340ff] text-sm">
                          Sign in
                        </span>
                      </Link>
                    </Button>

                    <Button className="h-[51px] px-6 py-4 bg-[#e9e8ff] rounded-xl hover:bg-[#d9d8ff]" asChild>
                      <Link to="/individual-onboarding">
                        <span className="font-semibold text-[#4340ff] text-sm mr-2">
                          Sign Up
                        </span>
                        <ArrowRightIcon className="w-4 h-4 text-[#4340ff]" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Mobile Layout - Unchanged */}
        <div className="lg:hidden px-4">
          <Card className="inline-flex flex-col items-start gap-2.5 px-4 py-3 overflow-hidden border-none bg-[#f8f7ff] rounded-2xl w-full">
            <div className="flex items-center justify-between w-full gap-4">
              {/* Logo */}
              <div className="relative w-[120px] h-[40px] flex items-center">
                <Link to="/">
                  <img 
                    src="/Logo Main Trans.png" 
                    alt="SureBanker" 
                    className="h-6 w-auto object-contain"
                  />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2"
                >
                  <div className="w-6 h-6 flex flex-col justify-center items-center">
                    <span className={`bg-[#4340ff] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                    <span className={`bg-[#4340ff] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`bg-[#4340ff] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="w-full mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-col gap-3">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                      <span className="font-semibold text-[#4340ff]">Sign in</span>
                    </Link>
                  </Button>
                  <Button className="w-full bg-[#4340ff] text-white hover:bg-[#3632e6]" asChild>
                    <Link to="/individual-onboarding" onClick={() => setIsMobileMenuOpen(false)}>
                      <span className="font-semibold mr-2">Sign Up</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      <div className="flex flex-col w-full items-start">
        <HeroSection />
        <WhyChooseSection />
        <SmarterBankingSection />
        <BusinessSolutionSection />
        <TrustSection />
        <TestimonialSection />
        <GetStartedSubsection />
        <FooterSubsection />
      </div>
    </div>
  );
};