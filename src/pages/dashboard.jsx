import React, { useEffect, useState } from "react";
import {
  LogOut,
  PlusCircle,
  FileText,
  Moon,
  Sun,
  LayoutDashboard,
  X,
} from "lucide-react";
import { auth, db } from "../config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import CreatePitch from "./createPitch";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [activePage, setActivePage] = useState("dashboard");
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Modal states
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "User");
        setUserId(user.uid);
      } else {
        window.location.href = "/login";
      }
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Fetch pitches
  useEffect(() => {
    if (!userId) return;

    const fetchPitches = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "pitches"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const pitchData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPitches(pitchData);
      } catch (error) {
        console.error("Error fetching pitches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPitches();
  }, [userId]);

  // 🔹 Logout
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  // 🔹 Modal Open & Close
  const openModal = (pitch) => {
    setSelectedPitch(pitch);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPitch(null);
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Generated Pitches", key: "dashboard" },
    { icon: PlusCircle, label: "Create Pitch", key: "createpitch" },
    { icon: FileText, label: "Saved Pitches", key: "savedpitches" },
  ];

  return (
    <div
      className={`min-h-screen flex transition-all duration-700 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-indigo-100 via-white to-blue-100 text-gray-800"
      }`}
    >
      {/* 🔹 Sidebar */}
      <aside
        className={`w-64 hidden md:flex flex-col transition-all duration-500 border-r backdrop-blur-2xl ${
          darkMode
            ? "bg-white/10 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            : "bg-white/70 border-gray-200 shadow-lg"
        }`}
      >
        <div className="h-20 flex items-center justify-center border-b border-white/10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent tracking-wide">
            Pitch<span className="font-extrabold">Craft</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(({ icon: Icon, label, key }) => (
            <button
              key={key}
              onClick={() => setActivePage(key)}
              className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                darkMode
                  ? "hover:bg-white/10 text-gray-300 hover:text-white"
                  : "hover:bg-indigo-100 text-gray-700 hover:text-indigo-600"
              } ${
                activePage === key
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                  : ""
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-500 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* 🔹 Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className={`h-20 flex items-center justify-between px-6 backdrop-blur-2xl border-b ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white/60 border-gray-200 shadow-md"
          }`}
        >
          <h2 className="text-xl font-semibold">
            Welcome 👋,{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent font-bold">
              {userName}
            </span>
          </h2>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg border ${
              darkMode
                ? "border-white/20 hover:bg-white/10"
                : "border-gray-300 hover:bg-gray-200"
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* 🔹 Body */}
        <div className="flex-1 p-8 overflow-y-auto">
          {activePage === "dashboard" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                  Your Pitches
                </h2>
                <button
                  onClick={() => setActivePage("createpitch")}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg shadow hover:from-indigo-600 hover:to-pink-600 transition-all"
                >
                  + New Pitch
                </button>
              </div>

              {loading ? (
                <p>Loading pitches...</p>
              ) : pitches.length === 0 ? (
                <p className="opacity-70">No pitches found. Create your first one!</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pitches.map((pitch) => (
                    <div
                      key={pitch.id}
                      className={`relative p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group overflow-hidden ${
                        darkMode
                          ? "bg-white/5 border-white/10"
                          : "bg-white/70 border-gray-200"
                      }`}
                    >
                      <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
                        {pitch.result?.startupName || "Untitled Pitch"}
                      </h3>
                      <p className="text-sm opacity-80 mb-4 line-clamp-3">
                        {pitch.result?.pitch || "No description available."}
                      </p>

                      <button
                        onClick={() => openModal(pitch)}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activePage === "createpitch" && <CreatePitch darkMode={darkMode} />}
        </div>
      </main>

      {/* 🔹 Modal */}
      {isModalOpen && selectedPitch && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div
            className={`w-11/12 md:w-2/3 lg:w-1/2 p-8 rounded-2xl relative shadow-2xl ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
              {selectedPitch.result?.startupName || "Pitch Details"}
            </h2>

            <p className="opacity-80 leading-relaxed mb-4">
              {selectedPitch.result?.pitch || "No details provided."}
            </p>

            <div className="mt-6 text-sm opacity-70">
              <p>
                <strong>Language:</strong> {selectedPitch.language || "Unknown"}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(
                  selectedPitch.createdAt?.seconds * 1000
                ).toLocaleString()}
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
