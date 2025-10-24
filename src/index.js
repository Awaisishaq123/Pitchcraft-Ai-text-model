// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// admin.initializeApp();
// const db = admin.firestore();

// // Gemini client init
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // 🔹 API Route: /generatePitch
// exports.generatePitch = functions.https.onRequest(async (req, res) => {
//   try {
//     // ✅ Verify Firebase user token
//     const authHeader = req.headers.authorization || "";
//     const token = authHeader.split("Bearer ")[1];
//     if (!token) return res.status(401).send("Unauthorized");
//     const decoded = await admin.auth().verifyIdToken(token);
//     const uid = decoded.uid;

//     const { title, description } = req.body;
//     if (!title || !description)
//       return res.status(400).send("Missing title or description");

//     // 🧠 Prompt for Gemini
//     const prompt = `
// Tum ek AI ho jo startup founders ke liye professional pitch aur landing page likhta hai.
// Title: ${title}
// Description: ${description}

// Output JSON format:
// {
//   "name": "",
//   "tagline": "",
//   "pitch": "",
//   "targetAudience": "",
//   "html": "<!DOCTYPE html>... (pure landing page with inline CSS)"
// }
// Sirf JSON return karo.
// `;

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent(prompt);
//     const text = result.response.text();

//     let parsed;
//     try {
//       parsed = JSON.parse(text);
//     } catch {
//       const s = text.indexOf("{");
//       const e = text.lastIndexOf("}");
//       parsed = JSON.parse(text.slice(s, e + 1));
//     }

//     const doc = await db.collection("pitches").add({
//       uid,
//       title,
//       description,
//       generated: parsed,
//       html: parsed.html || "<h1>No HTML generated</h1>",
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     res.json({ id: doc.id, generated: parsed });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });


// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// admin.initializeApp();
// const db = admin.firestore();

// // ✅ Gemini client init (frontend + backend env support)
// const genAI = new GoogleGenerativeAI(
//   process.env.GEMINI_API_KEY ||
//   process.env.VITE_GEMINI_API_KEY ||
//   functions.config().gemini?.key
// );

// // 🔹 API Route: /generatePitch
// exports.generatePitch = functions.https.onRequest(async (req, res) => {
//   try {
//     // ✅ Verify Firebase user token
//     const authHeader = req.headers.authorization || "";
//     const token = authHeader.split("Bearer ")[1];
//     if (!token) return res.status(401).send("Unauthorized");
//     const decoded = await admin.auth().verifyIdToken(token);
//     const uid = decoded.uid;

//     const { title, description } = req.body;
//     if (!title || !description)
//       return res.status(400).send("Missing title or description");

//     // 🧠 Prompt for Gemini
//     const prompt = `
// You are an AI startup advisor who writes professional startup pitches and landing pages.

// Title: ${title}
// Description: ${description}

// Return valid JSON only:
// {
//   "name": "",
//   "tagline": "",
//   "pitch": "",
//   "targetAudience": "",
//   "html": "<!DOCTYPE html>... (full landing page with inline CSS)"
// }
// `;

//     // ✅ Use stable model
//     const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest" });

//     const result = await model.generateContent(prompt);
//     const text = await result.response.text();

//     let parsed;
//     try {
//       parsed = JSON.parse(text);
//     } catch {
//       const s = text.indexOf("{");
//       const e = text.lastIndexOf("}");
//       parsed = JSON.parse(text.slice(s, e + 1));
//     }

//     // ✅ Save to Firestore
//     const doc = await db.collection("pitches").add({
//       uid,
//       title,
//       description,
//       generated: parsed,
//       html: parsed.html || "<h1>No HTML generated</h1>",
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     res.json({ id: doc.id, generated: parsed });
//   } catch (err) {
//     console.error("⚠️ Generate Pitch Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/generative-ai");

admin.initializeApp();
const db = admin.firestore();

// ✅ Use Environment Config (Firebase safe way)
const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY || functions.config().gemini?.key;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY not found. Please set it in Firebase config.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// ============================================================
// 🔹 API Route: /generatePitch
// ============================================================
exports.generatePitch = functions.https.onRequest(async (req, res) => {
  try {
    // ✅ Verify Firebase user token
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split("Bearer ")[1];
    if (!token) return res.status(401).send("Unauthorized");
    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    const { title, description } = req.body;
    if (!title || !description)
      return res.status(400).send("Missing title or description");

    // 🧠 Prompt for Gemini
    const prompt = `
You are an AI that writes professional startup pitches and landing pages.
Title: ${title}
Description: ${description}

Return only JSON format:
{
  "name": "",
  "tagline": "",
  "pitch": "",
  "targetAudience": "",
  "html": "<!DOCTYPE html>..."
}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    // Safe JSON parse
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      const s = text.indexOf("{");
      const e = text.lastIndexOf("}");
      parsed = JSON.parse(text.slice(s, e + 1));
    }

    // ✅ Save to Firestore
    const doc = await db.collection("pitches").add({
      uid,
      title,
      description,
      generated: parsed,
      html: parsed.html || "<h1>No HTML generated</h1>",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ id: doc.id, generated: parsed });
  } catch (err) {
    console.error("🔥 Function Error:", err);
    res.status(500).json({ error: err.message });
  }
});
