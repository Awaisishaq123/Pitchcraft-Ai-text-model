// src/components/Protected.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function Protected({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    // 🔄 While Firebase is checking login state
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400 font-medium animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }

  // ❌ Not logged in → redirect to login
  if (!user) return <Navigate to="/" replace />;

  // ✅ Logged in → show requested page
  return children;
}


 