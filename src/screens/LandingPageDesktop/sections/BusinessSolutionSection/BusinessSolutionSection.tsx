import React from "react";
import { Button } from "../../../../components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export const BusinessSolutionSection = (): JSX.Element => {
  return (
    <section className="w-full bg-white">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="px-4 py-12">
          <div className="text-center mb-8">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Business professional with crossed arms smiling"
              className="w-full max-w-sm mx-auto rounded-2xl shadow-lg mb-6"
            />
            <h2 className="text-3xl font-semibold mb-4 leading-tight font-raleway text-[#201f4f]">
              The Banking Solution your business needs
            </h2>
            <p className="text-[#667085] text-base mb-8 leading-relaxed">
              SureBanker Business gives you the tools to manage payments, 
              handle payroll, and grow your business—all from one platform.
            </p>
            <Button className="bg-[#4340ff] text-white px-8 py-4 text-base font-semibold rounded-xl hover:bg-[#3632e6] transition-colors h-[51px] flex items-center gap-2 w-full">
              Open an Account
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid grid-cols-2 min-h-[600px]">
        {/* Left side - Image */}
        <div className="relative overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Business professional with crossed arms smiling"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Content with dark background */}
        <div className="bg-black text-white flex items-center">
          <div className="px-16 py-20">
            <h2 className="text-5xl font-semibold mb-8 leading-tight font-raleway">
              The Banking Solution<br />
              your business needs
            </h2>
            
            <p className="text-gray-300 text-lg mb-12 leading-relaxed max-w-lg">
              SureBanker Business gives you the tools to manage payments, 
              handle payroll, and grow your business—all from one platform.
            </p>

            <Button className="bg-white text-black px-8 py-4 text-base font-semibold rounded-xl hover:bg-gray-100 transition-colors h-[51px] flex items-center gap-2">
              Open an Account
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};