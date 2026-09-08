import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="
        relative isolate
        bg-gradient-to-b from-[#0f1624] to-[#0a0e17]
        overflow-hidden
      "
    >
      {/* Top separator with left-to-right animated glow */}
      <div className="absolute top-0 left-0 w-full h-[2px] z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-shimmer" />
      </div>

      {/* Decorative glow effect - left to right animated */}
      <div
        className="
          absolute inset-x-0 bottom-0 h-[200px]
          pointer-events-none
          z-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute inset-0
            bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20
            blur-[120px]
            animate-shimmer-glow
          "
        />
      </div>

      {/* Secondary glow effect - left to right */}
      <div
        className="
          absolute inset-x-0 top-0 h-[100px]
          pointer-events-none
          z-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute inset-0
            bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10
            blur-[80px]
            animate-shimmer-slow
          "
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand info and social presence */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(56,189,248,0.15)] group relative overflow-hidden">
            {/* Card glow animation - left to right */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />

            {/* CM Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/30 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] group-hover:border-cyan-400/60 relative">
                <span className="text-3xl font-bold text-white tracking-wider group-hover:text-cyan-300 transition-colors duration-500">
                  CM
                </span>
                {/* Rotating ring around logo */}
                <div className="absolute inset-[-4px] rounded-full border-2 border-transparent border-t-cyan-400/40 border-r-purple-400/40 animate-spin-slow" />
              </div>
            </div>

            <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">
              Your destination for cutting-edge gadgets.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              {[
                FaFacebookF,
                FaTwitter,
                FaInstagram,
                FaYoutube,
                FaLinkedinIn,
              ].map((Icon, i) => (
                <div
                  key={i}
                  className="
                    w-11 h-11 rounded-xl flex items-center justify-center
                    bg-white/10 text-white text-lg
                    hover:bg-cyan-500 hover:shadow-[0_0_20px_#22d3ee]
                    transition-all duration-300 cursor-pointer
                    hover:scale-110 hover:-translate-y-1
                    relative overflow-hidden group/icon
                  "
                >
                  {/* Icon hover shine effect */}
                  <span className="absolute inset-0 -translate-x-full group-hover/icon:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <Icon />
                </div>
              ))}
            </div>
          </div>

          {/* Quick navigation links */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)] group flex flex-col gap-6 relative overflow-hidden">
            {/* Card shine animation */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            <div className="flex justify-between gap-10">
              <div>
                <h3 className="text-white text-lg font-semibold mb-4 relative inline-block">
                  Shop
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent transition-all duration-300 group-hover:w-full" />
                </h3>
                {["All Products", "Mobiles", "Laptops", "Accessories"].map(
                  (item) => (
                    <p
                      key={item}
                      className="
                        text-white/70 text-sm mb-2
                        hover:text-cyan-400 hover:translate-x-2
                        transition-all duration-300 cursor-pointer
                      "
                    >
                      {item}
                    </p>
                  ),
                )}
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold mb-4 relative inline-block">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent transition-all duration-300 group-hover:w-full" />
                </h3>
                {["About Us", "Contact", "Careers", "Press"].map((item) => (
                  <p
                    key={item}
                    className="
                      text-white/70 text-sm mb-2
                      hover:text-cyan-400 hover:translate-x-2
                      transition-all duration-300 cursor-pointer
                    "
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <img
              src=""
              alt=""
              className="w-[170px] mx-auto mt-2 opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
            />
          </div>

          {/* Newsletter subscription section */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)] group relative overflow-hidden">
            {/* Card shine animation */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />

            <h3 className="text-white text-lg font-semibold mb-3 relative inline-block">
              JOIN NEWSLETTER
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent transition-all duration-300 group-hover:w-full" />
            </h3>

            <p className="text-white/70 text-sm mb-5 group-hover:text-white/90 transition-colors duration-300">
              Get exclusive offers & early product access.
            </p>

            <div className="flex items-center gap-3">
              <input
                type="email"
                placeholder="Your Email"
                className="
                  h-[48px] w-full max-w-[220px] px-4 rounded-xl
                  bg-white/10 border border-white/20
                  text-white placeholder-white/40
                  outline-none focus:border-cyan-400
                  transition-all duration-300
                  focus:shadow-[0_0_20px_rgba(56,189,248,0.15)]
                  hover:bg-white/15
                  relative overflow-hidden
                "
              />
              {/* Input shine effect */}
              <div className="relative">
                <button
                  className="
                    h-[48px] w-[100px] shrink-0 rounded-xl
                    font-semibold text-black text-sm
                    bg-gradient-to-r from-orange-500 to-orange-400
                    shadow-[0_0_18px_rgba(255,120,70,0.75)]
                    hover:scale-105 hover:shadow-[0_0_30px_rgba(255,120,70,0.9)]
                    transition-all duration-300
                    hover:-translate-y-1
                    active:scale-95
                    relative overflow-hidden
                  "
                >
                  {/* Button shine effect - left to right */}
                  <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  Subscribe
                </button>
              </div>
            </div>

            <img
              src="/image/"
              alt=""
              className="w-40 mx-auto mt-6 transition-all duration-500 hover:scale-110 hover:rotate-2"
            />
          </div>
        </div>

        {/* Copyright and legal links */}
        <div className="border-t border-white/10 mt-16 pt-6 text-center text-sm text-white/60 relative overflow-hidden">
          {/* Divider glow animation */}
          <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-shimmer" />
          </div>
          <span className="text-orange-400 font-semibold hover:text-cyan-400 transition-colors duration-300">
            Croma Mart
          </span>{" "}
          ~ Designed with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/biswabhusanmohapatra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-yellow-300 transition-all duration-300 font-medium hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          >
            srikanth bn
          </a>
          <div className="flex justify-center gap-8 mt-4">
            {["Privacy", "Terms", "Sitemap"].map((item) => (
              <span
                key={item}
                className="hover:text-cyan-400 cursor-pointer transition-all duration-300 hover:scale-110"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
