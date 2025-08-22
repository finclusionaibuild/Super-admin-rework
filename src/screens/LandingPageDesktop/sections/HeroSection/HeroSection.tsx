import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export const HeroSection = (): JSX.Element => {
  return (
    <section className="w-full bg-[#e8e6ff] pt-8 lg:pt-16 pb-12 lg:pb-20 relative overflow-hidden -mt-16 lg:-mt-20">
      {/* Background SVG Pattern - Responsive */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-20 lg:opacity-30">
        <svg 
          width="1424" 
          height="900" 
          viewBox="0 0 1424 900" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <g clipPath="url(#clip0_5591_90995)">
            <mask id="mask0_5591_90995" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="500" height="900">
              <path d="M500 0H0V900H500V0Z" fill="white"/>
            </mask>
            <g mask="url(#mask0_5591_90995)">
              <mask id="mask1_5591_90995" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="-667" y="119" width="1152" height="755">
                <path d="M193.337 870.65L474.957 827.674C482.238 826.563 486.68 819.076 484.16 812.163L288.073 274.215C249.689 168.914 142.195 105.393 31.1625 122.352L-465.832 198.213C-613.43 220.786 -703.508 372.518 -652.482 512.545C-613.873 618.364 -505.895 682.289 -394.328 665.284L-108.934 621.701C-103.436 620.862 -98.1097 624.013 -96.2062 629.233L-63.5809 718.699C-25.1969 824 82.3049 887.61 193.337 870.65Z" fill="url(#paint0_linear_5591_90995)"/>
              </mask>
              <g mask="url(#mask1_5591_90995)">
                <mask id="mask2_5591_90995" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="1428" height="900">
                  <path d="M0 0H1428V900H0V0Z" fill="white"/>
                </mask>
                <g mask="url(#mask2_5591_90995)">
                  <path d="M191.915 868.789L472.133 826.026C479.377 824.921 483.797 817.471 481.29 810.593L286.178 275.321C247.985 170.544 141.027 107.339 30.5471 124.214L-463.973 199.697C-610.837 222.158 -700.466 373.135 -649.694 512.465C-611.277 617.758 -503.837 681.365 -392.826 664.444L-108.852 621.078C-103.382 620.243 -98.0816 623.379 -96.1876 628.573L-63.7247 717.594C-25.5318 822.371 81.4349 885.664 191.915 868.789Z" fill="url(#paint1_linear_5591_90995)"/>
                  <path d="M1426.5 12V888C1426.5 894.623 1421.12 900 1414.5 900H10.5C3.87718 900 -1.5 894.623 -1.5 888V12C-1.5 5.3772 3.87718 0 10.5 0H1414.5C1421.12 0 1426.5 5.3772 1426.5 12Z" fill="url(#paint2_linear_5591_90995)"/>
                </g>
              </g>
            </g>
          </g>
          <g clipPath="url(#clip1_5591_90995)">
            <mask id="mask3_5591_90995" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="924" y="0" width="500" height="900">
              <path d="M1424 0H924V900H1424V0Z" fill="white"/>
            </mask>
            <g mask="url(#mask3_5591_90995)">
              <mask id="mask4_5591_90995" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="932" y="118" width="1153" height="754">
                <path d="M1224.17 869.15L942.546 826.174C935.266 825.063 930.824 817.576 933.343 810.663L1129.43 272.715C1167.81 167.414 1275.31 103.893 1386.34 120.852L1883.34 196.713C2030.93 219.286 2121.01 371.018 2069.99 511.045C2031.38 616.864 1923.4 680.789 1811.83 663.784L1526.44 620.201C1520.94 619.362 1515.61 622.513 1513.71 627.733L1481.08 717.199C1442.7 822.5 1335.2 886.11 1224.17 869.15Z" fill="url(#paint3_linear_5591_90995)"/>
              </mask>
              <g mask="url(#mask4_5591_90995)">
                <mask id="mask5_5591_90995" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="-4" y="0" width="1428" height="900">
                  <path d="-4 0H1424V900H-4V0Z" fill="white"/>
                </mask>
                <g mask="url(#mask5_5591_90995)">
                  <path d="M1225.58 867.289L945.364 824.526C938.12 823.421 933.7 815.971 936.207 809.093L1131.32 273.821C1169.51 169.044 1276.47 105.839 1386.95 122.714L1881.47 198.197C2028.33 220.658 2117.96 371.635 2067.19 510.965C2028.77 616.258 1921.33 679.865 1810.32 662.944L1526.35 619.578C1520.88 618.743 1515.58 621.879 1513.68 627.073L1481.22 716.094C1443.03 820.871 1336.06 884.164 1225.58 867.289Z" fill="url(#paint4_linear_5591_90995)"/>
                  <path d="M1424 12V888C1424 894.623 1418.62 900 1412 900H7.99996C1.37718 900 -4 894.623 -4 888V12C-4 5.3772 1.37718 0 7.99996 0H1412C1418.62 0 1424 5.3772 1424 12Z" fill="url(#paint5_linear_5591_90995)"/>
                </g>
              </g>
            </g>
          </g>
          <defs>
            <linearGradient id="paint0_linear_5591_90995" x1="1427.56" y1="911.565" x2="-7.07685" y2="7.06489" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E5F0FF"/>
              <stop offset="0.5" stopColor="#E9EBFF"/>
              <stop offset="1" stopColor="#EBE5FF"/>
            </linearGradient>
            <linearGradient id="paint1_linear_5591_90995" x1="1419.99" y1="909.5" x2="-7.50433" y2="9.50371" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E5F0FF"/>
              <stop offset="0.5" stopColor="#E9EBFF"/>
              <stop offset="1" stopColor="#E5DEFF"/>
            </linearGradient>
            <linearGradient id="paint2_linear_5591_90995" x1="712.498" y1="0" x2="712.498" y2="900" gradientUnits="userSpaceOnUse">
              <stop offset="0.35" stopColor="white" stopOpacity="0"/>
              <stop offset="0.68" stopColor="white" stopOpacity="0.5"/>
              <stop offset="1" stopColor="white"/>
            </linearGradient>
            <linearGradient id="paint3_linear_5591_90995" x1="1425.08" y1="910.065" x2="-9.55468" y2="5.5649" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E5F0FF"/>
              <stop offset="0.5" stopColor="#E9EBFF"/>
              <stop offset="1" stopColor="#EBE5FF"/>
            </linearGradient>
            <linearGradient id="paint4_linear_5591_90995" x1="1425.5" y1="908" x2="-1.99962" y2="8.00372" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DDD3FF"/>
              <stop offset="0.5" stopColor="#E9EBFF"/>
              <stop offset="1" stopColor="#EBE5FF"/>
            </linearGradient>
            <linearGradient id="paint5_linear_5591_90995" x1="709.998" y1="0" x2="709.998" y2="900" gradientUnits="userSpaceOnUse">
              <stop offset="0.35" stopColor="white" stopOpacity="0"/>
              <stop offset="0.68" stopColor="white" stopOpacity="0.5"/>
              <stop offset="1" stopColor="white"/>
            </linearGradient>
            <clipPath id="clip0_5591_90995">
              <rect width="500" height="900" fill="white"/>
            </clipPath>
            <clipPath id="clip1_5591_90995">
              <rect width="500" height="900" fill="white" transform="translate(924)"/>
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 pt-16 lg:pt-24">
        {/* Hero Text - Mobile Responsive */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-[#201f4f] tracking-[-1px] lg:tracking-[-2px] leading-[1.1] max-w-4xl mx-auto mb-4 lg:mb-6 font-raleway">
            Effortlessly Manage &<br className="hidden sm:block" />control your spending
          </h1>
          <p className="text-base lg:text-lg text-[#667085] max-w-2xl mx-auto mb-8 lg:mb-10 leading-relaxed px-4 lg:px-0">
            From instant money transfers to managing bills & creating virtual cards, save
            on hidden fees when you send with SureBanker.
          </p>
          <Button className="bg-[#4340ff] text-white rounded-xl px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base font-semibold hover:bg-[#3632e6] transition-colors h-12 lg:h-[51px] btn-primary" asChild>
            <Link to="/signup">
              Get Started
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Dashboard Screenshot - No Shadow */}
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-200 overflow-hidden">
            <img 
              src="/Screenshot 2025-06-30 022716.png" 
              alt="SureBanker Dashboard" 
              className="w-full h-auto object-contain"
            />
          </div>
          {/* White gradient overlay at bottom for fade effect */}
          <div className="absolute bottom-0 left-0 right-0 h-16 lg:h-32 bg-gradient-to-t from-[#e8e6ff] via-[#e8e6ff]/80 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};