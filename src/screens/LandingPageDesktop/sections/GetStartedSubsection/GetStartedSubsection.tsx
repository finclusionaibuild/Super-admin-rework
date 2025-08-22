import React from "react";
import { Button } from "../../../../components/ui/button";

export const GetStartedSubsection = (): JSX.Element => {
  return (
    <section className="w-full bg-[#1c274c] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl lg:text-4xl font-semibold text-white mb-4 lg:mb-6 leading-tight font-raleway">
          Download our mobile app now to stay ontop of your finances
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 lg:mt-12">
          <Button className="bg-white text-[#1c274c] px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 h-12 lg:h-[51px]">
            <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#4340ff] rounded"></div>
            <span>Google Play</span>
          </Button>
          <Button className="bg-white text-[#1c274c] px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 h-12 lg:h-[51px]">
            <div className="w-5 lg:w-6 h-5 lg:h-6 bg-[#4340ff] rounded"></div>
            <span>App Store</span>
          </Button>
        </div>
      </div>
    </section>
  );
};