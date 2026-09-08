import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { BsBag, BsCart } from "react-icons/bs";

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        isActive
          ? "bg-white/5 backdrop-blur-md py-4 shadow-[0_10px_30px_rgba(0,255,255,0.08)] border-b border-cyan-400/10"
          : "bg-transparent py-6"
      } fixed w-full z-10 lg:px-8 transition-all duration-300 overflow-hidden`}
    >
      {/* Animated shimmer line at top of header */}
      <div className="absolute top-0 left-0 w-full h-[1px] z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-shimmer" />
      </div>

      {/* Animated glow background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 blur-[80px] animate-shimmer-slow" />
      </div>

      <div className="container mx-auto flex items-center justify-between h-full relative z-10">
        {/* Logo - Shopping Cart Icon */}
        <Link to="/">
          <div className="w-[70px] h-[70px] croma-mart flex items-center justify-center relative group">
            {/* Rotating ring around logo */}
            <div className="absolute inset-[-4px] rounded-full border-2 border-transparent border-t-cyan-400/30 border-r-purple-400/30 animate-spin-slow" />

            {/* Second ring */}
            <div className="absolute inset-[-8px] rounded-full border-2 border-transparent border-b-cyan-400/20 border-l-purple-400/20 animate-spin-medium opacity-50" />

            {/* Shopping Cart Icon */}
            <BsCart className="text-2xl text-white group-hover:text-cyan-300 transition-all duration-500 relative z-10" />

            {/* Hover glow effect */}
            <div className="absolute inset-[-12px] rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {/* Auth actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-white/80">
                  Welcome,&nbsp;
                  <span className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors duration-300">
                    {user.username}
                  </span>
                </span>

                <button
                  onClick={logout}
                  className="uppercase text-sm font-semibold
                             px-4 py-1 rounded-full
                             bg-white/5 border border-white/10
                             text-cyan-400
                             hover:bg-cyan-400 hover:text-black
                             transition-all duration-300
                             relative overflow-hidden group/btn
                             hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]
                             shine-hover"
                >
                  <span className="relative z-10">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="uppercase text-sm font-medium text-white/80
                             hover:text-cyan-400 transition-all duration-300
                             hover:shadow-[0_0_20px_rgba(56,189,248,0.1)]
                             px-3 py-1 rounded-lg"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="uppercase text-sm font-semibold
                             px-4 py-2 rounded-full
                             border border-cyan-400 text-cyan-400
                             hover:bg-cyan-400 hover:text-black
                             transition-all duration-300
                             relative overflow-hidden group/btn
                             hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]
                             shine-hover"
                >
                  <span className="relative z-10">Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Cart icon with item count */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative group"
          >
            <BsBag className="text-2xl text-white group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-110" />

            {/* Glow behind cart icon */}
            <div className="absolute inset-[-8px] rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all duration-300 blur-md" />

            <div
              className="bg-cyan-500 absolute -right-2 -bottom-2
                         text-[12px] w-[18px] h-[18px]
                         text-black rounded-full
                         flex justify-center items-center
                         font-bold
                         animate-pulse-glow
                         group-hover:scale-110 transition-transform duration-300"
            >
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
