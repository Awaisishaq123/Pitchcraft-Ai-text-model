// import React, { useState, useEffect } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebookF } from "react-icons/fa";
// import { Moon, Sun } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import {
//   loginWithEmail,
//   signInWithGoogle,
//   signInWithFacebook,
// } from "../config/firebasemethods";
// import { Toaster } from "react-hot-toast";

// export default function Login() {
//   const navigate = useNavigate();

//   // ✅ Load theme from localStorage (default = light)
//   const [darkMode, setDarkMode] = useState(() => {
//     const saved = localStorage.getItem("theme");
//     return saved === "dark";
//   });

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ Save theme preference in localStorage
//   useEffect(() => {
//     localStorage.setItem("theme", darkMode ? "dark" : "light");
//   }, [darkMode]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const user = await loginWithEmail(email, password);
//     setLoading(false);
//     if (user) navigate(`/dashboard/${user.uid}`);
//   };

//   const handleGoogleLogin = async () => {
//     const user = await signInWithGoogle();
//     if (user) navigate(`/dashboard/${user.uid}`);
//   };

//   const handleFacebookLogin = async () => {
//     const user = await signInWithFacebook();
//     if (user) navigate(`/dashboard/${user.uid}`);
//   };

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
//         darkMode ? "bg-[#0f172a]" : "bg-gray-100"
//       }`}
//     >
//       <div
//         className={`w-full max-w-md rounded-2xl shadow-xl p-8 border transition-all duration-500 ${
//           darkMode
//             ? "bg-[#1e293b] border-gray-700 text-white"
//             : "bg-white border-gray-200 text-gray-900"
//         }`}
//       >
//         {/* Theme Toggle */}
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className={`p-2 rounded-full border transition-all ${
//               darkMode
//                 ? "border-gray-600 hover:bg-gray-800"
//                 : "border-gray-300 hover:bg-gray-100"
//             }`}
//           >
//             {darkMode ? <Sun size={18} /> : <Moon size={18} />}
//           </button>
//         </div>

//         <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
//         <p
//           className={`text-center mb-8 text-sm ${
//             darkMode ? "text-gray-400" : "text-gray-600"
//           }`}
//         >
//           Sign in to access your dashboard
//         </p>

//         <form className="space-y-5" onSubmit={handleLogin}>
//           <div>
//             <label className="text-sm font-medium">Email</label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className={`w-full mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition ${
//                 darkMode
//                   ? "bg-[#0f172a] border-gray-700 text-white focus:ring-blue-600"
//                   : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500"
//               }`}
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Password</label>
//             <input
//               type={setPassword ? "text" : "password"}
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className={`w-full mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition ${
//                 darkMode
//                   ? "bg-[#0f172a] border-gray-700 text-white focus:ring-blue-600"
//                   : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500"
//               }`}
//             />
           
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 mt-4 rounded-xl text-white font-semibold shadow transition-all ${
//               loading
//                 ? "bg-gray-500 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center my-6">
//           <div
//             className={`flex-1 h-px ${
//               darkMode ? "bg-gray-700" : "bg-gray-300"
//             }`}
//           />
//           <p
//             className={`px-3 text-sm ${
//               darkMode ? "text-gray-400" : "text-gray-600"
//             }`}
//           >
//             or continue with
//           </p>
//           <div
//             className={`flex-1 h-px ${
//               darkMode ? "bg-gray-700" : "bg-gray-300"
//             }`}
//           />
//         </div>

//         {/* Social Buttons */}
//         <div className="flex justify-center gap-4">
//           <button
//             onClick={handleGoogleLogin}
//             className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium transition hover:shadow ${
//               darkMode
//                 ? "bg-[#0f172a] border-gray-700 text-white hover:bg-gray-800"
//                 : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
//             }`}
//           >
//             <FcGoogle size={20} /> Google
//           </button>

//           <button
//             onClick={handleFacebookLogin}
//             className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-xl hover:bg-[#166fe5] transition shadow"
//           >
//             <FaFacebookF size={18} /> Facebook
//           </button>
//         </div>

//         {/* Footer */}
//         <p
//           className={`text-center text-sm mt-6 ${
//             darkMode ? "text-gray-400" : "text-gray-600"
//           }`}
//         >
//           Don’t have an account?{" "}
//           <button
//             onClick={() => navigate("/signup")}
//             className={`font-medium ${
//               darkMode
//                 ? "text-blue-400 hover:underline"
//                 : "text-blue-600 hover:underline"
//             }`}
//           >
//             Sign up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebookF } from "react-icons/fa";
// import { Moon, Sun } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import {
//   loginWithEmail,
//   signInWithGoogle,
//   signInWithFacebook,
// } from "../config/firebasemethods";
// import { Toaster } from "react-hot-toast";

// export default function Login() {
//   const navigate = useNavigate();

//   // ✅ Load theme from localStorage (default = light)
//   const [darkMode, setDarkMode] = useState(() => {
//     const saved = localStorage.getItem("theme");
//     return saved === "dark";
//   });

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // 👁️ New state

//   // ✅ Save theme preference in localStorage
//   useEffect(() => {
//     localStorage.setItem("theme", darkMode ? "dark" : "light");
//   }, [darkMode]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const user = await loginWithEmail(email, password);
//     setLoading(false);
//     if (user) navigate(`/dashboard/${user.uid}`);
//   };

//   const handleGoogleLogin = async () => {
//     const user = await signInWithGoogle();
//     if (user) navigate(`/dashboard/${user.uid}`);
//   };

//   const handleFacebookLogin = async () => {
//     const user = await signInWithFacebook();
//     if (user) navigate(`/dashboard/${user.uid}`);
//   };

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
//         darkMode ? "bg-[#0f172a]" : "bg-gray-100"
//       }`}
//     >
//       <div
//         className={`w-full max-w-md rounded-2xl shadow-xl p-8 border transition-all duration-500 ${
//           darkMode
//             ? "bg-[#1e293b] border-gray-700 text-white"
//             : "bg-white border-gray-200 text-gray-900"
//         }`}
//       >
//         {/* Theme Toggle */}
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className={`p-2 rounded-full border transition-all ${
//               darkMode
//                 ? "border-gray-600 hover:bg-gray-800"
//                 : "border-gray-300 hover:bg-gray-100"
//             }`}
//           >
//             {darkMode ? <Sun size={18} /> : <Moon size={18} />}
//           </button>
//         </div>

//         <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
//         <p
//           className={`text-center mb-8 text-sm ${
//             darkMode ? "text-gray-400" : "text-gray-600"
//           }`}
//         >
//           Sign in to access your dashboard
//         </p>

//         <form className="space-y-5" onSubmit={handleLogin}>
//           <div>
//             <label className="text-sm font-medium">Email</label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className={`w-full mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition ${
//                 darkMode
//                   ? "bg-[#0f172a] border-gray-700 text-white focus:ring-blue-600"
//                   : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500"
//               }`}
//             />
//           </div>

//           <div className="relative">
//             <label className="text-sm font-medium">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className={`w-full mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition ${
//                 darkMode
//                   ? "bg-[#0f172a] border-gray-700 text-white focus:ring-blue-600"
//                   : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500"
//               }`}
//             />

//             {/* 👁️ Show/Hide toggle */}
//             <span
//               onClick={() => setShowPassword((prev) => !prev)}
//               className={`absolute right-4 top-9 text-sm font-medium cursor-pointer select-none ${
//                 darkMode ? "text-gray-300" : "text-gray-600"
//               }`}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </span>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 mt-4 rounded-xl text-white font-semibold shadow transition-all ${
//               loading
//                 ? "bg-gray-500 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center my-6">
//           <div
//             className={`flex-1 h-px ${
//               darkMode ? "bg-gray-700" : "bg-gray-300"
//             }`}
//           />
//           <p
//             className={`px-3 text-sm ${
//               darkMode ? "text-gray-400" : "text-gray-600"
//             }`}
//           >
//             or continue with
//           </p>
//           <div
//             className={`flex-1 h-px ${
//               darkMode ? "bg-gray-700" : "bg-gray-300"
//             }`}
//           />
//         </div>

//         {/* Social Buttons */}
//         <div className="flex justify-center gap-4">
//           <button
//             onClick={handleGoogleLogin}
//             className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium transition hover:shadow ${
//               darkMode
//                 ? "bg-[#0f172a] border-gray-700 text-white hover:bg-gray-800"
//                 : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
//             }`}
//           >
//             <FcGoogle size={20} /> Google
//           </button>

//           <button
//             onClick={handleFacebookLogin}
//             className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-xl hover:bg-[#166fe5] transition shadow"
//           >
//             <FaFacebookF size={18} /> Facebook
//           </button>
//         </div>

//         {/* Footer */}
//         <p
//           className={`text-center text-sm mt-6 ${
//             darkMode ? "text-gray-400" : "text-gray-600"
//           }`}
//         >
//           Don’t have an account?{" "}
//           <button
//             onClick={() => navigate("/signup")}
//             className={`font-medium ${
//               darkMode
//                 ? "text-blue-400 hover:underline"
//                 : "text-blue-600 hover:underline"
//             }`}
//           >
//             Sign up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }
  

import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  loginWithEmail,
  signInWithGoogle,
  signInWithFacebook,
} from "../config/firebasemethods";
import { Toaster, toast } from "react-hot-toast"; // ✅ toast import

export default function Login() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ Check for empty fields
    if (!email || !password) {
      toast.error("Please fill in both email and password!");
      return;
    }

    // ✅ Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    setLoading(true);
    try {
      const user = await loginWithEmail(email, password);
      if (user) {
        toast.success("Login successful!");
        navigate(`/dashboard/${user.uid}`);
      } else {
        toast.error("Invalid email or password!");
      }
    } catch (err) {
      toast.error(err.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) navigate(`/dashboard/${user.uid}`);
  };

  const handleFacebookLogin = async () => {
    const user = await signInWithFacebook();
    if (user) navigate(`/dashboard/${user.uid}`);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        darkMode ? "bg-[#0f172a]" : "bg-gray-100"
      }`}
    >
      {/* ✅ Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div
        className={`w-full max-w-md rounded-2xl shadow-xl p-8 border transition-all duration-500 ${
          darkMode
            ? "bg-[#1e293b] border-gray-700 text-white"
            : "bg-white border-gray-200 text-gray-900"
        }`}
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full border transition-all ${
              darkMode
                ? "border-gray-600 hover:bg-gray-800"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
        <p
          className={`text-center mb-8 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Sign in to access your dashboard
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition ${
                darkMode
                  ? "bg-[#0f172a] border-gray-700 text-white focus:ring-blue-600"
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500"
              }`}
            />
          </div>

          <div className="relative">
            <label className="text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition ${
                darkMode
                  ? "bg-[#0f172a] border-gray-700 text-white focus:ring-blue-600"
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500"
              }`}
            />

            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className={`absolute right-4 top-9 text-sm font-medium cursor-pointer select-none ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 rounded-xl text-white font-semibold shadow transition-all ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div
            className={`flex-1 h-px ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
          <p
            className={`px-3 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            or continue with
          </p>
          <div
            className={`flex-1 h-px ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleGoogleLogin}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium transition hover:shadow ${
              darkMode
                ? "bg-[#0f172a] border-gray-700 text-white hover:bg-gray-800"
                : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
            }`}
          >
            <FcGoogle size={20} /> Google
          </button>

          <button
            onClick={handleFacebookLogin}
            className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-xl hover:bg-[#166fe5] transition shadow"
          >
            <FaFacebookF size={18} /> Facebook
          </button>
        </div>

        <p
          className={`text-center text-sm mt-6 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className={`font-medium ${
              darkMode
                ? "text-blue-400 hover:underline"
                : "text-blue-600 hover:underline"
            }`}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
