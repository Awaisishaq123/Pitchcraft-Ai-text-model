import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signUpWithEmail, signInWithGoogle, signInWithFacebook } from "../config/firebasemethods";
import { Toaster, toast } from "react-hot-toast";


export default function Signup() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Email Signup Handler
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await signUpWithEmail(name, email, password);
      toast.success(`Welcome ${user.displayName || "User"}! Account created successfully.`);
      navigate(`/dashboard/${user.uid}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google Signup/Login
  const handleGoogleSignup = async () => {
    try {
      const { user } = await signInWithGoogle();
      toast.success(`Welcome ${user.displayName || "User"}!`);
      navigate(`/dashboard/${user.uid}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔹 Facebook Signup/Login
  const handleFacebookSignup = async () => {
    try {
      const { user } = await signInWithFacebook();
      toast.success(`Welcome ${user.displayName || "User"}!`);
      navigate(`/dashboard/${user.uid}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${darkMode ? "bg-[#0f172a]" : "bg-gray-100"
        }`}
      >

        <div
          className={`w-full max-w-md rounded-2xl shadow-xl p-8 border transition-all duration-500 ${darkMode
            ? "bg-[#1e293b] border-gray-700 text-white"
            : "bg-white border-gray-200 text-gray-900"
          }`}
        >
     
          {/* Theme Toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full border transition-all ${darkMode
                  ? "border-gray-600 hover:bg-gray-800"
                  : "border-gray-300 hover:bg-gray-100"
                }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
          <p
            className={`text-center mb-8 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"
              }`}
          >
            Sign up to get started with your dashboard
          </p>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition ${darkMode
                    ? "bg-[#0f172a] border-gray-700 text-white focus:ring-blue-600"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500"
                  }`}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition ${darkMode
                    ? "bg-[#0f172a] border-gray-700 text-white focus:ring-blue-600"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500"
                  }`}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition ${darkMode
                    ? "bg-[#0f172a] border-gray-700 text-white focus:ring-blue-600"
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500"
                  }`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-4 rounded-xl text-white font-semibold shadow transition-all ${loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div
              className={`flex-1 h-px ${darkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
            />
            <p
              className={`px-3 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"
                }`}
            >
              or sign up with
            </p>
            <div
              className={`flex-1 h-px ${darkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
            />
          </div>

          {/* Social Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleGoogleSignup}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium transition hover:shadow ${darkMode
                  ? "bg-[#0f172a] border-gray-700 text-white hover:bg-gray-800"
                  : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                }`}
            >
              <FcGoogle size={20} /> Google
            </button>

            <button
              onClick={handleFacebookSignup}
              className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-xl hover:bg-[#166fe5] transition shadow"
            >
              <FaFacebookF size={18} /> Facebook
            </button>
          </div>

          {/* Footer */}
          <p
            className={`text-center text-sm mt-6 ${darkMode ? "text-gray-400" : "text-gray-600"
              }`}
          >
            Already have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className={`font-medium ${darkMode
                  ? "text-blue-400 hover:underline"
                  : "text-blue-600 hover:underline"
                }`}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </>

  );
}
