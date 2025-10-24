// src/router/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";
import CreatePitch from "../pages/createPitch";
import GeneratedPitch from "../pages/generatedPitch";
import Export from "../pages/export";
import NotFound from "../pages/NotFound";
import Protected from "../protectedrouter/Protected";
import { AuthProvider } from "../context/Authcontext";

export default function AppRouter() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🔒 Protected Routes */}
          <Route
            path="/dashboard/:id"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/createpitch"
            element={
              <Protected>
                <CreatePitch />
              </Protected>
            }
          />
          <Route
            path="/generatedpitch"
            element={
              <Protected>
                <GeneratedPitch />
              </Protected>
            }
          />
          <Route
            path="/export"
            element={
              <Protected>
                <Export />
              </Protected>
            }
          />

          {/* 🚫 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
