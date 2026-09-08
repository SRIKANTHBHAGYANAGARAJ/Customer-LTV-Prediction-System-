import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-20 overflow-hidden">
      {/* Animated glow background - left to right */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-[100px] animate-shimmer-glow" />
      </div>

      {/* Decorative animated overlay for visual depth */}
      <div className="absolute inset-0 neon-motion pointer-events-none z-0"></div>

      <div className="relative container mx-auto flex justify-around h-full z-10">
        <div className="flex flex-col justify-center max-w-[1200px]">
          {/* Small accent label above main heading */}
          <div className="font-semibold flex items-center uppercase mb-6 animate-fadeInUp delay-100">
            <div className="w-10 h-[2px] mr-3 bg-cyan-500"></div>
            <span className="text-cyan-400">Tech Trends</span>
          </div>

          {/* Primary hero heading */}
          <h1
            className="font-semibold tracking-[0.05em] leading-[1.1] mb-6
                       text-[40px] sm:text-[48px] md:text-[60px] lg:text-[70px]
                       animate-fadeInUp delay-200"
          >
            <span className="text-cyan-400 glow-text">Croma</span> Mart
          </h1>

          {/* Supporting tagline */}
          <p
            className="text-white/80 font-light tracking-wide
                       text-[18px] sm:text-[20px] md:text-[22px]
                       animate-fadeInUp delay-300"
          >
            Shop smart, shop easy, shop{" "}
            <span className="text-cyan-400 font-medium">Croma Mart</span>!
          </p>

          {/* Call-to-action link */}
          <Link
            to={"/"}
            className="self-start mt-8 uppercase font-semibold
                       text-cyan-400 border-b border-cyan-400 pb-1
                       hover:text-cyan-300 hover:border-cyan-300
                       transition-all duration-300
                       animate-fadeInUp delay-500
                       hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]
                       px-4 py-2 rounded-lg"
          >
            Discover More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
