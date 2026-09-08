import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { toast } from "react-toastify";

const Signin = () => {
  const { signin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [pressed, setPressed] = useState(false);

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRemember(true);
    }
  }, []);

  const isFormValid = formData.email && formData.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isFormValid) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const success = signin(formData.email, formData.password);

      if (success) {
        remember
          ? localStorage.setItem("rememberEmail", formData.email)
          : localStorage.removeItem("rememberEmail");

        toast.success("Welcome back! Login successful 🎉");
        navigate("/");
      } else {
        setError("Invalid email or password");
      }

      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050b18] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* ===== SHOPPING CART LOGO ===== */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/30 flex items-center justify-center shadow-lg relative group animate-pulse-glow">
              {/* Rotating ring */}
              <div className="absolute inset-[-4px] rounded-full border-2 border-transparent border-t-cyan-400/50 border-r-purple-400/50 animate-spin-slow" />
              {/* Second ring - opposite direction */}
              <div className="absolute inset-[-8px] rounded-full border-2 border-transparent border-b-cyan-400/30 border-l-purple-400/30 animate-spin-medium opacity-70" />
              {/* Third ring - fast spin */}
              <div className="absolute inset-[-12px] rounded-full border border-cyan-400/10 animate-spin-fast opacity-50" />

              {/* Shopping Cart Icon */}
              <BsCart className="text-3xl text-white relative z-10 group-hover:text-cyan-300 transition-all duration-500" />

              {/* Glow dots around the circle */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-300" />
              <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping delay-500" />
              <div className="absolute top-1/2 -left-1 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping delay-700" />
            </div>
          </div>
          {/* ===== END SHOPPING CART LOGO ===== */}

          <h2 className="text-3xl font-semibold text-center text-white">
            Welcome Back
          </h2>
          <p className="text-center text-white/60 mb-6">
            Login to continue shopping
          </p>

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          <form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPressed(true);
                setTimeout(() => setPressed(false), 150);
              }
            }}
            className="space-y-5"
          >
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 text-white border border-white/10 outline-none focus:border-cyan-400 transition-all duration-300"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-11 pr-12 py-3 rounded-xl bg-black/40 text-white border border-white/10 outline-none focus:border-cyan-400 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-cyan-400 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex justify-between items-center text-sm text-white/70">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="accent-cyan-400"
                />
                Remember me
              </label>

              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-cyan-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                isFormValid
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02]"
                  : "bg-white/10 text-white/40 cursor-not-allowed"
              } ${pressed ? "scale-95" : ""}`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-center text-white/70 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-cyan-400 hover:underline transition-all duration-300 hover:text-cyan-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {showForgot && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#050b18] border border-white/10 rounded-xl p-6 w-80">
            <h3 className="text-white text-lg mb-3">Reset Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-white/10 mb-4 focus:border-cyan-400 transition-all duration-300"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForgot(false)}
                className="text-white/60 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.info("Password reset link sent 📩");
                  setShowForgot(false);
                }}
                className="bg-cyan-400 text-black px-4 py-2 rounded-lg hover:bg-cyan-300 transition-all duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
