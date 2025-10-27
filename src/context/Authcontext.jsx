/* eslint-disable react-refresh/only-export-components */
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../config/firebase";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Listen for login/logout changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   // ✅ Logout function
//   const logout = async () => {
//     await signOut(auth);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook for easy access
// export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../config/firebase";

// const AuthContext = createContext();


// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Listen for login/logout state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   // ✅ Logout function
//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, logout, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Custom hook for easy access
// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Listen for login/logout state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // ✅ Context value (clean and reusable)
  const value = { user, loading, logout };

  return (
    <AuthContext.Provider value={value}>
      {/* Wait until auth check completes */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for easy access in components
export const useAuth = () => useContext(AuthContext);
