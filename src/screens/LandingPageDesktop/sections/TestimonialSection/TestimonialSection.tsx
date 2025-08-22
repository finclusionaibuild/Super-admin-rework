import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../../components/ui/card";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";

export const TestimonialSection = (): JSX.Element => {
  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Testimonial Card - Mobile Responsive */}
        <div className="relative mb-16 lg:mb-20">
          <Card className="bg-[#f8f9ff] border-none rounded-2xl lg:rounded-3xl shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-6 lg:p-12 text-center relative">
              {/* Navigation arrows - Hidden on mobile */}
              <button className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:shadow-xl transition-shadow">
                <ChevronLeftIcon className="w-6 h-6 text-[#4340ff]" />
              </button>
              <button className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:shadow-xl transition-shadow">
                <ChevronRightIcon className="w-6 h-6 text-[#4340ff]" />
              </button>

              <div className="flex justify-center gap-1 mb-6 lg:mb-8">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 lg:w-6 h-5 lg:h-6 fill-[#ffbd16] text-[#ffbd16]" />
                ))}
              </div>
              
              <blockquote className="text-lg lg:text-2xl text-[#201f4f] font-medium leading-relaxed mb-8 lg:mb-10 max-w-3xl mx-auto">
                "Easy, intuitive & fast payment confirmation. I love it. 
                This is the best app I have used for my business. I love it. 
                It's easy to use and very fast."
              </blockquote>
              
              <div className="flex justify-center">
                <div className="flex items-center gap-3 lg:gap-4">
                  <Avatar className="w-12 lg:w-16 h-12 lg:h-16">
                    <AvatarFallback className="bg-[#4340ff] text-white text-base lg:text-lg font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-semibold text-[#201f4f] text-base lg:text-lg">John Doe</div>
                    <div className="text-[#667085] text-sm lg:text-base">Business Owner</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6 lg:mt-8">
            <div className="w-3 h-3 bg-[#4340ff] rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* CTA Section - Mobile Responsive */}
        <div className="text-center">
          <h2 className="text-3xl lg:text-5xl font-semibold text-[#201f4f] tracking-[-1px] lg:tracking-[-2px] mb-4 lg:mb-6 leading-tight font-raleway">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-[#667085] text-base lg:text-xl mb-8 lg:mb-10 leading-relaxed">
            Sign up today and experience the future of banking
          </p>
          <Button className="bg-[#4340ff] text-white px-8 lg:px-10 py-4 lg:py-5 text-base lg:text-lg font-semibold rounded-xl hover:bg-[#3632e6] transition-colors h-12 lg:h-[51px] w-full sm:w-auto" asChild>
            <Link to="/signup">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};