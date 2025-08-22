import React from "react";

export const WhyChooseSection = (): JSX.Element => {
  const features = [
    {
      title: "Cashless Payments",
      image: "/Frame 1618874545.png",
    },
    {
      title: "Expense Tracking", 
      image: "/Frame 1618874544.png",
    },
    {
      title: "Quick Transfers",
      image: "/Frame 1618874543 (1).png",
    },
    {
      title: "Smart Banking",
      image: "/Frame 1618874546.png",
    },
  ];

  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#201f4f] tracking-[-1px] lg:tracking-[-2px] mb-4 font-raleway">
            Why Choose SureBanker?
          </h2>
        </div>

        {/* Mobile: Single column, Desktop: 2x2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg lg:shadow-none">
              <img 
                src={feature.image} 
                alt={feature.title}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};